"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CourseData } from "@/lib/courseData";
import { MediaImage } from "@/components/MediaImage";
import { langImages } from "@/app/courses/CoursesClient";

interface CourseClientProps {
  course: CourseData;
  otherCourses: { name: string; slug: string; flag: string }[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export function CourseClient({ course, otherCourses }: CourseClientProps) {
  const heroImg = langImages[course.slug] || "/image37.png";

  return (
    <>
      {/* ── Hero with image ── */}
      <section className="relative overflow-hidden bg-background">
        <div className="page-shell pt-24 lg:pt-32">
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[32px] lg:aspect-[23/8]">
            <MediaImage
              src={heroImg}
              alt={`${course.name} language course`}
              priority
              className="object-cover blur-[4px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-[#1D9BF0] animate-pulse" />
                Language Course
              </span>
              <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                {course.flag} {course.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-white/85 lg:text-lg">
                {course.heroSummary}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/75">Levels</p>
                  <p className="text-sm font-bold text-white">{course.levels}</p>
                </div>
                <div className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/75">Duration</p>
                  <p className="text-sm font-bold text-white">{course.duration}</p>
                </div>
                <div className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/75">Mode</p>
                  <p className="text-sm font-bold text-white">Hybrid</p>
                </div>
                <Link
                  href="/register"
                  className="ml-auto hidden items-center rounded-full bg-[#1D9BF0] px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0C8BDD] sm:inline-flex"
                >
                  Register Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why + Who ── */}
      <section className="page-section py-16 lg:py-24">
        <div className="page-shell">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-12 lg:grid-cols-2"
          >
            <motion.div variants={fadeUp}>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
                Why This Language
              </span>
              <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-4xl">
                Why learn {course.name}?
              </h2>
              <ul className="mt-8 space-y-4">
                {course.whyLearn.map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                    <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-xs font-bold text-black/60">
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-7 text-[#334155]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
                Who It&apos;s For
              </span>
              <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-4xl">
                Who should learn?
              </h2>
              <ul className="mt-8 space-y-4">
                {course.whoShouldLearn.map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                    <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-7 text-[#334155]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Course Levels ── */}
      <section className="bg-[#F5FAFF] page-section py-16 lg:py-24">
        <div className="page-shell">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
            Curriculum
          </span>
          <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-4xl">
            Course levels
          </h2>
          <p className="mt-3 max-w-xl text-sm text-[#334155]">
            Structured progression from beginner to mastery. Each level builds on the last.
          </p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {course.levelDetails.map((level, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group rounded-[24px] border border-black/5 bg-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[2px] text-[#334155]">
                    {level.level}
                  </span>
                  <span className="rounded-full bg-[#1D9BF0] px-3 py-1 text-xs font-semibold text-white">
                    {level.title}
                  </span>
                </div>
                <p className="mt-4 text-[15px] leading-7 text-[#334155]">{level.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {level.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-[#F5FAFF] px-2.5 py-1 text-xs font-medium text-[#334155]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Teaching Method ── */}
      <section className="page-section py-16 lg:py-24">
        <div className="page-shell">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
            How We Teach
          </span>
          <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-4xl">
            Teaching method
          </h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {course.teachingMethod.map((method, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-[20px] border border-black/5 bg-white p-5"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-xs font-bold text-black/60">
                  {i + 1}
                </span>
                <span className="text-[15px] leading-7 text-[#334155]">{method}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Exams ── */}
      {course.exams.length > 0 && (
        <section className="bg-[#F5FAFF] page-section py-16 lg:py-24">
          <div className="page-shell">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
              Certifications
            </span>
            <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-4xl">
              Exams & certification
            </h2>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mt-8 grid gap-5 sm:grid-cols-2"
            >
              {course.exams.map((exam, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-[24px] border border-black/5 bg-white p-6"
                >
                  <h3 className="text-lg font-bold">{exam.name}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-[#334155]">{exam.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Careers ── */}
      <section className="page-section py-16 lg:py-24">
        <div className="page-shell">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
            Career Paths
          </span>
          <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-4xl">
            Career opportunities
          </h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {course.careers.map((career, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group rounded-[24px] border border-black/5 bg-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="flex size-10 items-center justify-center rounded-2xl bg-black/[0.04] text-sm font-bold text-black/60">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold">{career.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-[#334155]">{career.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F5FAFF] page-section py-16 lg:py-24">
        <div className="page-shell max-w-3xl">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
            FAQ
          </span>
          <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-3">
            {course.faq.map((faq, i) => (
              <details
                key={i}
                className="group rounded-[20px] border border-black/5 bg-white transition-all duration-200 [&[open]]:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-base font-semibold">
                  {faq.question}
                  <span className="ml-4 size-6 shrink-0 rounded-full bg-[#F5FAFF] flex items-center justify-center text-sm transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-[15px] leading-7 text-[#334155]">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Courses ── */}
      <section className="page-section py-16 lg:py-24">
        <div className="page-shell">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
            More Languages
          </span>
          <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-4xl">
            Explore other courses
          </h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {otherCourses.map((lang) => (
              <motion.div key={lang.slug} variants={fadeUp}>
                <Link
                  href={`/courses/${lang.slug}`}
                  className="flex items-center gap-3 rounded-[20px] border border-black/5 bg-white p-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-semibold">{lang.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#071D2E] page-section py-16">
        <div className="page-shell max-w-3xl text-center">
          <h2 className="text-3xl font-medium text-white sm:text-4xl">
            Ready to start learning {course.name}?
          </h2>
          <p className="mt-4 text-white/75">
            Book a free demo class. No payment required. No obligation.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex h-14 items-center rounded-full bg-[#1D9BF0] px-8 text-base font-semibold text-white transition-all duration-300 hover:bg-[#0C8BDD]"
            >
              Book Free Demo →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
