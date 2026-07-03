"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const languages = [
  "French", "German", "Spanish", "Japanese", "Chinese",
  "English", "Russian", "Korean", "Italian", "Soft Skills",
];

const levels = ["A1", "A2", "B1", "B2", "C1", "C2", "N5", "N4", "N3", "N2", "N1", "IELTS"];

const timeSlots = [
  "6-8 AM", "8-10 AM", "10-12 PM", "1-3 PM", "2-4 PM",
  "3-5 PM", "4-6 PM", "5-7 PM", "6-8 PM", "7-9 PM", "8-10 PM",
];

const steps = [
  { num: "01", title: "Fill Your Details", desc: "Tell us about yourself and your learning goals" },
  { num: "02", title: "Choose Your Course", desc: "Pick a language, level, and convenient time slot" },
  { num: "03", title: "Start Learning", desc: "We'll confirm your enrollment and you're ready to go" },
];

export function RegisterClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      /* fallback */
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "flex h-12 w-full rounded-xl border border-black/8 bg-[#F5FAFF] px-4 text-sm text-foreground transition-all duration-200 placeholder:text-[#334155]/80 focus:border-[#1D9BF0]/40 focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/10";
  const selectClass = "flex h-12 w-full appearance-none rounded-xl border border-black/8 bg-[#F5FAFF] px-4 text-sm text-foreground transition-all duration-200 focus:border-[#1D9BF0]/40 focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/10";

  return (
    <section className="px-6 pt-20 pb-16 lg:px-12 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Heading + info + steps */}
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
              Registration
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="font-heading text-5xl font-medium leading-[1.28] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[72px]"
            >
              Begin Your
              <br />
              Journey
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-5 max-w-lg text-lg leading-[1.6] text-[#334155]"
            >
              Fill in your details and Foreign Language Academy will help you
              enroll in the right course. It only takes a few minutes.
            </motion.p>

            {/* Steps */}
            <div className="mt-10 space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/[0.04] font-heading text-xs font-semibold text-black/60">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-medium text-foreground">{step.title}</h3>
                    <p className="mt-0.5 text-sm text-[#334155]">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Registration form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] lg:p-10">
              {/* Decorative arcs */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full border border-[#1D9BF0]/10 opacity-60" />
              <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full border border-[#1D9BF0]/8 opacity-40" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-16 text-center"
                >
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-black/[0.04] text-black/60">
                    <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <p className="font-heading text-xl font-medium text-foreground">Registration submitted!</p>
                  <p className="mt-1 text-sm text-[#334155]">
                    We&apos;ll contact you shortly to confirm your enrollment.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6 text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-black/[0.04] text-black/60">
                      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" y1="8" x2="19" y2="14" />
                        <line x1="22" y1="11" x2="16" y2="11" />
                      </svg>
                    </div>
                    <h2 className="font-heading text-2xl font-medium tracking-[-0.02em] text-foreground">
                      Student Registration
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Name *</label>
                        <input name="name" required placeholder="Full name" className={inputClass} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Email *</label>
                        <input name="email" type="email" required placeholder="your@email.com" className={inputClass} />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Phone *</label>
                        <input name="phone" type="tel" required placeholder="+91 98765 43210" className={inputClass} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Language *</label>
                        <select name="language" required className={selectClass}>
                          <option value="">Select language</option>
                          {languages.map((l) => (
                            <option key={l} value={l}>{l}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Level *</label>
                        <select name="level" required className={selectClass}>
                          <option value="">Select level</option>
                          {levels.map((l) => (
                            <option key={l} value={l}>{l}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Time Slot *</label>
                        <select name="timeSlot" required className={selectClass}>
                          <option value="">Select time slot</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Address *</label>
                      <textarea name="address" rows={3} required placeholder="Your full address" className={inputClass + " py-3"} />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Purpose of Learning *</label>
                      <textarea name="purpose" rows={3} required placeholder="Why do you want to learn this language?" className={inputClass + " py-3"} />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 flex h-13 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-[#0C8BDD] disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
