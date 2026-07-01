import { NextResponse } from "next/server";
import { getAdmins } from "@/lib/data";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const admins = await getAdmins();
    return NextResponse.json({ admins: admins ?? [] });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = supabaseAdmin;
    const { email, addedBy } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from("admins")
      .select("id")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "Already an admin" }, { status: 409 });
    }

    const { data: admin, error } = await supabase
      .from("admins")
      .insert({
        email: email.toLowerCase().trim(),
        role: "staff",
        added_by: addedBy || "owner",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(admin, { status: 201 });
  } catch (err) {
    console.error("POST /api/admins error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = supabaseAdmin;
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { data: target, error: findError } = await supabase
      .from("admins")
      .select("role")
      .eq("id", id)
      .single();

    if (!target) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (target.role === "owner") {
      return NextResponse.json(
        { error: "Cannot remove the owner" },
        { status: 403 }
      );
    }

    const { error } = await supabase.from("admins").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/admins error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
