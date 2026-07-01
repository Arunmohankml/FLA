import { supabaseAdmin } from "@/lib/supabase";
import { fallbackCareers } from "@/lib/careers";
import { CareersAdminClient } from "./CareersAdminClient";

export const metadata = { title: "Careers | Admin" };

interface CareerRow {
  id: string;
  title: string;
  description: string;
  location: string;
  work_mode: string;
  employment_type: string;
  code: string;
  is_active?: boolean;
  created_at?: string;
}

export default async function CareersAdminPage() {
  const { data } = await supabaseAdmin
    .from("careers")
    .select("*")
    .order("created_at", { ascending: false });

  const dbCareers = ((data ?? []) as CareerRow[]).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    location: item.location,
    workMode: item.work_mode,
    employmentType: item.employment_type,
    code: item.code,
    isActive: item.is_active ?? true,
    createdAt: item.created_at ?? "",
  }));

  const careers = dbCareers.length > 0 ? dbCareers : fallbackCareers.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    location: item.location,
    workMode: item.workMode,
    employmentType: item.employmentType,
    code: item.code,
    isActive: true,
    createdAt: item.createdAt ?? "",
  }));

  return <CareersAdminClient careers={careers} />;
}
