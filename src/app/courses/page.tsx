import type { Metadata } from "next";
import { CourseJsonLd } from "@/components/CourseJsonLd";
import { languages } from "@/lib/constants";
import { CoursesClient } from "./CoursesClient";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore our 9 language courses: German, French, Spanish, Japanese, Chinese, English, Russian, Korean, Italian. All levels A1–C2. Enroll now.",
  alternates: {
    canonical: "https://foreignlanguageacademy.in/courses",
  },
};

export default function CoursesPage() {
  return (
    <>
      <CourseJsonLd />
      <CoursesClient languages={languages} />
    </>
  );
}
