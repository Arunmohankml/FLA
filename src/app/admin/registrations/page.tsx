import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { RegistrationsClient } from "./RegistrationsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Registrations",
  robots: { index: false, follow: false },
};

type RegistrationRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  level: string;
  timeSlot?: string;
  time_slot?: string;
  purpose?: string;
  address?: string;
  createdAt?: string;
  created_at: string;
};

export default async function RegistrationsPage() {
  const { data } = await supabaseAdmin.from("registrations").select("*").order("created_at", { ascending: false });

  const registrations = ((data ?? []) as RegistrationRow[]).map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    language: r.language,
    level: r.level,
    timeSlot: r.timeSlot ?? r.time_slot ?? "",
    purpose: r.purpose ?? "",
    address: r.address ?? "",
    createdAt: r.createdAt ?? r.created_at,
  }));

  return <RegistrationsClient registrations={registrations} />;
}
