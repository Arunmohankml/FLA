"use client";

import { useState } from "react";
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
  HiOutlineX,
} from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

const navIcons: Record<string, React.ComponentType<{ className?: string }>> = {
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
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = adminNav.filter((item) =>
    item.href === "/admin/admins" ? isOwner : true
  );

  return (
    <div className="admin-theme flex min-h-screen flex-col bg-[#F5FAFF] pt-16 text-[#0F172A] lg:flex-row">
      <aside className="hidden w-64 shrink-0 border-r border-[#DCE8F5] bg-white p-6 shadow-[8px_0_28px_rgba(29,155,240,0.06)] lg:block">
        <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#334155]">
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
                className={`rounded-xl px-4 py-2.5 text-[15px] font-semibold transition-all ${
                  active
                    ? "bg-[#EAF4FF] text-[#0c2847] shadow-[0_1px_8px_rgba(29,155,240,0.12)]"
                    : "text-[#334155] hover:bg-[#F5FAFF] hover:text-[#0F172A]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-black/5 pt-4">
          <div className="mb-3 px-4">
            <p className="truncate text-sm text-[#334155]">{user?.email}</p>
            <p className="text-sm font-semibold text-[#0F172A] capitalize">
              {isOwner ? "Owner" : "Staff"}
            </p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-semibold text-[#334155] transition-all hover:bg-[#F5FAFF] hover:text-[#0F172A]"
          >
            <HiOutlineLogout className="size-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-[#F5FAFF] p-4 sm:p-6 lg:p-10">
        {children}
      </main>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="fixed bottom-6 left-4 right-4 z-50 origin-bottom-left rounded-2xl border border-[#DCE8F5] bg-white shadow-[0_10px_40px_rgba(29,155,240,0.14)] lg:hidden"
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 16 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between border-b border-black/6 px-5 py-3.5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#334155]">
                  Admin Panel
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex size-8 items-center justify-center rounded-full hover:bg-[#F5FAFF]"
                  aria-label="Close menu"
                >
                  <HiOutlineX className="size-4 text-[#334155]" />
                </button>
              </div>
              <div className="max-h-[55vh] overflow-y-auto px-3 py-2">
                {navItems.map((item) => {
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  const Icon = navIcons[item.href] || HiOutlineViewGrid;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-semibold transition-all ${
                        active
                          ? "bg-[#EAF4FF] text-[#0c2847]"
                          : "text-[#334155] hover:bg-[#F5FAFF] hover:text-[#0F172A]"
                      }`}
                    >
                      <Icon className="size-5 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-black/6 px-5 py-3.5">
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-[#334155]">
                      {user?.email}
                    </p>
                    <p className="text-sm font-semibold text-[#0F172A] capitalize">
                      {isOwner ? "Owner" : "Staff"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#DCE8F5] px-3 py-1.5 text-sm font-semibold text-[#334155] transition-all hover:bg-red-50 hover:text-red-600"
                  >
                    <HiOutlineLogout className="size-3.5" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <button
        onClick={() => setMenuOpen(true)}
        className="fixed bottom-6 left-6 z-30 flex size-14 items-center justify-center rounded-2xl bg-[#0c2847] text-white shadow-[0_4px_16px_rgba(29,155,240,0.28)] transition-transform active:scale-95 lg:hidden"
        aria-label="Open admin menu"
      >
        <HiOutlineViewGrid className="size-6" />
      </button>
    </div>
  );
}
