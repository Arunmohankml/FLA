import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Foreign Language Academy. Call +91 8129669247 or email aforeignlanguage@gmail.com. Located in Maruthi Nagar, Rajakilpakkam, Chennai.",
  alternates: {
    canonical: "https://foreignlanguageacademy.in/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
