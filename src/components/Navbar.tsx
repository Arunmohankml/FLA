"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Nursing & IT Jobs", href: "/nursing-it-jobs" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ) : (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M8 12h12M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CogIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.04.04a2 2 0 0 1-2.83 2.83l-.04-.04a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 0 1-4 0v-.06a1.7 1.7 0 0 0-1.02-1.56 1.7 1.7 0 0 0-1.89.34l-.04.04a2 2 0 1 1-2.83-2.83l.04-.04A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 0 1 0-4h.06A1.7 1.7 0 0 0 4.6 8.96a1.7 1.7 0 0 0-.34-1.88l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04a1.7 1.7 0 0 0 1.88.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.06a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.04-.04a2 2 0 1 1 2.83 2.83l-.04.04a1.7 1.7 0 0 0-.34 1.88V9c.22.62.82 1 1.56 1H21a2 2 0 0 1 0 4h-.06c-.74 0-1.34.38-1.56 1Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 17l5-5-5-5M20 12H9M11 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const showWhite = true;

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300"
      style={{
        backgroundColor: showWhite ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
        boxShadow: showWhite
          ? "0 14px 45px rgba(0,0,0,0.10)"
          : "0 2px 12px rgba(0,0,0,0.1)",
        borderBottom: showWhite ? "1px solid rgba(185,226,255,0.55)" : "1px solid transparent",
        backdropFilter: showWhite ? "blur(18px)" : undefined,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-12">
        <Link
          href="/"
          prefetch={false}
          className="inline-flex items-center"
          aria-label="Foreign Language Academy home"
        >
          <div className="relative h-12 w-[72px] sm:h-14 sm:w-[84px]">
            <Image
              src="/FLA-logo.webp"
              alt="Foreign Language Academy logo"
              width={300}
              height={200}
              sizes="(max-width: 640px) 72px, 84px"
              className="size-full object-contain"
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={() => setOpen(false)}
              className="text-sm font-medium transition-colors duration-200 lg:text-base"
              style={{
                color: pathname === item.href
                  ? showWhite ? "#0c2847" : "#ffffff"
                  : showWhite ? "#536471" : "rgba(255,255,255,0.7)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!loading && user && isAdmin && (
            <Link href="/admin" prefetch={false}>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                style={{
                  backgroundColor: showWhite ? "rgba(27,27,27,0.06)" : "rgba(255,255,255,0.1)",
                  borderColor: showWhite ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.2)",
                  color: showWhite ? "#1B1B1B" : "#ffffff",
                }}
              >
                <CogIcon />
                Admin
              </div>
            </Link>
          )}
          <div
            className="rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-[#DCEEFF]"
            style={{
              backgroundColor: showWhite ? "#EAF4FF" : "rgba(29,155,240,0.18)",
              borderColor: "rgba(12,40,71,0.24)",
              color: "#0c2847",
            }}
          >
            <Link href="/book-demo" prefetch={false}>Book a Demo</Link>
          </div>
          <div
            className="rounded-full px-5 py-2 text-sm font-medium text-white transition-[background-color,box-shadow] duration-300 hover:bg-[#1a4a7a] hover:shadow-[0_14px_34px_rgba(12,40,71,0.28)]"
            style={{
              backgroundColor: showWhite ? "#0c2847" : "rgba(255,255,255,0.1)",
              borderColor: showWhite ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.2)",
            }}
          >
            <Link href="/register" prefetch={false}>Register</Link>
          </div>
        </div>

        <button
          className="flex size-10 items-center justify-center rounded-full border transition-transform duration-150 active:scale-95 md:hidden"
          style={{
            borderColor: showWhite ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.2)",
            backgroundColor: showWhite ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.2)",
            color: showWhite ? "#1B1B1B" : "#ffffff",
          }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
          <div className="overflow-hidden md:hidden">
            <nav className="flex flex-col gap-4 px-6 pb-6 pt-2">
              {navItems.map((item) => (
                <div
                  key={item.href}
                >
                  <Link
                    href={item.href}
                    prefetch={false}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-[#536471] transition-colors hover:text-[#0c2847]"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              {!loading && user && isAdmin && (
                <div>
                  <Link
                    href="/admin"
                    prefetch={false}
                    className="inline-flex items-center gap-2 text-sm font-medium"
                  >
                    <CogIcon />
                    <span className="text-[#1B1B1B]">Admin Panel</span>
                  </Link>
                </div>
              )}
              {!loading && user && isAdmin && (
                <div>
                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#334155]"
                  >
                    <LogoutIcon />
                    Logout
                  </button>
                </div>
              )}
              <div>
                <Link
                  href="/book-demo"
                  prefetch={false}
                  className="mt-2 inline-block rounded-full border border-[#0c2847]/20 bg-[#EAF4FF] px-5 py-2 text-center text-sm font-semibold text-[#0c2847] transition-colors hover:bg-[#DCEEFF]"
                  onClick={() => setOpen(false)}
                >
                  Book a Demo
                </Link>
              </div>
              <div>
                <Link
                  href="/register"
                  prefetch={false}
                  className="mt-2 inline-block rounded-full bg-[#0c2847] px-5 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#1a4a7a]"
                >
                  Register
                </Link>
              </div>
            </nav>
          </div>
        )}
    </header>
  );
}
