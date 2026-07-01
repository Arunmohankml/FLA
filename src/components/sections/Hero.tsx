"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSiteMedia } from "@/components/SiteMediaProvider";
import { MediaImage } from "@/components/MediaImage";
import { mediaFallbacks } from "@/lib/constants";

export function Hero() {
  const heroImg = useSiteMedia("hero", mediaFallbacks.hero);

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="page-shell pt-24 lg:pt-32">
        {/* ── Heading + description + buttons ──────────────── */}
        <div className="mb-8 lg:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="font-heading text-5xl font-medium leading-[1.28] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[72px]"
          >
            Learn online, offline,
            <br />
            <span className="text-muted-foreground">or in flexible hybrid batches</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-lg text-lg leading-[1.5] text-muted-foreground"
          >
            Live online classes and in-person classroom training for students,
            professionals, and study-abroad aspirants across beginner to
            advanced levels.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/courses"
              className="inline-flex h-14 items-center rounded-full bg-foreground px-8 text-base font-semibold text-background transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Explore Courses →
            </Link>
            <Link
              href="/about"
              className="inline-flex h-14 items-center rounded-full border border-black/10 px-8 text-base font-medium text-foreground transition-all duration-300 hover:bg-black/5"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* ── Full-width rounded hero image ──────────────────── */}
        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[32px] lg:aspect-[23/8]">
          <MediaImage
            src={heroImg}
            alt="Indian students attending a Foreign Language Academy class"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute left-6 top-6 lg:left-10 lg:top-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-[#e8734a] animate-pulse" />
              EST. 2007 — CHENNAI
            </span>
          </motion.div>

          {/* Floating stats on image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute bottom-6 right-6 hidden rounded-2xl bg-white/15 px-5 py-3 backdrop-blur-md lg:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-white text-[#e8734a]">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 6 3 12 0v-5" /></svg>
                </span>
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-white text-[#e8734a]">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                </span>
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-white text-[#e8734a]">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </span>
              </div>
              <p className="text-sm font-semibold text-white">1900+ students</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
