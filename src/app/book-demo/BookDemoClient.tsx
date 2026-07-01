"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineSparkles } from "react-icons/hi";

const features = [
  "Consultative approach — we map your goals to our programs",
  "Tailored recommendations across all 5 FLA streams",
  "Explore global study, career, and immigration pathways",
  "No commitment required — just real, actionable guidance",
];

export function BookDemoClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demo-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? "Unable to submit your request. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to submit your request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-dvh bg-background pt-28 pb-20 lg:pt-32 lg:pb-28">
      <div className="page-shell">
        <div className="mx-auto max-w-[1240px]">
          <div className="relative overflow-hidden rounded-[40px]">
            <img src="/bg.png" alt="" className="absolute inset-0 size-full object-cover opacity-25" />

            <div className="relative p-5 sm:p-6 lg:p-8">
              <div className="mb-6 max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/50 backdrop-blur-sm">
                  <HiOutlineSparkles className="size-3.5" />
                  Book a demo
                </span>
                <h1 className="mt-5 font-heading text-[clamp(2rem,3.6vw,3.8rem)] font-medium leading-[1.0] tracking-[-0.06em] text-foreground">
                  Discover your future with FLA
                </h1>
                <p className="mt-3 max-w-md text-[15px] leading-6 text-black/50">
                  Not sure which programme fits your goals? Book a free demo
                  session and we will walk you through everything FLA has to
                  offer.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-[22px] border border-white/30 bg-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl lg:col-span-2"
            >
              <div className="relative h-56 lg:h-72">
                <img
                  src="/image55.png"
                  alt="FLA demo"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <h2 className="absolute bottom-4 left-4 max-w-[14ch] font-heading text-xl font-medium leading-[1.15] tracking-[-0.02em] text-white">
                  Talk to us — no pressure, just clarity
                </h2>
              </div>

              <ul className="space-y-3 px-5 py-5">
                {features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] leading-snug text-black/52">
                    <HiOutlineCheckCircle className="mt-0.5 size-4 shrink-0 text-[#b76042]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[22px] border border-white/30 bg-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl lg:col-span-3"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center px-7 py-16 text-center">
                  <HiOutlineCheckCircle className="size-12 text-[#b76042]" />
                  <h2 className="mt-4 font-heading text-2xl font-medium text-foreground">
                    Request submitted
                  </h2>
                  <p className="mx-auto mt-2 max-w-xs text-[13px] text-black/52">
                    We will reach out to schedule your demo session within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 p-5 lg:p-6">
                  <h2 className="font-heading text-lg font-medium text-foreground">
                    Book your free demo
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-[13px] font-semibold text-foreground">
                      Full name *
                      <input required name="name" placeholder="Enter your full name" className="mt-2 h-11 w-full rounded-xl border border-black/8 bg-[#fbf7f1] px-3.5 text-[13px] text-foreground placeholder:text-black/30 outline-none transition focus:ring-4 focus:ring-[#e8734a]/10" />
                    </label>
                    <label className="block text-[13px] font-semibold text-foreground">
                      Email address *
                      <input required name="email" type="email" placeholder="Enter your email" className="mt-2 h-11 w-full rounded-xl border border-black/8 bg-[#fbf7f1] px-3.5 text-[13px] text-foreground placeholder:text-black/30 outline-none transition focus:ring-4 focus:ring-[#e8734a]/10" />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-[13px] font-semibold text-foreground">
                      Phone / WhatsApp *
                      <input required name="phone" type="tel" placeholder="Enter your number" className="mt-2 h-11 w-full rounded-xl border border-black/8 bg-[#fbf7f1] px-3.5 text-[13px] text-foreground placeholder:text-black/30 outline-none transition focus:ring-4 focus:ring-[#e8734a]/10" />
                    </label>
                    <label className="block text-[13px] font-semibold text-foreground">
                      Preferred date
                      <input required name="date" type="date" className="mt-2 h-11 w-full rounded-xl border border-black/8 bg-[#fbf7f1] px-3.5 text-[13px] text-foreground outline-none transition focus:ring-4 focus:ring-[#e8734a]/10" />
                    </label>
                  </div>
                  <label className="block text-[13px] font-semibold text-foreground">
                    Message / questions
                    <textarea name="message" rows={3} placeholder="What would you like to explore?" className="mt-2 w-full rounded-xl border border-black/8 bg-[#fbf7f1] px-3.5 py-3 text-[13px] text-foreground placeholder:text-black/30 outline-none transition focus:ring-4 focus:ring-[#e8734a]/10" />
                  </label>
                  {error && (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-[13px] font-medium text-red-700">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground text-[13px] font-semibold text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Sending…" : "Request a demo"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
