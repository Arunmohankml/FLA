"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Mercedes-Benz", abbr: "MB" },
  { name: "Rolls Royce", abbr: "RR" },
  { name: "Bosch", abbr: "B" },
  { name: "Siemens", abbr: "Si" },
  { name: "Capgemini", abbr: "Cg" },
  { name: "AXA", abbr: "AX" },
  { name: "Dassault", abbr: "Da" },
  { name: "SAP", abbr: "SA" },
];

const services = [
  "Business Language",
  "Medical Language",
  "Crash Courses",
  "Employee Upskilling",
  "Custom Curriculum",
];

export function CorporateTraining() {
  return (
    <section className="page-section py-24">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#334155]">
            For Companies
          </p>
          <h2 className="text-3xl font-black tracking-[-1.5px] text-foreground sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        {/* Logo wall */}
        <div className="relative mt-14 overflow-hidden rounded-3xl border border-border bg-white py-10">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="flex items-center justify-center gap-10 px-12 sm:gap-14">
            {logos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col items-center gap-2"
              >
                <div className="flex size-16 items-center justify-center rounded-xl border border-border bg-muted/50 text-lg font-bold text-[#334155]/80 transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-foreground/[0.03] group-hover:text-foreground group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:size-20 sm:text-xl">
                  {logo.abbr}
                </div>
                <span className="text-xs font-medium text-[#334155]/80 transition-colors group-hover:text-foreground sm:text-xs">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {services.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-foreground/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
