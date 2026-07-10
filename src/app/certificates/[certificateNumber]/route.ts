import { supabaseAdmin } from "@/lib/supabase";
import { buildCertificateQrText, CertificateValues } from "@/lib/certificateRenderer";

export const dynamic = "force-dynamic";

type CertificateRow = {
  certificate_number: string;
  student_name: string;
  course_level: string | null;
  course_name: string | null;
  grade: string | null;
  total_score: string | null;
  form_data: CertificateValues | null;
};

function valuesFromCertificate(row: CertificateRow): CertificateValues {
  return {
    ...(row.form_data ?? {}),
    certificateNumber: row.certificate_number,
    studentFullName: row.form_data?.studentFullName || row.student_name || "",
    courseLevel: row.form_data?.courseLevel || row.course_level || "",
    courseName: row.form_data?.courseName || row.course_name || "",
    grade: row.form_data?.grade || row.grade || "",
    totalScore: row.form_data?.totalScore || row.total_score || "",
  };
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ certificateNumber: string }> }
) {
  const { certificateNumber } = await params;
  const { data } = await supabaseAdmin
    .from("certificates")
    .select(
      "certificate_number, student_name, course_level, course_name, grade, total_score, form_data"
    )
    .eq("certificate_number", certificateNumber)
    .single();

  if (!data) {
    return new Response("Certificate not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(buildCertificateQrText(valuesFromCertificate(data as CertificateRow)), {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
