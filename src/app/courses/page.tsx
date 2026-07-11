import type { Metadata } from "next";
import { CourseJsonLd } from "@/components/CourseJsonLd";
import { languages } from "@/lib/constants";
import { SiteMediaProvider } from "@/components/SiteMediaProvider";
import { CoursesClient } from "./CoursesClient";

export const metadata: Metadata = {
  title: "Foreign Language Academy Courses in Chennai",
  description:
    "Explore Foreign Language Academy courses in Chennai: German, French, Spanish, Japanese, Chinese, English, Russian, Korean, and Italian from beginner to advanced levels.",
  alternates: {
    canonical: "https://foreignlanguageacademy.co.in/courses",
  },
};

export default function CoursesPage() {
  return (
    <>
      <CourseJsonLd />
      <SiteMediaProvider>
        <CoursesClient languages={languages} />
      </SiteMediaProvider>
    </>
  );
}
