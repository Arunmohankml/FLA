import { connection } from "next/server";
import { listCareerRows } from "@/lib/careerStore";
import { CareersAdminClient } from "./CareersAdminClient";

export const metadata = { title: "Careers | Admin" };

export default async function CareersAdminPage() {
  await connection();
  const rows = await listCareerRows();
  const careers = rows.map((item) => ({
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

  return <CareersAdminClient careers={careers} />;
}
