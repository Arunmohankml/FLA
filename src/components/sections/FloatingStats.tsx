"use client";

import { motion } from "framer-motion";
import { useSiteMedia } from "@/components/SiteMediaProvider";
import { MediaImage } from "@/components/MediaImage";
import { mediaFallbacks } from "@/lib/constants";

const testimonials = [
  {
    quote: "The best decision I made was joining Foreign Language Academy. The teachers are incredibly patient and knowledgeable.",
    name: "Priya S.",
    role: "German A2 Graduate",
    flag: "🇩🇪",
  },
  {
    quote: "I went from zero French to conversational in just 3 months. The immersion method works wonders.",
    name: "Arun K.",
    role: "French B1 Graduate",
    flag: "🇫🇷",
  },
  {
    quote: "Flexible timings and expert trainers made it possible for me to learn while working full-time.",
    name: "Divya R.",
    role: "Japanese N4 Graduate",
    flag: "🇯🇵",
  },
];

export function FloatingStats() {
  const banner11 = useSiteMedia("group-discussion", mediaFallbacks["group-discussion"]);

  return (
    <section className="py-16 lg:py-24">
      <div className="page-shell">
        {/* ── Asymmetric layout: image + testimonials ──────── */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-black/10"
          >
            <MediaImage
              src={banner11}
              alt="Students practicing a foreign language in a small group"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Floating badge on image */}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/15 p-3 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["🇩🇪", "🇫🇷", "🇯🇵"].map((f) => (
                    <span
                      key={f}
                      className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-white text-base sm:size-10 sm:text-lg"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-semibold text-white sm:text-sm">
                  Join 1900+ happy students
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Testimonials */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
                Testimonials
              </span>
              <h2 className="font-heading text-4xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-5xl">
                What our students say
              </h2>
            </motion.div>

            <div className="space-y-4">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="group rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F5FAFF] text-xl">
                      {t.flag}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[15px] leading-7 text-[#334155]">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="mt-3 pt-3 border-t border-black/5">
                        <p className="text-sm font-bold text-foreground">{t.name}</p>
                        <p className="text-xs text-[#334155]">{t.role}</p>
                      </div>
                    </div>
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
