import type { Metadata } from "next";
import { getAdmins } from "@/lib/data";
import { AdminsClient } from "./AdminsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Admins",
  robots: { index: false, follow: false },
};

export default async function AdminsPage() {
  const admins = await getAdmins();

  return <AdminsClient admins={admins} />;
}
