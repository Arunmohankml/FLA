import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

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
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const jobTitle = String(form.get("jobTitle") || "").trim();
    const jobCode = String(form.get("jobCode") || "").trim();

    const record = {
      id: generateId(),
      career_id: String(form.get("careerId") || "").trim(),
      job_title: jobTitle,
      job_code: jobCode,
      name,
      email,
      phone,
      experience: String(form.get("experience") || "").trim(),
      message: String(form.get("message") || "").trim(),
      resume_url: null,
      status: "new",
    };

    if (!name || !email || !phone || !jobTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("career_applications")
      .insert(record)
      .select("id, created_at")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, application: data });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const id = typeof body.id === "string" ? body.id.trim() : "";

    if (!body.all && !id) {
      return NextResponse.json({ error: "Missing job application id" }, { status: 400 });
    }

    const { error } = body.all === true
      ? await supabaseAdmin.from("career_applications").delete().neq("id", "")
      : await supabaseAdmin.from("career_applications").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
