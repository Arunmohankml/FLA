import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const BUCKET = "site-media";

export async function GET() {
  try {
    const { data: files } = await supabaseAdmin.storage.from(BUCKET).list("", {
      limit: 100,
    });

    const config: Record<string, string> = {};
    for (const file of files || []) {
      const key = file.name.replace(/\.[^.]+$/, "");
      const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(file.name);
      const ts = file.updated_at || file.created_at || Date.now();
      config[key] = `${urlData.publicUrl}?t=${new Date(ts).getTime()}`;
    }

    const { data: settings } = await supabaseAdmin
      .from("site_settings")
      .select("key, value");

    if (settings) {
      for (const row of settings) {
        config[row.key] = row.value;
      }
    }

    return NextResponse.json(config);
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const key = formData.get("key") as string;

    if (key === "map-url") {
      const mapUrl = formData.get("url") as string;
      if (!mapUrl) {
        return NextResponse.json({ error: "Missing URL" }, { status: 400 });
      }
      const { error } = await supabaseAdmin
        .from("site_settings")
        .upsert({ key: "map-url", value: mapUrl }, { onConflict: "key" });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ url: mapUrl, key: "map-url" });
    }

    const file = formData.get("file") as File;
    if (!key || !file) {
      return NextResponse.json({ error: "Missing key or file" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "png";
    const path = `${key}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadErr) {
      return NextResponse.json({ error: uploadErr.message }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
    return NextResponse.json({ url: urlData.publicUrl, key });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { key } = await req.json();
    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    if (key === "map-url") {
      await supabaseAdmin.from("site_settings").delete().eq("key", "map-url");
      return NextResponse.json({ ok: true });
    }

    const exts = ["png", "jpg", "jpeg", "webp"];
    for (const ext of exts) {
      await supabaseAdmin.storage.from(BUCKET).remove([`${key}.${ext}`]);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
