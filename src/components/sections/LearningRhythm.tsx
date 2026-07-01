"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SunriseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const rhythms = [
  {
    icon: <SunriseIcon />,
    label: "Morning",
    time: "6 AM â€“ 12 PM",
    desc: "Perfect for early learners",
    image: "/image29.png",
  },
  {
    icon: <SunIcon />,
    label: "Afternoon",
    time: "12 PM â€“ 5 PM",
    desc: "Convenient midday learning",
    image: "/image30.png",
  },
  {
    icon: <MoonIcon />,
    label: "Evening",
    time: "5 PM â€“ 10 PM",
    desc: "After-work learning",
    image: "/image31.png",
  },
];

export function LearningRhythm() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-8 lg:py-12">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#faf5f0] px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
            Schedule
          </span>
          <h2 className="font-heading text-4xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-5xl">
            Choose Your Learning Rhythm
          </h2>
          <p className="mt-3 max-w-lg text-base text-muted-foreground">
            Find a time that fits your lifestyle and stick to it with ease.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] lg:col-span-3"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/10]">
              <img
                src={rhythms[active].image}
                alt={rhythms[active].label}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-heading text-3xl font-medium text-white">{rhythms[active].label}</h3>
                <p className="mt-1 text-sm font-semibold text-foreground">{rhythms[active].time}</p>
                <p className="mt-1 text-sm text-white/70">{rhythms[active].desc}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {rhythms.map((r, i) => (
              <motion.button
                key={r.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-4 rounded-[20px] p-4 text-left transition-all duration-300 ${
                  active === i
                    ? "border border-[#e8734a]/10 bg-[#faf5f0] shadow-[0_2px_12px_rgba(232,115,74,0.04)]"
                    : "border border-black/5 bg-white hover:border-black/10"
                }`}
              >
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-[14px] transition-colors ${
                  active === i ? "bg-[#e8734a]/5 text-[#e8734a]/40" : "bg-[#faf5f0] text-muted-foreground"
                }`}>
                  {r.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-heading text-base font-medium text-foreground">{r.label}</h4>
                  <p className="text-sm text-muted-foreground">{r.time}</p>
                </div>
                <span className={`text-xs font-semibold ${active === i ? "text-foreground" : "text-muted-foreground"}`}>
                  {r.desc}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
