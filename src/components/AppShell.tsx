"use client";

import type { ReactNode } from "react";
import AuthProvider from "@/components/AuthProvider";
import { LenisProvider } from "@/components/LenisProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LenisProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </LenisProvider>
    </AuthProvider>
  );
}
