import { NextResponse } from "next/server";
import { deleteCareerRow, updateCareerRow } from "@/lib/careerStore";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { title, description, location, workMode, employmentType, code, isActive } = body;

    const career = await updateCareerRow(id, { title, description, location, workMode, employmentType, code, isActive });
    if (!career) return NextResponse.json({ error: "Career listing not found" }, { status: 404 });
    return NextResponse.json({ career });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await deleteCareerRow(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
