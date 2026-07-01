"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { AdminShell } from "./AdminShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  );
}
