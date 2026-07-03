"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { memo } from "react";
import { ReasonsToLearn } from "@/components/ReasonsToLearn";
import { LearningRhythm } from "@/components/sections/LearningRhythm";
import { PrivateCoaching } from "@/components/sections/PrivateCoaching";
import { ExamPreparation } from "@/components/sections/ExamPreparation";
import { useSiteMedia } from "@/components/SiteMediaProvider";
import { MediaImage } from "@/components/MediaImage";
import { mediaFallbacks } from "@/lib/constants";

interface Language {
  name: string;
  slug: string;
  flag: string;
  levels: string;
  duration: string;
}

interface CoursesClientProps {
  languages: Language[];
}

export const langImages: Record<string, string> = {
  german: mediaFallbacks["certification-prep"],
  french: mediaFallbacks["online-class"],
  japanese: mediaFallbacks["hybrid-learning"],
  spanish: "/image46.webp",
  chinese: mediaFallbacks["study-abroad"],
  english: mediaFallbacks["offline-class"],
  russian: "/image47.webp",
  korean: "/image48.webp",
  italian: "/image49.webp",
  "soft-skills": mediaFallbacks["group-discussion"],
};

const CourseCard = memo(function CourseCard({
  lang,
  coursesHero,
}: {
  lang: Language;
  coursesHero: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-shadow duration-300 will-change-transform hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
    >
      <Link href={`/courses/${lang.slug}`} className="block">
        {/* Card image */}
        <div className="relative h-[240px] overflow-hidden rounded-t-[32px] sm:h-[280px]">
          <MediaImage
            src={langImages[lang.slug] || coursesHero}
            alt={`${lang.name} language course with online and offline options`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />

          {/* Level badge */}
          <div className="absolute left-4 top-4 z-10">
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 font-heading text-xs font-semibold text-white backdrop-blur-sm">
              {lang.levels}
            </span>
          </div>

          {/* Language code + name on image */}
          <div className="absolute left-4 bottom-4 z-10">
            <p className="font-heading text-sm font-semibold tracking-wider text-white/80">{lang.slug.toUpperCase()}</p>
            <p className="font-heading text-3xl font-medium leading-tight text-white">{lang.name}</p>
            <p className="mt-1 text-xs text-white/85">Duration: {lang.duration} · Hybrid Mode</p>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5">
          <h3 className="font-heading text-[22px] font-medium leading-[1.33] text-foreground">
            {lang.name}
          </h3>
          <p className="mt-1.5 text-[15px] leading-6 text-[#334155]">
            Master one of the world&apos;s most in-demand languages.
          </p>

          <div className="my-4 h-px bg-black/5" />

          <div className="flex justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#334155]">Duration</p>
              <p className="mt-1 font-heading text-sm font-medium">{lang.duration}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#334155]">Mode</p>
              <p className="mt-1 font-heading text-sm font-medium">All modes</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#334155]">Certificate</p>
              <p className="mt-1 font-heading text-sm font-medium">Global</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <Link
          href="/register"
          onClick={(e) => e.stopPropagation()}
          className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-[#0C8BDD]"
        >
          Register →
        </Link>
      </div>
    </motion.div>
  );
});

export function CoursesClient({ languages }: CoursesClientProps) {
  const coursesHero = useSiteMedia("courses-hero", mediaFallbacks["courses-hero"]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-background">
        <div className="page-shell pt-24 lg:pt-32">
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[32px] lg:aspect-[23/8]">
            <MediaImage
              src={coursesHero}
              alt="Foreign Language Academy online and offline courses"
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute left-6 top-6 lg:left-10 lg:top-10"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 font-heading text-xs font-semibold text-white backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-[#1D9BF0] animate-pulse" />
                9 LANGUAGES AVAILABLE
              </span>
            </motion.div>

            {/* Floating stats on image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-6 right-6 hidden rounded-[20px] bg-white/15 px-5 py-3 backdrop-blur-md lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["🇩🇪", "🇫🇷", "🇯🇵"].map((f) => (
                    <span key={f} className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-white text-base shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold text-white">1900+ students</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Course Grid ── */}
      <section id="courses-grid" className="pb-12 pt-4">
        <div className="page-shell">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
              Foreign Language Academy Courses
            </span>
            <h1 className="font-heading text-4xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-5xl">
              Find the Right Class at Foreign Language Academy
            </h1>
            <p className="mt-3 max-w-lg text-base text-[#334155]">
              Discover beginner to advanced language programs with online
              classes, offline classroom training, and flexible hybrid batches.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {languages.map((lang) => (
              <CourseCard
                key={lang.name}
                lang={lang}
                coursesHero={coursesHero}
              />
            ))}
          </div>
        </div>
      </section>

      <LearningRhythm />
      <PrivateCoaching />
      <ExamPreparation />
      <ReasonsToLearn />

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#071D2E] py-16">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-[#1D9BF0]/5 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-[#1D9BF0]/5 blur-[100px]" />

        <div className="relative page-shell max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/75"
          >
            Get Started
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-white sm:text-5xl"
          >
            Ready to speak your
            <br />
            first sentence in a
            <br />
            <span className="text-white/80">new language?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mt-4 max-w-md text-lg text-white/75"
          >
            Book a free demo class. No payment required. No obligation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Link
              href="/register"
              className="inline-flex h-14 items-center rounded-full bg-[#1D9BF0] px-8 text-base font-semibold text-white transition-all duration-300 hover:bg-[#0C8BDD]"
            >
              Book Free Demo →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
