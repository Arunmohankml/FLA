import type { Metadata } from "next";
import { RegisterClient } from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register | FLA",
  description: "Register for language courses at Foreign Language Academy.",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
