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

function certificatePrefix() {
  return `FLA-${new Date().getFullYear()}-`;
}

function normalizeCertificateNumber(input?: string) {
  const raw = (input || "").trim();
  const prefix = certificatePrefix();
  const suffix = raw.startsWith(prefix) ? raw.slice(prefix.length).trim() : raw;
  const cleanSuffix = suffix.replace(/\s+/g, "-").replace(/[^A-Za-z0-9-]/g, "").toUpperCase();

  if (!cleanSuffix) {
    return null;
  }

  return `${prefix}${cleanSuffix}`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const values: Record<string, string> = {};
    for (const [key, value] of form.entries()) values[key] = String(value);

    if (!values.studentFullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingId = form.get("id");
    if (existingId) {
      const { data: existingCertificate, error: existingErr } = await supabaseAdmin
        .from("certificates")
        .select("certificate_number")
        .eq("id", String(existingId))
        .single();

      if (existingErr || !existingCertificate) {
        return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
      }

      values.certificateNumber = existingCertificate.certificate_number;
    } else {
      const certificateNumber = normalizeCertificateNumber(values.certificateNumber);
      if (!certificateNumber) {
        return NextResponse.json(
          { error: "Certificate number is required" },
          { status: 400 }
        );
      }

      const { data: duplicateCertificate, error: duplicateErr } = await supabaseAdmin
        .from("certificates")
        .select("id")
        .eq("certificate_number", certificateNumber)
        .maybeSingle();

      if (duplicateErr) throw duplicateErr;
      if (duplicateCertificate) {
        return NextResponse.json(
          { error: "Certificate number already exists" },
          { status: 409 }
        );
      }

      values.certificateNumber = certificateNumber;
    }

    const filePath = `certificates/${values.certificateNumber}.pdf`;
    const { data: urlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;
    values.qrUrl = imageUrl;

    const templatePdf = await loadTemplate(req.nextUrl.origin);
    const pdfBuf = Buffer.from(await renderCertificatePdf(templatePdf, values));
    const { error: uploadErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(filePath, pdfBuf, { contentType: "application/pdf", upsert: true });

    if (uploadErr) {
      return NextResponse.json({ error: `Upload failed: ${uploadErr.message}` }, { status: 500 });
    }

    const record = {
      certificate_number: values.certificateNumber,
      student_name: values.studentFullName,
      course_level: values.courseLevel,
      course_name: values.courseName,
      grade: values.grade,
      total_score: values.totalScore,
      image_url: imageUrl,
      form_data: values,
    };

    const { data: savedCertificate, error: dbErr } = existingId
      ? await supabaseAdmin
          .from("certificates")
          .update(record)
          .eq("id", existingId)
          .select("id, form_data")
          .single()
      : await supabaseAdmin
          .from("certificates")
          .insert(record)
          .select("id, form_data")
          .single();

    if (dbErr) {
      return NextResponse.json({ error: `DB save failed: ${dbErr.message}` }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      id: savedCertificate?.id,
      imageUrl,
      pdfUrl: imageUrl,
      certificateNumber: values.certificateNumber,
      formData: savedCertificate?.form_data || values,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
