import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getCertificateLayout } from "@/lib/certificateLayoutStore";
import { renderCertificatePdf } from "@/lib/certificateRenderer";
import { uploadCertificatePdfToCloudinary } from "@/lib/cloudinary";

const CERTIFICATE_TEMPLATE_PATH = "/ourcert/fla-certificate.pdf";
export const runtime = "nodejs";

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

function getRequestOrigin(req: NextRequest) {
  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const host = forwardedHost || req.headers.get("host");

  if (host) {
    const proto = forwardedProto || (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
    return `${proto}://${host}`;
  }

  return req.nextUrl.origin;
}

function getCertificateDetailsUrl(req: NextRequest, certificateNumber: string) {
  return `${getRequestOrigin(req).replace(/\/$/, "")}/certificates/${encodeURIComponent(certificateNumber)}`;
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

    const qrUrl = getCertificateDetailsUrl(req, values.certificateNumber);
    values.qrUrl = qrUrl;

    const templatePdf = await loadTemplate(req.nextUrl.origin);
    const layout = await getCertificateLayout();
    const pdfBuf = Buffer.from(await renderCertificatePdf(templatePdf, values, layout));

    const upload = await uploadCertificatePdfToCloudinary(values.certificateNumber, pdfBuf);
    const pdfUrl = upload.url;
    if (!pdfUrl) throw new Error("Cloudinary upload did not return a PDF URL");

    const record = {
      certificate_number: values.certificateNumber,
      student_name: values.studentFullName,
      course_level: values.courseLevel,
      course_name: values.courseName,
      grade: values.grade,
      total_score: values.totalScore,
      image_url: pdfUrl,
      form_data: { ...values, qrUrl },
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
      imageUrl: pdfUrl,
      pdfUrl,
      qrUrl,
      certificateNumber: values.certificateNumber,
      formData: savedCertificate?.form_data || values,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
