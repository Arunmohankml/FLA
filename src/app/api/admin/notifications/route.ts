import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type NotificationItem = {
  id: string;
  type: "enquiry" | "jobApplication" | "registration" | "demoBooking";
  title: string;
  body: string;
  createdAt: string;
  url: string;
};

type EnquiryRow = {
  id: string;
  name?: string | null;
  phone?: string | null;
  subject?: string | null;
  created_at?: string | null;
};

type RegistrationRow = {
  id: string;
  name?: string | null;
  phone?: string | null;
  language?: string | null;
  level?: string | null;
  created_at?: string | null;
};

type DemoBookingRow = {
  id: string;
  name?: string | null;
  phone?: string | null;
  preferred_date?: string | null;
  created_at?: string | null;
};

type CareerApplicationRow = {
  id: string;
  name?: string | null;
  phone?: string | null;
  job_title?: string | null;
  created_at?: string | null;
};

function value(input?: string | null) {
  return String(input ?? "").trim();
}

function sortByCreatedAtDesc(items: NotificationItem[]) {
  return items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function GET(request: Request) {
  const admin = await verifyAdminRequest(request);
  if (!admin.ok) {
    return NextResponse.json(
      { error: admin.error },
      { status: admin.status, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const [enquiries, registrations, demoBookings, applications] = await Promise.all([
      supabaseAdmin
        .from("enquiries")
        .select("id, name, phone, subject, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
      supabaseAdmin
        .from("registrations")
        .select("id, name, phone, language, level, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
      supabaseAdmin
        .from("demo_bookings")
        .select("id, name, phone, preferred_date, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
      supabaseAdmin
        .from("career_applications")
        .select("id, name, phone, job_title, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

    const queryError =
      enquiries.error || registrations.error || demoBookings.error || applications.error;
    if (queryError) {
      return NextResponse.json(
        { error: queryError.message },
        { status: 500, headers: { "Cache-Control": "no-store" } },
      );
    }

    const items: NotificationItem[] = [
      ...((enquiries.data ?? []) as EnquiryRow[]).map((item) => ({
        id: `enquiry:${item.id}`,
        type: "enquiry" as const,
        title: `New enquiry${value(item.name) ? ` from ${value(item.name)}` : ""}`,
        body: [value(item.subject) || "General Enquiry", value(item.phone)]
          .filter(Boolean)
          .join(" - "),
        createdAt: value(item.created_at),
        url: "/admin/enquiries",
      })),
      ...((registrations.data ?? []) as RegistrationRow[]).map((item) => ({
        id: `registration:${item.id}`,
        type: "registration" as const,
        title: `New registration${value(item.name) ? ` from ${value(item.name)}` : ""}`,
        body: [value(item.language), value(item.level), value(item.phone)]
          .filter(Boolean)
          .join(" - "),
        createdAt: value(item.created_at),
        url: "/admin/registrations",
      })),
      ...((demoBookings.data ?? []) as DemoBookingRow[]).map((item) => ({
        id: `demoBooking:${item.id}`,
        type: "demoBooking" as const,
        title: `New demo booking${value(item.name) ? ` from ${value(item.name)}` : ""}`,
        body: [value(item.preferred_date), value(item.phone)].filter(Boolean).join(" - "),
        createdAt: value(item.created_at),
        url: "/admin/demo-bookings",
      })),
      ...((applications.data ?? []) as CareerApplicationRow[]).map((item) => ({
        id: `jobApplication:${item.id}`,
        type: "jobApplication" as const,
        title: `New job application${value(item.name) ? ` from ${value(item.name)}` : ""}`,
        body: [value(item.job_title), value(item.phone)].filter(Boolean).join(" - "),
        createdAt: value(item.created_at),
        url: "/admin/job-applications",
      })),
    ].filter((item) => item.createdAt);

    return NextResponse.json(
      { items: sortByCreatedAtDesc(items).slice(0, 20) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server error" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
