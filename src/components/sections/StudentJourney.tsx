"use client";

import { motion } from "framer-motion";

const EnrollIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
);
const LearnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
);
const PracticeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
);
const CertifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
);
const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);

const steps = [
  { icon: <EnrollIcon />, title: "Enroll", desc: "Choose your language and batch" },
  { icon: <LearnIcon />, title: "Learn", desc: "Structured curriculum with native trainers" },
  { icon: <PracticeIcon />, title: "Practice", desc: "Real conversations from day one" },
  { icon: <CertifyIcon />, title: "Certify", desc: "Earn internationally recognised credentials" },
  { icon: <RocketIcon />, title: "Get Placed", desc: "Career guidance and opportunities" },
];

export function StudentJourney() {
  return (
    <>
      <div className="text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
          Student Journey
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why Students Choose Us
        </h2>
      </div>

      <div className="relative mt-10 mx-auto max-w-lg">
        <div className="absolute left-[31px] top-0 h-full w-px bg-black/10" />

        <div className="space-y-1">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex items-center gap-6"
            >
              <div className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-white text-black/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:shadow-[0_4px_16px_rgba(29,155,240,0.12)] group-hover:scale-105">
                {step.icon}
              </div>

              <div className="py-4">
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-0.5 text-sm text-[#334155]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
