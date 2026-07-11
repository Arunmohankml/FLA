import type { Metadata } from "next";
import { NursingItJobsClient } from "./NursingItJobsClient";

export const metadata: Metadata = {
  title: "Nursing & IT Jobs Abroad",
  description:
    "Nursing and IT career preparation abroad from Foreign Language Academy with B2 language training, interview coaching, documentation guidance, and 100% placement assistance for eligible students.",
  keywords: [
    "Nursing jobs abroad",
    "IT jobs abroad",
    "Nursing career Germany",
    "Nursing jobs Europe",
    "IT career opportunities abroad",
    "B2 German for nurses",
    "B2 language training",
    "Foreign Language Academy placement assistance",
    "Study and work abroad language training",
    "Nursing German course Chennai",
    "Software jobs Germany language training",
  ],
  alternates: {
    canonical: "https://foreignlanguageacademy.co.in/nursing-it-jobs",
  },
  openGraph: {
    title: "Nursing & IT Jobs Abroad | Foreign Language Academy",
    description:
      "Language training up to B2 level, career preparation, guidance, and 100% placement assistance for eligible nursing and IT students.",
    url: "https://foreignlanguageacademy.co.in/nursing-it-jobs",
    siteName: "Foreign Language Academy",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Foreign Language Academy nursing and IT jobs abroad guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nursing & IT Jobs Abroad | Foreign Language Academy",
    description:
      "B2 language training, career preparation, and placement assistance for eligible nursing and IT students.",
    images: ["/brand/og-image.png"],
  },
};

export default function NursingItJobsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Nursing and IT Jobs Abroad Career Preparation",
    provider: {
      "@type": "EducationalOrganization",
      name: "Foreign Language Academy",
      url: "https://foreignlanguageacademy.co.in",
    },
    areaServed: ["India", "Germany", "United Kingdom", "Ireland", "Australia", "Canada", "Japan", "Singapore"],
    serviceType: "Language training, career preparation, and placement assistance",
    description:
      "Foreign Language Academy provides language training up to B2 level, exam preparation, interview coaching, documentation guidance, and 100% placement assistance for eligible nursing and IT students planning careers abroad.",
    url: "https://foreignlanguageacademy.co.in/nursing-it-jobs",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Career pathways",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Nursing careers abroad preparation",
            description: "B2 language training, healthcare communication practice, documentation support, and placement assistance.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "IT jobs abroad preparation",
            description: "Business communication, interview preparation, international CV guidance, and placement assistance.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NursingItJobsClient />
    </>
  );
}
