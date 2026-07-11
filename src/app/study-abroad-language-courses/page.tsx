import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingContent";

const content = getSeoLandingPage("study-abroad-language-courses")!;

export const metadata: Metadata = {
  title: "Language Courses for Abroad Studies, Visa and Immigration",
  description:
    "German for Germany, French for Canada, Japanese for Japan, Korean for South Korea, IELTS English and foreign language training for study abroad.",
  keywords: content.keywords,
  alternates: { canonical: "https://foreignlanguageacademy.co.in/study-abroad-language-courses" },
  openGraph: {
    title: "Language Courses for Abroad Studies, Visa and Immigration",
    description: content.description,
    url: "https://foreignlanguageacademy.co.in/study-abroad-language-courses",
    siteName: "Foreign Language Academy",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
};

export default function StudyAbroadLanguageCoursesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.title,
    description: content.description,
    url: "https://foreignlanguageacademy.co.in/study-abroad-language-courses",
    isPartOf: {
      "@type": "WebSite",
      name: "Foreign Language Academy",
      url: "https://foreignlanguageacademy.co.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SeoLandingPage content={content} />
    </>
  );
}
