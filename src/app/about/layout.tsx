import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Foreign Language Academy",
  description:
    "Learn about Foreign Language Academy's online, offline, and hybrid language programs, certification preparation, trainers, and flexible batches in Chennai.",
  alternates: {
    canonical: "https://foreignlanguageacademy.in/about",
  },
  openGraph: {
    title: "About Foreign Language Academy",
    description:
      "Flexible online, offline, and hybrid foreign language learning since 2010.",
    url: "https://foreignlanguageacademy.in/about",
    siteName: "Foreign Language Academy",
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
