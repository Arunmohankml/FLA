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
    const form = await request.formData();

    const record = {
      id: generateId(),
      career_id: String(form.get("careerId") || ""),
      job_title: String(form.get("jobTitle") || ""),
      job_code: String(form.get("jobCode") || ""),
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      experience: String(form.get("experience") || ""),
      message: String(form.get("message") || ""),
      resume_url: null,
      status: "new",
    };

    if (!record.name || !record.email || !record.phone || !record.job_title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("career_applications").insert(record);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
