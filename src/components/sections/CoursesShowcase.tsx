"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { languages, mediaFallbacks } from "@/lib/constants";
import { useSiteMedia } from "@/components/SiteMediaProvider";
import { MediaImage } from "@/components/MediaImage";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const langFlags: Record<string, string> = {
  german: "de",
  french: "fr",
  japanese: "jp",
  spanish: "es",
  chinese: "cn",
  english: "gb", // or "us" if you prefer US English
  russian: "ru",
  korean: "kr",
  italian: "it",
};

const langImages: Record<string, string> = {
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

export function CoursesShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const coursesHero = useSiteMedia("courses-hero", mediaFallbacks["courses-hero"]);
  const featured = languages.slice(0, 3);
  const pillCourses = languages.slice(3);
  const isInView = useInView(sectionRef, { margin: "240px" });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimateMarquee = isInView && !prefersReducedMotion;

  return (
    <section ref={sectionRef} className="bg-[#F5FAFF] py-16 lg:py-24">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.45fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-xl"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-black/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1D9BF0]" />
              Our Courses
            </span>

            <h2 className="font-heading text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
              Discover the Right Course for{" "}
              <span className="text-[#1D9BF0]">Your Path</span>
            </h2>

            <div className="mt-5 h-px w-28 bg-[#1D9BF0]/60" />

            <p className="mt-7 max-w-md text-base leading-7 text-[#334155]">
              From beginners to advanced learners, our structured and immersive
              courses help you grow through online, offline, and hybrid learning.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  icon: "GraduationCap",
                  title: "Experienced Trainers",
                  text: "Learn with certified language mentors and exam-focused guidance.",
                },
                {
                  icon: "BookOpen",
                  title: "Flexible Learning",
                  text: "Online, offline, or hybrid batches designed around your schedule.",
                },
                {
                  icon: "Globe2",
                  title: "Global Certification",
                  text: "Prepare for recognised language certifications and global goals.",
                },
              ].map((item, index) => {
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
                    className="group flex cursor-default gap-4 rounded-3xl p-2 transition-all duration-500 ease-out hover:scale-[1.04] hover:bg-white/55 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-[#EAF4FF]">
                      {item.icon === "GraduationCap" ? (
                        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 6 3 12 0v-5" />
                        </svg>
                      ) : item.icon === "BookOpen" ? (
                        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                      ) : (
                        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      )}
                    </span>

                    <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
                      <span className="block text-base font-semibold text-foreground">
                        {item.title}
                      </span>
                      <span className="mt-1 block max-w-xs text-[15px] leading-7 text-[#334155]">
                        {item.text}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="/courses"
              className="mt-9 inline-flex h-12 items-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0C8BDD] hover:shadow-[0_12px_30px_rgba(29,155,240,0.18)]"
            >
              View All Courses
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </Link>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="group relative overflow-hidden rounded-[34px] shadow-[0_18px_55px_rgba(0,0,0,0.12)]"
            >
              <Link href={`/courses/${featured[0].slug}`} className="block">
                <div className="relative min-h-[520px] overflow-hidden rounded-[34px]">
                  <MediaImage
                    src={langImages[featured[0].slug] || coursesHero}
                    alt={`${featured[0].name} online and offline language course`}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute left-6 top-6 inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                    {featured[0].levels}
                  </div>

                  <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white/80 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 group-hover:text-white/90">
                    <span aria-hidden="true">↗</span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-7 lg:p-9">
                    <h3 className="font-heading text-4xl font-medium leading-none tracking-[-0.04em] text-white lg:text-5xl">
                      {featured[0].name}
                    </h3>

                    <p className="mt-4 max-w-sm text-base leading-7 text-white/90">
                      Master one of the world&apos;s most in-demand languages.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/85">
                      <span>Duration: {featured[0].duration}</span>
                      <span className="text-white/35">|</span>
                      <span>Hybrid Mode</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <div className="grid gap-4">
              {featured.slice(1, 3).map((lang, index) => (
                <motion.div
                  key={lang.slug}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.18 + index * 0.08 }}
                  className="group relative overflow-hidden rounded-[32px] shadow-[0_16px_45px_rgba(0,0,0,0.1)]"
                >
                  <Link href={`/courses/${lang.slug}`} className="block">
                    <div className="relative min-h-[250px] overflow-hidden rounded-[32px] lg:min-h-[252px]">
                      <MediaImage
                        src={langImages[lang.slug] || coursesHero}
                        alt={`${lang.name} language course`}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />

                      <div className="absolute left-5 top-5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                        {lang.levels}
                      </div>

                      <div className="absolute right-5 bottom-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white/80 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 group-hover:text-white/90">
                        <span aria-hidden="true">↗</span>
                      </div>

                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="font-heading text-3xl font-medium leading-none tracking-[-0.03em] text-white">
                          {lang.name}
                        </h3>
                        <p className="mt-2 text-sm text-white/88">
                          {lang.duration} · Hybrid
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="relative mt-10 overflow-hidden"
        >
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#F5FAFF] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#F5FAFF] to-transparent" />

          <motion.div
            animate={shouldAnimateMarquee ? { x: ["0%", "-50%"] } : { x: "0%" }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-3 will-change-transform"
          >
            {[...pillCourses, ...pillCourses].map((lang, index) => (
              <Link key={`${lang.slug}-${index}`} href={`/courses/${lang.slug}`}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.03 }}
                  className="flex min-w-[152px] items-center gap-3 rounded-full border border-black/8 bg-white px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5FAFF]">
                    {lang.slug === "soft-skills" ? (
                      <GraduationCap className="h-5 w-5 text-[#1D9BF0]" />
                    ) : (
                      <img
                        src={`https://api.iconify.design/circle-flags:${langFlags[lang.slug]}.svg`}
                        alt={`${lang.name} flag`}
                        width={32}
                        height={32}
                        loading="lazy"
                        className="h-8 w-8"
                      />
                    )}
                  </span>

                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {lang.name}
                    </span>
                    <span className="block text-xs text-[#334155]">
                      {lang.duration}
                    </span>
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
