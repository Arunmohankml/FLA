import { languages } from "@/lib/constants";

export function CourseJsonLd() {
  const schemas = languages.map((lang) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${lang.name} Language Course`,
    description: `Learn ${lang.name} from beginner to advanced. Levels: ${lang.levels}. Duration: ${lang.duration}.`,
    provider: {
      "@type": "EducationalOrganization",
      name: "Foreign Language Academy",
      url: "https://foreignlanguageacademy.co.in",
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Online", "Offline", "Hybrid"],
      location: {
        "@type": "Place",
        name: "Foreign Language Academy",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chennai",
          addressCountry: "IN",
        },
      },
    },
  }));

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
