"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export function OwnerGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isOwner } = useAuth();
  const router = useRouter();
  const checked = !loading && !!user && isOwner;

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!isOwner) {
        router.push("/admin");
      }
    }
  }, [user, loading, isOwner, router]);

  if (loading || !checked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
