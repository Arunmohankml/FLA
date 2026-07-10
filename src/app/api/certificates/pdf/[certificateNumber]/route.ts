import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getCertificateLayout } from "@/lib/certificateLayoutStore";
import { renderCertificatePdf } from "@/lib/certificateRenderer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CERTIFICATE_TEMPLATE_PATH = "/ourcert/fla-certificate.pdf";

type CertificatePdfRow = {
  certificate_number: string;
  student_name: string | null;
  course_level: string | null;
  course_name: string | null;
  grade: string | null;
  total_score: string | null;
  image_url: string | null;
  form_data: Record<string, unknown> | null;
};

async function loadTemplate(origin: string) {
  const templateRes = await fetch(`${origin}${CERTIFICATE_TEMPLATE_PATH}`, {
    cache: "force-cache",
  });
  if (!templateRes.ok) {
    throw new Error("Certificate template not found");
  }

  return templateRes.arrayBuffer();
}

function normalizeFormData(row: CertificatePdfRow): Record<string, string> {
  const values: Record<string, string> = {};

  for (const [key, value] of Object.entries(row.form_data ?? {})) {
    values[key] = value == null ? "" : String(value);
  }

  return {
    ...values,
    certificateNumber: row.certificate_number,
    studentFullName: values.studentFullName || row.student_name || "",
    courseLevel: values.courseLevel || row.course_level || "",
    courseName: values.courseName || row.course_name || "",
    grade: values.grade || row.grade || "",
    totalScore: values.totalScore || row.total_score || "",
  };
}

async function fetchStoredPdf(url: string) {
  try {
    const pdfRes = await fetch(url, { cache: "no-store" });
    if (!pdfRes.ok) return null;

    const pdf = await pdfRes.arrayBuffer();
    const signature = Buffer.from(pdf.slice(0, 4)).toString("utf8");
    return signature === "%PDF" ? pdf : null;
  } catch {
    return null;
  }
}

async function renderPdfFromRecord(req: NextRequest, row: CertificatePdfRow) {
  const values = normalizeFormData(row);
  const [templatePdf, layout] = await Promise.all([
    loadTemplate(req.nextUrl.origin),
    getCertificateLayout(),
  ]);

  return renderCertificatePdf(templatePdf, values, layout);
}

function toArrayBuffer(pdfBytes: ArrayBuffer | Uint8Array) {
  if (pdfBytes instanceof ArrayBuffer) return pdfBytes;

  const buffer = new ArrayBuffer(pdfBytes.byteLength);
  new Uint8Array(buffer).set(pdfBytes);
  return buffer;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ certificateNumber: string }> }
) {
  const { certificateNumber } = await params;
  const download = req.nextUrl.searchParams.get("download") === "1";
  const { data, error } = await supabaseAdmin
    .from("certificates")
    .select("certificate_number, student_name, course_level, course_name, grade, total_score, image_url, form_data")
    .eq("certificate_number", certificateNumber)
    .single();

  if (error || !data) {
    return new Response("Certificate PDF not found", { status: 404 });
  }

  const row = data as CertificatePdfRow;
  const pdf = row.image_url ? await fetchStoredPdf(row.image_url) : null;
  const pdfBytes = toArrayBuffer(pdf ?? await renderPdfFromRecord(req, row));

  const filename = `${certificateNumber}.pdf`;
  return new Response(pdfBytes, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
      "Content-Length": String(pdfBytes.byteLength),
      "Content-Type": "application/pdf",
    },
  });
}
