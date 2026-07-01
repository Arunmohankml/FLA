"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "@/lib/constants";
import { useAuth } from "@/components/AuthProvider";
import {
  HiOutlineViewGrid,
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlinePhotograph,
  HiOutlineBadgeCheck,
  HiOutlineBriefcase,
  HiOutlineCalendar,
} from "react-icons/hi";

const mobileIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/admin": HiOutlineViewGrid,
  "/admin/registrations": HiOutlineDocumentText,
  "/admin/demo-bookings": HiOutlineCalendar,
  "/admin/careers": HiOutlineBriefcase,
  "/admin/job-applications": HiOutlineDocumentText,
  "/admin/enquiries": HiOutlineMail,
  "/admin/certificates": HiOutlineBadgeCheck,
  "/admin/media": HiOutlinePhotograph,
  "/admin/admins": HiOutlineCog,
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, isOwner } = useAuth();

  const navItems = adminNav.filter((item) =>
    item.href === "/admin/admins" ? isOwner : true
  );

  return (
    <div className="flex min-h-screen flex-col pt-16 lg:flex-row">
      <aside className="hidden w-64 shrink-0 border-r border-black/5 bg-[#faf5f0] p-6 lg:block">
        <h2 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-[#e8734a]/10 text-[#e8734a] shadow-[0_1px_3px_rgba(232,115,74,0.08)]"
                    : "text-black/50 hover:bg-white hover:text-black/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-black/5 pt-4">
          <div className="mb-3 px-4">
            <p className="truncate text-xs text-black/40">{user?.email}</p>
            <p className="text-xs font-medium text-black/70 capitalize">
              {isOwner ? "Owner" : "Staff"}
            </p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-black/50 transition-all hover:bg-white hover:text-black/80"
          >
            <HiOutlineLogout className="size-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-white p-4 pb-24 sm:p-6 lg:p-10 lg:pb-10">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/5 bg-white/95 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around py-2">
          {navItems.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = mobileIcons[item.href] || HiOutlineViewGrid;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium transition-colors ${
                  active ? "text-[#e8734a]" : "text-black/40"
                }`}
              >
                <Icon className={`size-5 ${active ? "text-[#e8734a]" : ""}`} />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="flex flex-1 flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium text-black/40"
          >
            <HiOutlineLogout className="size-5" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
