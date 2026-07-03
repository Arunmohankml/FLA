"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Choose Language",
    desc: "Browse 9 languages and find your fit",
    image: "/image32-opt.webp",
  },
  {
    num: "02",
    title: "Attend Free Demo",
    desc: "Experience our teaching style first-hand",
    image: "/image33-opt.webp",
  },
  {
    num: "03",
    title: "Enroll",
    desc: "Pick a batch and start your journey",
    image: "/image34-opt.webp",
  },
];

export function ProcessPath() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.6"],
  });

  const desktopLineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="bg-[#F5FAFF] page-section py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        {/* ── Header ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
            How It Works
          </span>
          <h2 className="font-heading text-4xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-5xl">
            Your Language Journey
          </h2>
        </motion.div>

        {/* ── Steps ────────────────────────────────────── */}
        <div className="relative grid gap-4 lg:grid-cols-3 lg:gap-10">
          {/* Connecting line behind cards (desktop — horizontal, animated) */}
          <div className="pointer-events-none absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] hidden lg:block">
            <div className="h-px w-full bg-black/5">
              <motion.div
                style={{ scaleX: desktopLineScale, transformOrigin: "left center" }}
                className="h-px w-full bg-[#1D9BF0]/30 will-change-transform"
              />
            </div>
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative text-center"
            >
              {/* Step number badge — desktop only */}
              <motion.div
                initial={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                whileInView={{
                  boxShadow: [
                    "0 2px 8px rgba(0,0,0,0.04)",
                    "0 0 20px rgba(29,155,240,0.25), 0 0 40px rgba(29,155,240,0.1)",
                    "0 2px 8px rgba(0,0,0,0.04)",
                  ],
                }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
                className="relative z-10 mx-auto mb-6 hidden size-16 items-center justify-center rounded-2xl border border-black/8 bg-white text-sm font-bold transition-all duration-300 group-hover:border-[#1D9BF0]/30 group-hover:bg-[#1D9BF0] group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(29,155,240,0.15)] lg:flex"
              >
                <span className="transition-colors group-hover:text-white">{step.num}</span>
              </motion.div>

              {/* Image card */}
              <div className="relative mx-auto mb-5 aspect-[4/3] w-full max-w-[320px] overflow-hidden rounded-[24px]">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm text-[#334155]">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/register"
            className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-[#0C8BDD]"
          >
            Book Free Demo →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
