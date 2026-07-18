import "server-only";

import webpush from "web-push";
import { supabaseAdmin } from "@/lib/supabase";

const DEFAULT_ADMIN_EMAIL = "info@foreignlanguageacademy.co.in";
const DEFAULT_FROM_EMAIL = "Foreign Language Academy <onboarding@resend.dev>";
const DEFAULT_ADMIN_URL = "/admin";

export type SubmissionNotificationType =
  | "enquiry"
  | "jobApplication"
  | "registration"
  | "demoBooking";

type NotificationField = {
  label: string;
  value?: string | null;
};

type PushSubscriptionRow = {
  endpoint: string;
  p256dh: string;
  auth: string;
};

const submissionLabels: Record<SubmissionNotificationType, string> = {
  enquiry: "Enquiry",
  jobApplication: "Job Application",
  registration: "Registration",
  demoBooking: "Demo Booking",
};

function clean(value?: string | null) {
  return String(value ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getRecipients() {
  const raw =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.NOTIFICATION_EMAIL_TO ||
    DEFAULT_ADMIN_EMAIL;

  return raw
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function buildMessage(type: SubmissionNotificationType, fields: NotificationField[]) {
  const label = submissionLabels[type];
  const visibleFields = fields
    .map((field) => ({ ...field, value: clean(field.value) }))
    .filter((field) => field.value);

  const name = visibleFields.find((field) => field.label === "Name")?.value;
  const title = `New ${label}${name ? ` from ${name}` : ""}`;
  const text = [
    title,
    "",
    ...visibleFields.map((field) => `${field.label}: ${field.value}`),
  ].join("\n");
  const rows = visibleFields
    .map(
      (field) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;font-weight:600;">${escapeHtml(field.label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a;">${escapeHtml(field.value)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.5;">
      <h2 style="margin:0 0 12px;color:#172c55;">${escapeHtml(title)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;border:1px solid #e5e7eb;">
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  return { title, text, html };
}

function getAdminUrl(type: SubmissionNotificationType) {
  const paths: Record<SubmissionNotificationType, string> = {
    enquiry: "/admin/enquiries",
    jobApplication: "/admin/job-applications",
    registration: "/admin/registrations",
    demoBooking: "/admin/demo-bookings",
  };

  return paths[type] || DEFAULT_ADMIN_URL;
}

function getPushConfig() {
  const publicKey = process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY?.trim();
  const privateKey = process.env.WEB_PUSH_VAPID_PRIVATE_KEY?.trim();
  const subject = process.env.WEB_PUSH_VAPID_SUBJECT?.trim() || `mailto:${DEFAULT_ADMIN_EMAIL}`;

  if (!publicKey || !privateKey) return null;
  return { publicKey, privateKey, subject };
}

export async function sendSubmissionNotification(
  type: SubmissionNotificationType,
  fields: NotificationField[],
  submissionId?: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not configured; admin email notification skipped.");
    return;
  }

  const to = getRecipients();
  if (to.length === 0) {
    console.warn("No admin notification recipients configured.");
    return;
  }

  const message = buildMessage(type, fields);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "fla-submission-notifications/1.0",
      ...(submissionId
        ? { "Idempotency-Key": `submission/${type}/${submissionId}` }
        : {}),
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL,
      to,
      subject: message.title,
      text: message.text,
      html: message.html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend notification failed: ${response.status} ${detail}`);
  }
}

export async function sendSubmissionPushNotification(
  type: SubmissionNotificationType,
  fields: NotificationField[],
) {
  const config = getPushConfig();
  if (!config) {
    console.warn("Web Push VAPID keys are not configured; admin push notification skipped.");
    return;
  }

  const { data, error } = await supabaseAdmin
    .from("admin_push_subscriptions")
    .select("endpoint, p256dh, auth");

  if (error) throw new Error(`Could not load admin push subscriptions: ${error.message}`);

  const subscriptions = (data ?? []) as PushSubscriptionRow[];
  if (subscriptions.length === 0) return;

  const message = buildMessage(type, fields);
  const body = message.text.split("\n").slice(2, 5).join(" - ");
  const payload = JSON.stringify({
    title: message.title,
    body: body || "Open the admin panel to view the submission.",
    url: getAdminUrl(type),
  });

  webpush.setVapidDetails(config.subject, config.publicKey, config.privateKey);

  const expiredEndpoints: string[] = [];
  const results = await Promise.allSettled(
    subscriptions.map(async (subscription) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: { p256dh: subscription.p256dh, auth: subscription.auth },
          },
          payload,
          { TTL: 300 },
        );
      } catch (error) {
        const statusCode =
          typeof error === "object" && error && "statusCode" in error
            ? Number(error.statusCode)
            : 0;

        if (statusCode === 404 || statusCode === 410) {
          expiredEndpoints.push(subscription.endpoint);
          return;
        }

        throw error;
      }
    }),
  );

  if (expiredEndpoints.length > 0) {
    await supabaseAdmin
      .from("admin_push_subscriptions")
      .delete()
      .in("endpoint", expiredEndpoints);
  }

  const failed = results.filter((result) => result.status === "rejected");
  if (failed.length > 0) {
    throw new Error(`Web Push failed for ${failed.length} admin subscription(s).`);
  }
}

export async function notifySubmissionSafely(
  type: SubmissionNotificationType,
  fields: NotificationField[],
  submissionId?: string,
) {
  const [emailResult, pushResult] = await Promise.allSettled([
    sendSubmissionNotification(type, fields, submissionId),
    sendSubmissionPushNotification(type, fields),
  ]);

  if (emailResult.status === "rejected") {
    console.error("Admin email notification failed:", emailResult.reason);
  }
  if (pushResult.status === "rejected") {
    console.error("Admin push notification failed:", pushResult.reason);
  }
}
