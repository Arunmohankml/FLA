"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

const leftReasons = [
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Travelling without Fear",
    desc: "Explore the world with confidence",
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 6 3 12 0v-5" />
      </svg>
    ),
    title: "Higher Studies Abroad",
    desc: "Access international educational opportunities",
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Career Opportunities",
    desc: "Unlock global professional prospects",
  },
];

const rightReasons = [
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: "Enhanced Problem-Solving",
    desc: "Develop cognitive flexibility",
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Business Friendships",
    desc: "Build international networks",
  },
  {
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Personal Growth",
    desc: "Expand social connections and cultural understanding",
  },
];

function BenefitCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-[22px] border border-white/30 bg-white/40 p-5 text-foreground shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      <div className="mb-4 flex size-11 items-center justify-center rounded-[14px] bg-white/60 text-black/60 ring-1 ring-white/40">
        {icon}
      </div>
      <h3 className="font-heading text-[15px] font-medium tracking-[-0.01em] text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-6 text-black/65">{desc}</p>
    </div>
  );
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function ReasonsToLearn() {
  const { ref: gridRef, visible } = useInView(0.15);

  return (
    <section className="py-6 lg:py-10">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <span className="inline-flex rounded-full border border-white/40 bg-white/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/70 backdrop-blur-sm">
            Benefits
          </span>
          <h2 className="mt-4 font-heading text-[clamp(2.5rem,4.4vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.05em] text-foreground">
            Reasons to Learn a New Language
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-6 text-[#334155]">
            Learning a new language opens doors you never knew existed.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid gap-4 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-stretch">
          <div className="grid gap-4">
            {leftReasons.map((reason, i) => (
              <div
                key={reason.title}
                className={`transition-all duration-500 ease-out ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: `${100 + i * 100}ms` }}
              >
                <BenefitCard {...reason} />
              </div>
            ))}
          </div>

          <div
            className={`relative min-h-[520px] overflow-hidden rounded-[28px] border border-white/30 bg-white/30 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-600 ease-out ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "50ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80" />
            <Image
              src="/busmeet.png"
              alt="Students meeting in a language learning setting"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="rounded-[18px] border border-white/30 bg-white/60 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/65">
                  Real conversations
                </p>
                <p className="mt-1 font-heading text-lg font-medium tracking-[-0.02em] text-foreground">
                  Learn together, speak with confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {rightReasons.map((reason, i) => (
              <div
                key={reason.title}
                className={`transition-all duration-500 ease-out ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: `${100 + i * 100}ms` }}
              >
                <BenefitCard {...reason} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
