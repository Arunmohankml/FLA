import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { privacyPolicyContent } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Foreign Language Academy",
  description:
    "Read the Foreign Language Academy privacy policy for enquiries, demo bookings, registrations, certificates, website data, and student communication.",
  alternates: { canonical: "https://foreignlanguageacademy.co.in/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Foreign Language Academy",
    description:
      "How Foreign Language Academy collects, uses, protects, and manages learner and website information.",
    url: "https://foreignlanguageacademy.co.in/privacy-policy",
    siteName: "Foreign Language Academy",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage content={privacyPolicyContent} />;
}
