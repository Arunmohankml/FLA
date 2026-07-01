import { supabaseAdmin } from "@/lib/supabase";
import { DemoBookingsClient } from "./DemoBookingsClient";

export const metadata = { title: "Demo Bookings | Admin" };

interface DemoBookingRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  message: string;
  status?: string;
  created_at?: string;
}

export default async function DemoBookingsPage() {
  const { data } = await supabaseAdmin
    .from("demo_bookings")
    .select("*")
    .order("created_at", { ascending: false });

  const bookings = ((data ?? []) as DemoBookingRow[]).map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email,
    preferred_date: item.preferred_date ?? "",
    message: item.message ?? "",
    status: item.status ?? "new",
    created_at: item.created_at ?? "",
  }));

  return <DemoBookingsClient bookings={bookings} />;
}
