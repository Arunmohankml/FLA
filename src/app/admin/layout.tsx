"use client";

import AuthProvider from "@/components/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";
import { AdminShell } from "./AdminShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard>
        <AdminShell>{children}</AdminShell>
      </AuthGuard>
    </AuthProvider>
  );
}
