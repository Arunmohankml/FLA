import { supabaseAdmin } from "@/lib/supabase";
import { JobApplicationsClient } from "./JobApplicationsClient";

export const metadata = { title: "Job Applications | Admin" };

interface ApplicationRow {
  id: string;
  job_title: string;
  job_code: string;
  name: string;
  email: string;
  phone: string;
  experience?: string;
  message?: string;
  resume_url?: string | null;
  status?: string;
  created_at?: string;
}

export default async function JobApplicationsPage() {
  const { data } = await supabaseAdmin
    .from("career_applications")
    .select("*")
    .order("created_at", { ascending: false });

  const applications = ((data ?? []) as ApplicationRow[]).map((item) => ({
    id: item.id,
    jobTitle: item.job_title,
    jobCode: item.job_code,
    name: item.name,
    email: item.email,
    phone: item.phone,
    experience: item.experience ?? "",
    message: item.message ?? "",
    resumeUrl: item.resume_url ?? "",
    status: item.status ?? "new",
    createdAt: item.created_at ?? "",
  }));

  return <JobApplicationsClient applications={applications} />;
}
