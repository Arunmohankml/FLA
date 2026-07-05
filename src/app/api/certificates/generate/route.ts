import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { renderCertificatePdf } from "@/lib/certificateRenderer";

const BUCKET = "certificates";
const CERTIFICATE_TEMPLATE_PATH = "/ourcert/Peter%20changes.pdf%20(A4).pdf";

async function loadTemplate(origin: string) {
  const templateRes = await fetch(`${origin}${CERTIFICATE_TEMPLATE_PATH}`);
  if (!templateRes.ok) {
    throw new Error("Template not found");
  }

  return templateRes.arrayBuffer();
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const values: Record<string, string> = {};
    for (const [key, value] of form.entries()) values[key] = String(value);

    if (!values.certificateNumber || !values.studentFullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const templatePdf = await loadTemplate(req.nextUrl.origin);
    const pdfBuf = Buffer.from(await renderCertificatePdf(templatePdf, values));
    const filePath = `certificates/${values.certificateNumber}.pdf`;
    const { error: uploadErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(filePath, pdfBuf, { contentType: "application/pdf", upsert: true });

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
      pdfUrl: imageUrl,
      certificateNumber: values.certificateNumber,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
