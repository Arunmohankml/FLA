import type { Metadata } from "next";
import { Instrument_Sans, Epilogue } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { AuthProvider } from "@/components/AuthProvider";
import { SiteMediaProvider } from "@/components/SiteMediaProvider";
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
    default: "Foreign Language Academy | Learn Languages in Chennai",
    template: "%s | Foreign Language Academy",
  },
  description:
    "Excel in language learning since 2007. Expert courses in German, French, Spanish, Japanese, Chinese, English, Russian, Korean & Italian in Chennai.",
  keywords: [
    "language academy",
    "learn languages",
    "German classes Chennai",
    "French classes",
    "Japanese courses",
    "foreign language",
  ],
  metadataBase: new URL("https://foreignlanguageacademy.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Foreign Language Academy",
    title: "Foreign Language Academy | Learn Languages in Chennai",
    description:
      "Excellence in language learning since 2007. German, French, Spanish, Japanese, Chinese, English, Russian, Korean & Italian.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foreign Language Academy",
    description:
      "Excellence in language learning since 2007. 9 languages. Certified trainers.",
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
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Noto+Sans+Tamil:wght@700&family=Noto+Sans+Malayalam:wght@700&family=Noto+Sans+Devanagari:wght@700&family=Noto+Sans+Arabic:wght@700&family=Noto+Sans+Hebrew:wght@700&family=Noto+Sans+JP:wght@700&family=Noto+Sans+KR:wght@700&family=Noto+Sans+Thai:wght@700&display=swap"
          />
        </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <OrganizationJsonLd />
        <AuthProvider>
          <SiteMediaProvider>
            <LenisProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </LenisProvider>
          </SiteMediaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
