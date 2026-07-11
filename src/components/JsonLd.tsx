import { site } from "@/lib/constants";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    description: site.tagline,
    url: "https://foreignlanguageacademy.co.in",
    logo: "https://foreignlanguageacademy.co.in/brand/icon-512.png",
    image: "https://foreignlanguageacademy.co.in/brand/og-image.png",
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
    foundingDate: "2010",
    areaServed: [
      "Chennai",
      "India",
      "Australia",
      "Canada",
      "New Zealand",
      "Worldwide",
    ],
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
      "IELTS",
      "Soft skills",
      "Study abroad language training",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Foreign language courses",
      itemListElement: [
        "German language course",
        "French language course",
        "Japanese language course",
        "Korean language course",
        "Spanish language course",
        "Chinese Mandarin course",
        "Spoken English and IELTS course",
        "Russian language course",
        "Italian language course",
        "Soft skills training",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name,
          provider: {
            "@type": "EducationalOrganization",
            name: site.name,
            url: "https://foreignlanguageacademy.co.in",
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
