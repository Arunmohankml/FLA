import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Foreign Language Academy Chennai",
  description:
    "Contact Foreign Language Academy in Chennai for course enquiries, demo classes, registrations, and language training support.",
  alternates: {
    canonical: "https://foreignlanguageacademy.co.in/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
