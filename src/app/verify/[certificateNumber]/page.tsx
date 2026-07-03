import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { VerifyClient } from "./VerifyClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify Foreign Language Academy Certificate",
  description:
    "Verify certificates issued by Foreign Language Academy for language courses and training programs.",
};

type CertRow = {
  certificate_number: string;
  student_name: string;
  course_level: string;
  course_name: string;
  grade: string;
  total_score: string;
  image_url: string;
  created_at: string;
};

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ certificateNumber: string }>;
}) {
  const { certificateNumber } = await params;

  const { data } = await supabaseAdmin
    .from("certificates")
    .select("*")
    .eq("certificate_number", certificateNumber)
    .single();

  if (!data) notFound();

  const cert = data as CertRow;

  return (
    <VerifyClient
      certificateNumber={cert.certificate_number}
      studentName={cert.student_name}
      courseLevel={cert.course_level}
      courseName={cert.course_name}
      grade={cert.grade}
      totalScore={cert.total_score}
      imageUrl={cert.image_url}
      createdAt={cert.created_at}
    />
  );
}
