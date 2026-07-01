import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { EnquiriesClient } from "./EnquiriesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enquiries",
  robots: { index: false, follow: false },
};

type EnquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  createdAt?: string;
  created_at: string;
};

export default async function EnquiriesPage() {
  const { data } = await supabaseAdmin.from("enquiries").select("*").order("created_at", { ascending: false });

  const enquiries = ((data ?? []) as EnquiryRow[]).map((e) => ({
    id: e.id,
    name: e.name,
    email: e.email,
    phone: e.phone,
    subject: e.subject ?? "",
    message: e.message,
    createdAt: e.createdAt ?? e.created_at,
  }));

  return <EnquiriesClient enquiries={enquiries} />;
}
