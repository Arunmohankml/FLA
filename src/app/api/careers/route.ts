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
    const { title, description, location, workMode, employmentType, code } = body;
    if (!title || !description || !location || !workMode || !employmentType || !code) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("careers")
      .insert({
        id: generateId(),
        title,
        description,
        location,
        work_mode: workMode,
        employment_type: employmentType,
        code,
        is_active: true,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ career: data });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
