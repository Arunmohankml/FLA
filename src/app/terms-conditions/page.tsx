import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { termsContent } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "Terms and Conditions | Foreign Language Academy",
  description:
    "Read the Foreign Language Academy terms and conditions for website use, enquiries, registrations, fees, certificates, classes, and student responsibilities.",
  alternates: { canonical: "https://foreignlanguageacademy.in/terms-conditions" },
  openGraph: {
    title: "Terms and Conditions | Foreign Language Academy",
    description:
      "Terms for using the Foreign Language Academy website, course services, certificate tools, and communication channels.",
    url: "https://foreignlanguageacademy.in/terms-conditions",
    siteName: "Foreign Language Academy",
  },
};

export default function TermsConditionsPage() {
  return <LegalDocumentPage content={termsContent} />;
}
