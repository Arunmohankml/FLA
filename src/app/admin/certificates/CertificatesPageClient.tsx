import { CertificatesClient } from "./CertificatesClient";

interface Certificate {
  id: string;
  certificateNumber: string;
  studentName: string;
  courseLevel: string;
  courseName: string;
  grade: string;
  totalScore: string;
  imageUrl: string;
  formData?: Record<string, string> | null;
  createdAt: string;
}

export function CertificatesPageClient({
  certificates,
}: {
  certificates: Certificate[];
}) {
  return <CertificatesClient certificates={certificates} />;
}
