import { supabaseAdmin } from "@/lib/supabase";
import { CareerListing, fallbackCareers } from "@/lib/careers";
import { CareersView } from "@/components/CareersView";

export const metadata = {
  title: "Careers | FLA",
  description: "Explore career opportunities at Foreign Language Academy.",
};

interface CareerRow {
  id: string;
  title: string;
  description: string;
  location: string;
  work_mode: string;
  employment_type: string;
  code: string;
  accent?: string;
  created_at?: string;
}

export default async function CareersPage() {
  const { data } = await supabaseAdmin
    .from("careers")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const careers: CareerListing[] = ((data ?? []) as CareerRow[]).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    location: item.location,
    workMode: item.work_mode,
    employmentType: item.employment_type,
    code: item.code,
    accent: item.accent,
    createdAt: item.created_at,
  }));

  return <CareersView listings={careers.length > 0 ? careers : fallbackCareers} />;
}
