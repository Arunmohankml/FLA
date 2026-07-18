import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type SubscriptionPayload = {
  endpoint?: unknown;
  keys?: {
    p256dh?: unknown;
    auth?: unknown;
  };
};

function isMissingPushTableError(message?: string) {
  return Boolean(
    message?.includes("admin_push_subscriptions") ||
      message?.toLowerCase().includes("schema cache"),
  );
}

function missingPushTableResponse() {
  return NextResponse.json(
    {
      error:
        "Admin browser push setup is not complete. Run src/app/api/SETUP_ADMIN_PUSH_NOTIFICATIONS.sql in Supabase SQL editor.",
      setupRequired: true,
    },
    { status: 503 },
  );
}

function isValidSubscription(payload: SubscriptionPayload) {
  const endpoint = typeof payload.endpoint === "string" ? payload.endpoint.trim() : "";
  const p256dh = typeof payload.keys?.p256dh === "string" ? payload.keys.p256dh.trim() : "";
  const auth = typeof payload.keys?.auth === "string" ? payload.keys.auth.trim() : "";

  if (!endpoint || !p256dh || !auth) return null;
  if (endpoint.length > 2048 || p256dh.length > 512 || auth.length > 512) return null;

  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:") return null;
  } catch {
    return null;
  }

  return { endpoint, p256dh, auth };
}

export async function POST(request: Request) {
  const admin = await verifyAdminRequest(request);
  if (!admin.ok) {
    return NextResponse.json({ error: admin.error }, { status: admin.status });
  }

  const body = (await request.json().catch(() => null)) as SubscriptionPayload | null;
  const subscription = body ? isValidSubscription(body) : null;
  if (!subscription) {
    return NextResponse.json({ error: "Invalid push subscription" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("admin_push_subscriptions").upsert(
    {
      ...subscription,
      admin_email: admin.email,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "endpoint" },
  );

  if (error) {
    if (isMissingPushTableError(error.message)) return missingPushTableResponse();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(request: Request) {
  const admin = await verifyAdminRequest(request);
  if (!admin.ok) {
    return NextResponse.json({ error: admin.error }, { status: admin.status });
  }

  const body = (await request.json().catch(() => null)) as { endpoint?: unknown } | null;
  const endpoint = typeof body?.endpoint === "string" ? body.endpoint.trim() : "";
  if (!endpoint) {
    return NextResponse.json({ error: "Missing subscription endpoint" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("admin_push_subscriptions")
    .delete()
    .eq("endpoint", endpoint)
    .eq("admin_email", admin.email);

  if (error) {
    if (isMissingPushTableError(error.message)) return missingPushTableResponse();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
