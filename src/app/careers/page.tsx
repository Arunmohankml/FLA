import { connection } from "next/server";
import { CareerListing } from "@/lib/careers";
import { listCareerRows } from "@/lib/careerStore";
import { CareersView } from "@/components/CareersView";

export const metadata = {
  title: "Careers at Foreign Language Academy",
  description:
    "Explore teaching, counselling, and student support careers at Foreign Language Academy in Chennai.",
};

export default async function CareersPage() {
  await connection();
  const rows = await listCareerRows({ activeOnly: true });
  const careers: CareerListing[] = rows.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    location: item.location,
    workMode: item.work_mode,
    employmentType: item.employment_type,
    code: item.code,
    accent: item.accent ?? undefined,
    createdAt: item.created_at,
  }));

  return <CareersView listings={careers} />;
}
