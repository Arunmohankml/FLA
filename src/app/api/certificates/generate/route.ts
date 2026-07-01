import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import { supabaseAdmin } from "@/lib/supabase";
import { drawCertificate } from "@/lib/certificateRenderer";

const BUCKET = "certificates";

async function loadTemplate(origin: string) {
  const templateRes = await fetch(`${origin}/certificate.png`);
  if (!templateRes.ok) {
    throw new Error("Template not found");
  }

  const templateBuf = Buffer.from(await templateRes.arrayBuffer());
  return loadImage(templateBuf);
}

function getVerifyUrl(req: NextRequest, certificateNumber: string) {
  const domain = req.headers.get("host") || "localhost:3000";
  const protocol = req.headers.get("x-forwarded-proto") || "https";
  return `${protocol}://${domain}/verify/${certificateNumber}`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const values: Record<string, string> = {};
    for (const [key, value] of form.entries()) values[key] = String(value);

    const calibration = req.nextUrl.searchParams.get("calibration") === "1";

    if (!calibration && (!values.certificateNumber || !values.studentFullName)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const template = await loadTemplate(req.nextUrl.origin);
    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext("2d");

    await drawCertificate({
      ctx,
      template,
      values,
      verifyUrl: getVerifyUrl(req, values.certificateNumber || "CALIBRATION"),
      mode: calibration ? "calibration" : "values",
    });

    const pngBuf = canvas.toBuffer("image/png");

    if (calibration) {
      return new NextResponse(new Uint8Array(pngBuf), {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "no-store",
          "Content-Disposition": 'inline; filename="certificate-calibration.png"',
        },
      });
    }

    const filePath = `certificates/${values.certificateNumber}.png`;
    const { error: uploadErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(filePath, pngBuf, { contentType: "image/png", upsert: true });

    if (uploadErr) {
      return NextResponse.json({ error: `Upload failed: ${uploadErr.message}` }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

    const record = {
      certificate_number: values.certificateNumber,
      student_name: values.studentFullName,
      course_level: values.courseLevel,
      course_name: values.courseName,
      grade: values.grade,
      total_score: values.totalScore,
      image_url: imageUrl,
      form_data: Object.fromEntries(form.entries()),
    };

    const existingId = form.get("id");
    const { error: dbErr } = existingId
      ? await supabaseAdmin.from("certificates").update(record).eq("id", existingId)
      : await supabaseAdmin.from("certificates").insert(record);

    if (dbErr) {
      return NextResponse.json({ error: `DB save failed: ${dbErr.message}` }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      imageUrl,
      certificateNumber: values.certificateNumber,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
