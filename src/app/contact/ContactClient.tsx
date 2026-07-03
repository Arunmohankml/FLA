"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/constants";

const DEFAULT_MAP = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d80.0!3d12.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAwJzAwLjAiTiA4MMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1";

const PhoneIcon = () => (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const AddressIcon = () => (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const MailIcon = () => (
  <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function ContactClient() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [mapUrl, setMapUrl] = useState(DEFAULT_MAP);

  useEffect(() => {
    fetch("/api/media")
      .then((r) => r.json())
      .then((data) => {
        if (data["map-url"]) setMapUrl(data["map-url"]);
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        setFormSubmitted(true);
      } else {
        const err = await res.json();
        setFormError(err.error || "Something went wrong. Please try again.");
      }
    } catch { setFormError("Network error. Please try again."); } finally { setFormLoading(false); }
  }

  return (
    <section className="px-6 pt-20 pb-16 lg:px-12 lg:pt-28 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Heading + description + contact cards */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="font-heading text-5xl font-medium leading-[1.28] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[72px]"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-5 max-w-lg text-lg leading-[1.6] text-[#334155]"
            >
              Whether you have a question, want to schedule a tour, or just want to
              say hello — we&apos;re here to help.
            </motion.p>

            {/* Contact cards */}
            <div className="mt-10 space-y-4">
              {/* Phone + Email row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-black/5 bg-white text-black/60 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
                    <PhoneIcon />
                  </div>
                  <h3 className="font-heading text-lg font-medium text-foreground">Phone</h3>
                  <a href={`tel:${site.phone}`} className="mt-1.5 block text-sm text-[#334155] transition-colors hover:text-foreground">
                    {site.phone}
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-black/5 bg-white text-black/60 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
                    <EmailIcon />
                  </div>
                  <h3 className="font-heading text-lg font-medium text-foreground">Email</h3>
                  <a href={`mailto:${site.email}`} className="mt-1.5 block text-sm text-[#334155] transition-colors hover:text-foreground">
                    {site.email}
                  </a>
                </motion.div>
              </div>

              {/* Address card with map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="rounded-[24px] border border-black/5 bg-white p-8 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-black/5 bg-white text-black/60 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
                      <AddressIcon />
                    </div>
                    <h3 className="font-heading text-lg font-medium text-foreground">Address</h3>
                    <p className="mt-1.5 text-sm text-[#334155]">{site.address}</p>
                    <div className="mt-4 text-sm text-[#334155]">
                      <span>Office Hours: </span>
                      <span className="font-medium text-foreground">{site.hours}</span>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[16px] sm:h-56 sm:w-44 sm:shrink-0">
                    <iframe
                      src={mapUrl}
                      title="Foreign Language Academy location map"
                      className="h-56 w-full border-0 sm:h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] lg:p-12">
              {/* Decorative arc behind form */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full border border-[#1D9BF0]/10 opacity-60" />
              <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full border border-[#1D9BF0]/8 opacity-40" />

                {formSubmitted ? (
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
                    <p className="font-heading text-xl font-medium text-foreground">Thanks!</p>
                    <p className="mt-1 text-sm text-[#334155]">We&apos;ll be in touch soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-8 text-center">
                      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-black/5 bg-white text-black/60 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
                        <MailIcon />
                      </div>
                      <h2 className="font-heading text-2xl font-medium tracking-[-0.02em] text-foreground">
                        Send Us a Message
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <input
                        name="name"
                        required
                        placeholder="Full Name*"
                        className="flex h-12 w-full rounded-xl border border-black/8 bg-[#F5FAFF] px-4 text-sm text-foreground transition-all duration-200 placeholder:text-[#334155]/80 focus:border-[#1D9BF0]/40 focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/10"
                      />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email Address*"
                        className="flex h-12 w-full rounded-xl border border-black/8 bg-[#F5FAFF] px-4 text-sm text-foreground transition-all duration-200 placeholder:text-[#334155]/80 focus:border-[#1D9BF0]/40 focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/10"
                      />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        className="flex h-12 w-full rounded-xl border border-black/8 bg-[#F5FAFF] px-4 text-sm text-foreground transition-all duration-200 placeholder:text-[#334155]/80 focus:border-[#1D9BF0]/40 focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/10"
                      />
                      <textarea
                        name="message"
                        rows={7}
                        required
                        placeholder="Message*"
                        className="flex w-full rounded-xl border border-black/8 bg-[#F5FAFF] px-4 py-3 text-sm text-foreground transition-all duration-200 placeholder:text-[#334155]/80 focus:border-[#1D9BF0]/40 focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/10"
                      />
                    </div>

                    {formError && (
                      <p className="mt-4 rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">{formError}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={formLoading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 flex h-13 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-[#0C8BDD] disabled:opacity-50"
                    >
                      {formLoading ? "Sending..." : "Send Message"}
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
