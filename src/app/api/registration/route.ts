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
    const { name, email, phone, address, language, level, timeSlot, purpose } = body;
    const allowedModes = new Set(["Online", "Offline"]);

    if (!name || !email || !phone || !address || !language || !level || !timeSlot || !purpose) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof address !== "string" || !allowedModes.has(address)) {
      return NextResponse.json(
        { error: "Invalid class mode" },
        { status: 400 }
      );
    }

    const submissionId = generateId();
    const { error } = await supabaseAdmin.from("registrations").insert({
      id: submissionId,
      name,
      email,
      phone,
      address,
      language,
      level,
      time_slot: timeSlot,
      purpose,
    });

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error, null, 2));
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await notifySubmissionSafely("registration", [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Mode", value: address },
      { label: "Language", value: language },
      { label: "Level", value: level },
      { label: "Time Slot", value: timeSlot },
      { label: "Purpose", value: purpose },
    ], submissionId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/registration error:", err);
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
      return NextResponse.json({ error: "Missing registration id" }, { status: 400 });
    }

    const { error } = body.all === true
      ? await supabaseAdmin.from("registrations").delete().neq("id", "")
      : await supabaseAdmin.from("registrations").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/registration error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
