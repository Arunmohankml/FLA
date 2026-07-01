import { NextResponse } from "next/server";
import { createCareerRow } from "@/lib/careerStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, location, workMode, employmentType, code } = body;
    if (!title || !description || !location || !workMode || !employmentType || !code) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const career = await createCareerRow({ title, description, location, workMode, employmentType, code });
    return NextResponse.json({ career });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
