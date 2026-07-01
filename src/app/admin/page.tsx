import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
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

export default async function AdminPage() {
  const [registrationsRes, enquiriesRes] = await Promise.all([
    supabaseAdmin.from("registrations").select("*", { count: "exact" }).order("created_at", { ascending: false }),
    supabaseAdmin.from("enquiries").select("*", { count: "exact" }).order("created_at", { ascending: false }),
  ]);

  const mapReg = (r: RegistrationRow) => ({
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
  });

  const mapEnq = (e: EnquiryRow) => ({
    id: e.id,
    name: e.name,
    email: e.email,
    phone: e.phone,
    subject: e.subject ?? "",
    message: e.message,
    createdAt: e.createdAt ?? e.created_at,
  });

  const allRegistrations = ((registrationsRes.data ?? []) as RegistrationRow[]).map(mapReg);
  const allEnquiries = ((enquiriesRes.data ?? []) as EnquiryRow[]).map(mapEnq);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return (
    <AdminDashboard
      todayRegistrations={allRegistrations.filter((r) => new Date(r.createdAt) >= todayStart).length}
      totalRegistrations={registrationsRes.count ?? 0}
      totalEnquiries={enquiriesRes.count ?? 0}
      recentRegistrations={allRegistrations.slice(0, 10)}
      recentEnquiries={allEnquiries.slice(0, 10)}
    />
  );
}
