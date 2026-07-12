import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getCertificateLayout } from "@/lib/certificateLayoutStore";
import { renderCertificatePdf } from "@/lib/certificateRenderer";
import { loadCertificateTemplatePdf } from "@/lib/certificateTemplate.server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type CertificatePdfRow = {
  certificate_number: string;
  student_name: string | null;
  course_level: string | null;
  course_name: string | null;
  grade: string | null;
  total_score: string | null;
  form_data: Record<string, unknown> | null;
};

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

async function renderPdfFromRecord(row: CertificatePdfRow) {
  const values = normalizeFormData(row);
  const [templatePdf, layout] = await Promise.all([
    loadCertificateTemplatePdf(),
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
    .select("certificate_number, student_name, course_level, course_name, grade, total_score, form_data")
    .eq("certificate_number", certificateNumber)
    .single();

  if (error || !data) {
    return new Response("Certificate PDF not found", { status: 404 });
  }

  const row = data as CertificatePdfRow;
  const pdfBytes = toArrayBuffer(await renderPdfFromRecord(row));

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
