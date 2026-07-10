import type { Metadata } from "next";
import { Instrument_Sans, Epilogue } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { LenisProvider } from "@/components/LenisProvider";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const epilogue = Epilogue({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Foreign Language Academy Chennai | Online Foreign Language Courses",
    template: "%s | Foreign Language Academy",
  },
  description:
    "Foreign Language Academy Chennai offers online, offline, and hybrid German, French, Japanese, Korean, Spanish, Chinese, English, Russian, Italian, IELTS, soft skills, and study abroad language courses.",
  keywords: [
    "Foreign Language Academy Chennai",
    "Best Foreign Language Institute in Chennai",
    "Best Language Academy in Chennai",
    "Online Foreign Language Courses",
    "Certified Foreign Language Courses",
    "Online Language Classes with Certificate",
    "Language Classes for Working Professionals",
    "German classes Chennai",
    "German Language Course Chennai",
    "Goethe Exam Preparation",
    "French Classes Chennai",
    "DELF Preparation",
    "Japanese Language Classes Chennai",
    "JLPT Coaching",
    "Korean Language Classes Chennai",
    "TOPIK Preparation",
    "Spoken English Classes Chennai",
    "IELTS English Classes",
    "Study in Germany Language Course",
    "Language Course for Abroad Studies",
  ],
  metadataBase: new URL("https://foreignlanguageacademy.in"),
  applicationName: "Foreign Language Academy",
  authors: [{ name: "Foreign Language Academy", url: "https://foreignlanguageacademy.in" }],
  creator: "Foreign Language Academy",
  publisher: "Foreign Language Academy",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32x32.png"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Foreign Language Academy",
    title: "Foreign Language Academy Chennai | Learn Languages Online and Offline",
    description:
      "German, French, Japanese, Korean, Spanish, Chinese, English, Russian, Italian, IELTS, soft skills, and study abroad language training.",
    url: "https://foreignlanguageacademy.in",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Foreign Language Academy logo and language courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foreign Language Academy Chennai",
    description:
      "Online, offline, and hybrid language courses with certified expert trainers.",
    images: ["/brand/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://foreignlanguageacademy.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${instrumentSans.variable} ${epilogue.variable} antialiased`}
      >
      <body className="min-h-screen bg-background font-sans text-foreground">
        <OrganizationJsonLd />
        <LenisProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
