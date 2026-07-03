"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { languages } from "@/lib/constants";
import { HiOutlineArrowRight } from "react-icons/hi";

const featured = [0, 2, 5];
const rest = languages.filter((_, i) => !featured.includes(i));

export function CoursesPreview() {
  return (
    <section className="page-section pb-16 pt-8">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#334155]">
              Languages
            </p>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Our Languages
            </h2>
          </div>
          <Link
            href="/courses"
            className="hidden items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 transition-colors hover:text-[#334155] sm:inline-flex"
          >
            View All
            <HiOutlineArrowRight className="size-3.5" />
          </Link>
        </motion.div>

        <div className="mb-3 grid grid-cols-3 gap-3 lg:gap-4">
          {featured.map((idx, i) => {
            const lang = languages[idx];
            return (
              <Link key={lang.name} href={`/courses/${lang.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:p-5"
                >
                  <span className="block text-4xl leading-none sm:text-5xl">{lang.flag}</span>
                  <p className="mt-3 text-sm font-bold text-foreground sm:text-base">
                    {lang.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#334155] sm:text-xs">
                    {lang.levels} · {lang.duration}
                  </p>
                  <div className="pointer-events-none absolute -right-4 -top-4 text-[80px] leading-none opacity-[0.04] transition-opacity group-hover:opacity-[0.08] sm:text-[100px]">
                    {lang.flag}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {rest.map((lang, i) => (
            <Link key={lang.name} href={`/courses/${lang.slug}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                whileHover={{ y: -2, scale: 1.04 }}
                className="flex items-center gap-2 rounded-full border border-black/8 bg-white px-3.5 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
              >
                <span className="text-lg leading-none">{lang.flag}</span>
                <span className="text-xs font-semibold text-foreground">{lang.name}</span>
                <span className="text-xs text-[#334155]">{lang.duration}</span>
              </motion.div>
            </Link>
          ))}
        </div>

        <Link
          href="/courses"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground sm:hidden"
        >
          View All
          <HiOutlineArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
