"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  { n: "01", title: "Flexible timings", desc: "Schedule sessions that fit your routine." },
  { n: "02", title: "Certified teachers", desc: "Learn from qualified native speakers." },
  { n: "03", title: "Online & Offline", desc: "Choose how you want to learn." },
  { n: "04", title: "Tailored curriculum", desc: "Customized lessons for your goals." },
  { n: "05", title: "Discount on 12 sessions", desc: "Save more when you commit." },
  { n: "06", title: "Certifications", desc: "Get globally recognized certificates." },
];

export function PrivateCoaching() {
  return (
    <section className="py-8 lg:py-12">
      <div className="page-shell">
        <div className="relative overflow-hidden rounded-[40px]">
          <img
            src="/bg.png"
            alt=""
            className="absolute inset-0 size-full object-cover opacity-25"
          />

          <div className="relative p-5 sm:p-6 lg:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 max-w-xl"
            >
              <span className="inline-flex rounded-full border border-white/40 bg-white/50 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 backdrop-blur-sm">
                One-on-One
              </span>
              <h2 className="mt-4 font-heading text-[clamp(2.2rem,3.6vw,3.8rem)] font-medium leading-[1.0] tracking-[-0.06em] text-foreground">
                Private Language
                <br />
                Coaching
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-6 text-black/50">
                One instructor. One student. One personalized roadmap built around
                your goals, pace, and schedule.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-12 items-center rounded-full bg-foreground px-7 text-sm font-semibold text-background transition-all duration-300 hover:scale-105"
              >
                Book Consultation →
              </Link>
            </motion.div>

            {/* Feature grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group flex gap-4 overflow-hidden rounded-[22px] border border-white/30 bg-white/40 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500 hover:bg-white/55"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[12px] bg-white/60 text-[11px] font-semibold text-black/50 ring-1 ring-white/40">
                    {f.n}
                  </div>
                  <div>
                    <h3 className="font-heading text-[13px] font-medium text-foreground">
                      {f.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-5 text-black/45">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
