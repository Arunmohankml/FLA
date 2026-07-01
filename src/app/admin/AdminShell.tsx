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

      <main className="flex-1 bg-white p-4 sm:p-6 lg:p-10">
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
              className="fixed bottom-6 left-4 right-4 z-50 origin-bottom-left rounded-2xl border border-black/6 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)] lg:hidden"
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 16 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between border-b border-black/6 px-5 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">
                  Admin Panel
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex size-7 items-center justify-center rounded-full hover:bg-black/5"
                  aria-label="Close menu"
                >
                  <HiOutlineX className="size-4 text-black/50" />
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
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                        active
                          ? "bg-[#e8734a]/10 text-[#e8734a]"
                          : "text-black/50 hover:bg-[#faf5f0] hover:text-black/80"
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
                    <p className="truncate text-xs text-black/40">
                      {user?.email}
                    </p>
                    <p className="text-xs font-medium text-black/70 capitalize">
                      {isOwner ? "Owner" : "Staff"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/8 px-3 py-1.5 text-xs font-semibold text-black/50 transition-all hover:bg-red-50 hover:text-red-600"
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
        className="fixed bottom-6 left-6 z-30 flex size-14 items-center justify-center rounded-2xl bg-foreground text-background shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform active:scale-95 lg:hidden"
        aria-label="Open admin menu"
      >
        <HiOutlineViewGrid className="size-6" />
      </button>
    </div>
  );
}
