import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { CertificatesPageClient } from "./CertificatesPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certificates",
  robots: { index: false, follow: false },
};

type CertificateRow = {
  id: string;
  certificate_number: string;
  student_name: string;
  course_level: string;
  course_name: string;
  grade: string;
  total_score: string;
  image_url: string;
  form_data: Record<string, string> | null;
  created_at: string;
};

export default async function CertificatesPage() {
  const { data } = await supabaseAdmin
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  const certificates = ((data ?? []) as CertificateRow[]).map((c) => ({
    id: c.id,
    certificateNumber: c.certificate_number,
    studentName: c.student_name,
    courseLevel: c.course_level,
    courseName: c.course_name,
    grade: c.grade,
    totalScore: c.total_score,
    imageUrl: c.image_url,
    formData: c.form_data,
    createdAt: c.created_at,
  }));

  return <CertificatesPageClient certificates={certificates} />;
}
