"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "@/components/AuthProvider";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const showWhite = true;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: showWhite ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
        boxShadow: showWhite
          ? "0 14px 45px rgba(0,0,0,0.10)"
          : "0 2px 12px rgba(0,0,0,0.1)",
      }}
      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      style={{
        borderBottom: showWhite ? "1px solid rgba(185,226,255,0.55)" : "1px solid transparent",
        backdropFilter: showWhite ? "blur(18px)" : undefined,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-12">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
        >
          <motion.span
            animate={{ color: showWhite ? "#1B1B1B" : "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            FLA
          </motion.span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium transition-colors duration-200"
            >
              <motion.span
                animate={{
                  color: pathname === item.href
                    ? showWhite ? "#0c2847" : "#ffffff"
                    : showWhite ? "#536471" : "rgba(255,255,255,0.7)",
                }}
                whileHover={{
                  color: showWhite ? "#0c2847" : "#ffffff",
                }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!loading && user && isAdmin && (
            <Link href="/admin">
              <motion.div
                animate={{
                  backgroundColor: showWhite ? "rgba(27,27,27,0.06)" : "rgba(255,255,255,0.1)",
                  borderColor: showWhite ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.2)",
                  color: showWhite ? "#1B1B1B" : "#ffffff",
                }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              >
                <HiOutlineCog className="size-4" />
                Admin
              </motion.div>
            </Link>
          )}
          <motion.div
            animate={{
              backgroundColor: showWhite ? "#EAF4FF" : "rgba(29,155,240,0.18)",
              borderColor: "rgba(12,40,71,0.24)",
              color: "#0c2847",
            }}
            whileHover={{
              backgroundColor: showWhite ? "#DCEEFF" : "rgba(29,155,240,0.28)",
            }}
            transition={{ duration: 0.3 }}
            className="rounded-full border px-5 py-2 text-sm font-semibold"
          >
            <Link href="/book-demo">Book a Demo</Link>
          </motion.div>
          <motion.div
            animate={{
              backgroundColor: showWhite ? "#0c2847" : "rgba(255,255,255,0.1)",
              borderColor: showWhite ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.2)",
              color: showWhite ? "#ffffff" : "#ffffff",
            }}
            whileHover={{
              backgroundColor: showWhite ? "#1a4a7a" : "rgba(255,255,255,0.2)",
              boxShadow: showWhite ? "0 14px 34px rgba(12,40,71,0.28)" : "none",
            }}
            transition={{ duration: 0.3 }}
            className="rounded-full px-5 py-2 text-sm font-medium"
          >
            <Link href="/register">Register</Link>
          </motion.div>
        </div>

        <motion.button
          className="flex size-10 items-center justify-center rounded-full border md:hidden"
          animate={{
            borderColor: showWhite ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.2)",
            backgroundColor: showWhite ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.2)",
            color: showWhite ? "#1B1B1B" : "#ffffff",
          }}
          whileHover={{
            backgroundColor: showWhite ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <HiX className="size-6" />
          ) : (
            <HiOutlineMenuAlt3 className="size-6" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden md:hidden"
          >
            <nav className="flex flex-col gap-4 px-6 pb-6 pt-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium"
                  >
                    <motion.span
                      animate={{
                        color: pathname === item.href ? "#0c2847" : "#536471",
                      }}
                      whileHover={{ color: "#0c2847" }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
              {!loading && user && isAdmin && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                >
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 text-sm font-medium"
                  >
                    <HiOutlineCog className="size-4" />
                    <motion.span animate={{ color: "#1B1B1B" }}>
                      Admin Panel
                    </motion.span>
                  </Link>
                </motion.div>
              )}
              {!loading && user && isAdmin && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.05, duration: 0.3 }}
                >
                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#334155]"
                  >
                    <HiOutlineLogout className="size-4" />
                    Logout
                  </button>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 2) * 0.05, duration: 0.3 }}
              >
                <Link
                  href="/book-demo"
                  className="mt-2 inline-block rounded-full border border-[#0c2847]/20 bg-[#EAF4FF] px-5 py-2 text-center text-sm font-semibold text-[#0c2847] transition-colors hover:bg-[#DCEEFF]"
                  onClick={() => setOpen(false)}
                >
                  Book a Demo
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 3) * 0.05, duration: 0.3 }}
              >
                <Link
                  href="/register"
                  className="mt-2 inline-block rounded-full bg-[#0c2847] px-5 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#1a4a7a]"
                >
                  Register
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
