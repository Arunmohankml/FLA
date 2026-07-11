import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courseDataMap, allSlugs } from "@/lib/courseData";
import { languages } from "@/lib/constants";
import { CourseClient } from "./CourseClient";

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courseDataMap[slug];
  if (!course) return {};
  return {
    title: course.metaTitle,
    description: course.metaDescription,
    keywords: course.metaKeywords,
    alternates: { canonical: `https://foreignlanguageacademy.co.in/courses/${slug}` },
    openGraph: {
      title: course.metaTitle,
      description: course.metaDescription,
      url: `https://foreignlanguageacademy.co.in/courses/${slug}`,
      siteName: "Foreign Language Academy",
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courseDataMap[slug];
  if (!course) notFound();

  const otherCourses = languages.filter((l) => l.slug !== slug);

  const baseUrl = "https://foreignlanguageacademy.co.in";

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.name} Language Course`,
    description: course.metaDescription,
    provider: {
      "@type": "EducationalOrganization",
      name: "Foreign Language Academy",
      address: { "@type": "PostalAddress", addressLocality: "Chennai, India" },
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "200",
      bestRating: "5",
      worstRating: "1",
    },
    hasCourseInstance: course.levelDetails.map((l) => ({
      "@type": "CourseInstance",
      courseMode: ["Online", "Offline", "Hybrid"],
      location: { "@type": "Place", name: "Chennai" },
      name: `${course.name} ${l.level} – ${l.title}`,
      description: l.description,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Courses", item: `${baseUrl}/courses` },
      { "@type": "ListItem", position: 3, name: `${course.name} Course` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: course.faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CourseClient course={course} otherCourses={otherCourses} />
    </>
  );
}
