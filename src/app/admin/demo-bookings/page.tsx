import { supabaseAdmin } from "@/lib/supabase";
import { DemoBookingsClient } from "./DemoBookingsClient";

export const metadata = { title: "Demo Bookings | Admin" };

interface DemoBookingRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  qualification: string;
  state: string;
  course: string;
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
    qualification: item.qualification,
    state: item.state,
    course: item.course,
    status: item.status ?? "new",
    createdAt: item.created_at ?? "",
  }));

  return <DemoBookingsClient bookings={bookings} />;
}
