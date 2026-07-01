import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { title, description, location, workMode, employmentType, code, isActive } = body;

    const record = {
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(location !== undefined ? { location } : {}),
      ...(workMode !== undefined ? { work_mode: workMode } : {}),
      ...(employmentType !== undefined ? { employment_type: employmentType } : {}),
      ...(code !== undefined ? { code } : {}),
      ...(isActive !== undefined ? { is_active: isActive } : {}),
    };

    const { data, error } = await supabaseAdmin
      .from("careers")
      .update(record)
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ career: data });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { error } = await supabaseAdmin.from("careers").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
