import type { Metadata } from "next";
import { RegisterClient } from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register for Foreign Language Academy Courses",
  description:
    "Register for German, French, Japanese, Spanish, and other language courses at Foreign Language Academy in Chennai.",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
