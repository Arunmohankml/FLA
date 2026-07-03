"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const paths = [
  {
    icon: "🎓",
    title: "Student",
    items: ["Morning batches", "Weekend batches", "Affordable pricing", "Exam preparation"],
  },
  {
    icon: "💼",
    title: "Working Professional",
    items: ["Evening classes", "Fast-track courses", "Corporate training", "Business language"],
  },
  {
    icon: "🌍",
    title: "Study Abroad",
    items: ["Exam preparation", "Visa guidance", "Interview preparation", "University counselling"],
  },
  {
    icon: "🏢",
    title: "Companies",
    items: ["Employee training", "Corporate workshops", "Custom curriculum", "On-site sessions"],
  },
];

export function LearningPaths() {
  const [active, setActive] = useState(0);

  return (
    <section className="page-section py-14">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#334155]">
            Who You Are
          </p>
          <h2 className="text-3xl font-black tracking-[-1.5px] text-foreground sm:text-4xl">
            Find Your Perfect Learning Style
          </h2>
          <p className="mt-3 mx-auto max-w-lg text-[#334155]">
            Different goals need different paths. Pick what fits you.
          </p>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex gap-2 rounded-2xl border border-black/8 bg-white p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {paths.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  active === i
                    ? "bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(29,155,240,0.18)]"
                    : "text-[#334155] hover:text-foreground"
                }`}
              >
                <span>{p.icon}</span>
                <span className="hidden sm:inline">{p.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-black/8 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-xl bg-black/[0.05] text-2xl">
                  {paths[active].icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{paths[active].title}</h3>
                  <p className="text-sm text-[#334155]">Tailored for your needs</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {paths[active].items.map((item, j) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: j * 0.05 }}
                    className="flex items-center gap-2.5 rounded-xl bg-[#F5FAFF] px-4 py-3"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-xs font-bold text-black/60">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
