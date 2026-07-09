"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineArrowRight,
  HiOutlineBriefcase,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineSparkles,
  HiOutlineX,
} from "react-icons/hi";
import { CareerListing } from "@/lib/careers";

export function CareersView({ listings }: { listings: CareerListing[] }) {
  const [selected, setSelected] = useState<CareerListing | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  async function handleApply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setError("");
    setLoading(true);
    try {
      const form = new FormData(event.currentTarget);
      form.append("careerId", selected.id);
      form.append("jobTitle", selected.title);
      form.append("jobCode", selected.code);
      const res = await fetch("/api/career-applications", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setSelected(null);
    setSubmitted(false);
    setError("");
  }

  return (
    <section className="blue-section min-h-dvh pt-28 pb-20 lg:pt-32 lg:pb-28">
      <div className="page-shell relative z-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="blue-dark-panel blue-grid-bg relative overflow-hidden rounded-[40px] shadow-[0_28px_90px_rgba(29,155,240,0.22)]">
            <Image
              src="/bg.webp"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1100px"
              className="absolute inset-0 size-full object-cover opacity-[0.12]"
            />
            <div className="relative px-6 py-10 text-center sm:px-10 sm:py-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/78 backdrop-blur-sm">
                <HiOutlineSparkles className="size-3.5" />
                Careers at Foreign Language Academy
              </span>
              <h1 className="mx-auto mt-5 max-w-[12ch] font-heading text-[clamp(2.2rem,4.5vw,4.2rem)] font-medium leading-[0.95] tracking-[-0.06em] text-white">
                We&apos;re Hiring
              </h1>
              <p className="mx-auto mt-3 max-w-lg text-[15px] leading-6 text-white/75">
                Join Foreign Language Academy and build a rewarding career in
                education and student support. Explore our current openings and
                become part of our growing team.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {listings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="blue-card blue-card-hover group rounded-[22px] bg-white/90 backdrop-blur-xl"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-heading text-[17px] font-medium leading-snug text-foreground">
                      {job.title}
                    </h2>
                    <span
                      className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        borderColor: (job.accent || "#0c2847") + "35",
                        color: job.accent || "#0c2847",
                        backgroundColor: (job.accent || "#0c2847") + "10",
                      }}
                    >
                      ID:{job.code}
                    </span>
                  </div>

                  <p className="mt-3 text-[15px] leading-7 text-black/65">
                    {job.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-black/60">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-black/5 bg-white/60 px-2.5 py-1">
                      <HiOutlineLocationMarker className="size-3.5 text-[#0c2847]" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-black/5 bg-white/60 px-2.5 py-1">
                      <HiOutlineBriefcase className="size-3.5 text-[#0c2847]" />
                      {job.workMode}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-black/5 bg-white/60 px-2.5 py-1">
                      <HiOutlineClock className="size-3.5 text-[#0c2847]" />
                      {job.employmentType}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => setSelected(job)}
                      className="blue-cta inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold transition"
                    >
                      Apply now
                      <HiOutlineArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {listings.length === 0 && (
            <div className="py-16 text-center">
              <HiOutlineBriefcase className="mx-auto size-10 text-black/20" />
              <p className="mt-3 text-[15px] text-black/60">No positions available right now.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-white shadow-[0_32px_100px_rgba(0,0,0,0.18)]"
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/80 text-black/55 shadow-[0_2px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm transition hover:bg-white hover:text-foreground"
                aria-label="Close"
              >
                <HiOutlineX className="size-4" />
              </button>

              {submitted ? (
                <div className="flex flex-col items-center px-6 py-16 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-emerald-50">
                    <HiOutlineMail className="size-7 text-emerald-500" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-medium text-foreground">
                    Application submitted
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-[15px] leading-7 text-black/65">
                    Thank you for applying to <strong>{selected.title}</strong>.
                    The team will review and get back to you.
                  </p>
                  <button
                    onClick={closeModal}
                    className="blue-cta mt-6 inline-flex h-10 cursor-pointer items-center justify-center rounded-full px-6 text-sm font-semibold transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply}>
                  <div className="bg-gradient-to-b from-[#F5FAFF] to-white px-6 pb-10 pt-8">
                    <h2 className="font-heading text-[22px] font-medium tracking-[-0.03em] text-foreground">
                      Apply for this position
                    </h2>
                    <p className="mt-1.5 text-sm text-black/65">
                      {selected.title} &middot; {selected.code} &middot; {selected.location}
                    </p>
                  </div>

                  <div className="space-y-5 px-6 pb-8">
                    {error && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground">
                          Full name <span className="text-[#0c2847]">*</span>
                        </label>
                        <input
                          name="name"
                          required
                          placeholder="e.g. John Doe"
                          className="mt-1.5 h-11 w-full rounded-xl border border-black/8 bg-[#F5FAFF] px-3.5 text-[15px] text-foreground placeholder:text-black/25 outline-none transition focus:border-[#0c2847]/30 focus:ring-3 focus:ring-[#0c2847]/8"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground">
                          Email <span className="text-[#0c2847]">*</span>
                        </label>
                        <input
                          name="email"
                          required
                          type="email"
                          placeholder="e.g. john@example.com"
                          className="mt-1.5 h-11 w-full rounded-xl border border-black/8 bg-[#F5FAFF] px-3.5 text-[15px] text-foreground placeholder:text-black/25 outline-none transition focus:border-[#0c2847]/30 focus:ring-3 focus:ring-[#0c2847]/8"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground">
                          Phone / WhatsApp <span className="text-[#0c2847]">*</span>
                        </label>
                        <input
                          name="phone"
                          required
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          className="mt-1.5 h-11 w-full rounded-xl border border-black/8 bg-[#F5FAFF] px-3.5 text-[15px] text-foreground placeholder:text-black/25 outline-none transition focus:border-[#0c2847]/30 focus:ring-3 focus:ring-[#0c2847]/8"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground">
                          Experience
                        </label>
                        <input
                          name="experience"
                          placeholder="e.g. 2 years"
                          className="mt-1.5 h-11 w-full rounded-xl border border-black/8 bg-[#F5FAFF] px-3.5 text-[15px] text-foreground placeholder:text-black/25 outline-none transition focus:border-[#0c2847]/30 focus:ring-3 focus:ring-[#0c2847]/8"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground">
                        Why are you a good fit?
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Tell us about your experience and why you'd be a great addition…"
                        className="mt-1.5 w-full resize-none rounded-xl border border-black/8 bg-[#F5FAFF] px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-black/25 outline-none transition focus:border-[#0c2847]/30 focus:ring-3 focus:ring-[#0c2847]/8"
                      />
                    </div>

                    <button
                      disabled={loading}
                    className="blue-cta mt-2 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? "Submitting…" : "Submit application"}
                      {!loading && <HiOutlineArrowRight className="size-4" />}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
