import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { notifySubmissionSafely } from "@/lib/submissionNotifications";

function generateId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const submissionId = generateId();
    const { error } = await supabaseAdmin.from("enquiries").insert({
      id: submissionId,
      name,
      email,
      phone: phone || null,
      subject: subject || "General Enquiry",
      message,
    });

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error, null, 2));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await notifySubmissionSafely("enquiry", [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Subject", value: subject || "General Enquiry" },
      { label: "Message", value: message },
    ], submissionId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/enquiry error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const id = typeof body.id === "string" ? body.id.trim() : "";

    if (!body.all && !id) {
      return NextResponse.json({ error: "Missing enquiry id" }, { status: 400 });
    }

    const { error } = body.all === true
      ? await supabaseAdmin.from("enquiries").delete().neq("id", "")
      : await supabaseAdmin.from("enquiries").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
