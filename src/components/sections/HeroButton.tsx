"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "white";
}

const MotionLink = motion.create(Link);

export function HeroButton({ href, children, variant = "primary" }: HeroButtonProps) {
  const base = "inline-flex rounded-full px-8 py-3.5 text-sm font-bold no-underline";

  const styles = {
    primary:
      "bg-white/5 backdrop-blur-lg border border-white/15 text-white/90 hover:bg-white/15",
    secondary:
      "bg-white/5 backdrop-blur-lg border border-white/10 text-white/85 hover:bg-white/15 hover:text-white",
    white:
      "bg-white text-[#111] shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-white/90",
  };

  return (
    <MotionLink
      href={href}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15, mass: 0.8 }}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </MotionLink>
  );
}
