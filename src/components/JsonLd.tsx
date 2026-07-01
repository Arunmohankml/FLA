import { site } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    description: site.tagline,
    url: "https://foreignlanguageacademy.in",
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Maruthi Nagar",
      addressLocality: "Rajakilpakkam",
      addressRegion: "Chennai",
      postalCode: "600073",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: "1900",
      bestRating: "5",
    },
    foundingDate: "2007",
    areaServed: "Chennai",
    knowsAbout: [
      "German",
      "French",
      "Spanish",
      "Japanese",
      "Chinese",
      "English",
      "Russian",
      "Korean",
      "Italian",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
