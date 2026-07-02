"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/constants";

const MotionLink = motion.create(Link);

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] px-6 py-24 lg:px-12 lg:py-36">
      {/* Background decorative elements */}
      <div className="absolute -right-32 -top-32 size-96 rounded-full bg-[#e8734a]/5 blur-[100px]" />
      <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-[#e8734a]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
            Get Started
          </span>
          <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-white sm:text-5xl">
            Ready to speak your
            <br />
            first sentence in a
            <br />
            <span className="text-white/60">new language with FLA?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/50">
            Book a free demo class. No payment required. No obligation.
          </p>
        </motion.div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MotionLink
            href="/register"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, mass: 0.8 }}
            className="inline-flex h-14 items-center rounded-full bg-white px-10 text-base font-semibold text-[#1a1a1a] transition-colors duration-200 hover:bg-white/90"
          >
            Book Free Demo →
          </MotionLink>
          <motion.a
            href={`tel:${site.phone}`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, mass: 0.8 }}
            className="inline-flex h-14 items-center rounded-full border border-white/15 bg-white/5 px-10 text-base font-semibold text-white hover:bg-white/10"
          >
            Call {site.phone}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
