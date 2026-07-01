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
    const { name, phone, email, qualification, state, course } = body;

    if (!name || !phone || !email || !qualification || !state || !course) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("demo_bookings").insert({
      id: generateId(),
      name,
      phone,
      email,
      qualification,
      state,
      course,
      status: "new",
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
