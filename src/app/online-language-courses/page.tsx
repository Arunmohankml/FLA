import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingContent";

const content = getSeoLandingPage("online-language-courses")!;

export const metadata: Metadata = {
  title: "Online Foreign Language Courses with Certificate",
  description:
    "Live online German, French, Japanese, Korean, Spanish, Mandarin, English, Russian, Italian, IELTS and soft skills classes from Foreign Language Academy Chennai.",
  keywords: content.keywords,
  alternates: { canonical: "https://foreignlanguageacademy.in/online-language-courses" },
  openGraph: {
    title: "Online Foreign Language Courses with Certificate",
    description: content.description,
    url: "https://foreignlanguageacademy.in/online-language-courses",
    siteName: "Foreign Language Academy",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
};

export default function OnlineLanguageCoursesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.title,
    description: content.description,
    url: "https://foreignlanguageacademy.in/online-language-courses",
    isPartOf: {
      "@type": "WebSite",
      name: "Foreign Language Academy",
      url: "https://foreignlanguageacademy.in",
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
