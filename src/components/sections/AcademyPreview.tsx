"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/Counter";
import { MediaImage } from "@/components/MediaImage";

export function AcademyPreview() {
  const academyImg = "/image53-opt.webp";
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="pt-16 pb-4 lg:pt-24 lg:pb-6">
      <div className="page-shell">
        {/* ── Asymmetric layout: image left, text right ──────── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Large image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              style={{ y: imgY }}
            className="relative aspect-[4/3] overflow-hidden rounded-[32px]"
            >
              <MediaImage
                src={academyImg}
                alt="In-person foreign language classroom training"
                className="object-cover"
              />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 rounded-[20px] border border-black/5 bg-white px-6 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.1)] lg:-right-8"
            >
              <p className="text-3xl font-black tracking-tight">
                <Counter end={1900} suffix="+" />
              </p>
              <p className="text-sm font-medium text-[#334155]">Students Enrolled</p>
            </motion.div>
          </motion.div>

          {/* Right — Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
              About Us
            </span>
            <h2 className="font-heading text-4xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-5xl">
              Excellence in language
              <br />
              learning since 2007
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#334155]">
              One of the best Language Academies - SUPER STAR among the
              world&apos;s best language academies with 18+ years of excellence.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#334155]">
              What started with two languages and a handful of students has grown
              into one of the city&apos;s most trusted language institutes, offering
              9 languages taught by certified native trainers.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-[#0C8BDD]"
            >
              Learn More About Us →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

