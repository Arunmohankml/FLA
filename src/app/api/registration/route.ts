import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

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

    const { error } = await supabaseAdmin.from("registrations").insert({
      id: generateId(),
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/registration error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
