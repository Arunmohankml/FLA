"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Choose Language",
    desc: "Browse 9 languages and find your fit",
    image: "/image32-opt.webp",
  },
  {
    num: "02",
    title: "Attend Free Demo",
    desc: "Experience our teaching style first-hand",
    image: "/image33-opt.webp",
  },
  {
    num: "03",
    title: "Enroll",
    desc: "Pick a batch and start your journey",
    image: "/image34-opt.webp",
  },
];

export function ProcessPath() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const line = lineRef.current;
      if (!line) return;

      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(line, { scaleX: 1, duration: 1.5, ease: "power2.inOut" });

      circleRefs.current.forEach((circle, i) => {
        if (!circle) return;
        tl.from(circle, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "back.out(2)",
        }, 0.3 + (i / steps.length) * 1.2);
      });

      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        const direction = i % 2 === 0 ? 1 : -1;
        tl.from(img, {
          scale: 0.85,
          opacity: 0,
          x: direction * 60,
          duration: 0.6,
          ease: "power3.out",
        }, 0.5 + (i / steps.length) * 1.2);
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        tl.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        }, 0.5 + (i / steps.length) * 1.2);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="wave-overlay blue-dot-bg relative overflow-hidden bg-[#EEF7FF] py-10 sm:py-12 lg:py-14">
      <div
        className="pointer-events-none absolute -bottom-80 left-1/2 h-[520px] w-[115vw] -translate-x-1/2 rounded-[50%] border border-[#B9D8FF]/55 bg-[#EAF4FF]/70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 lg:block"
        style={{
          backgroundImage: `
            radial-gradient(circle, #93C5FD 1.5px, transparent 1.5px),
            radial-gradient(circle, #BFDBFE 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 16px 16px",
          backgroundPosition: "0 0, 8px 8px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-10 top-20 hidden size-40 opacity-55 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, #B8D8FF 1.8px, transparent 1.8px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl text-center"
        >
          <span className="inline-flex rounded-full border border-[#B8D8FF] bg-[#F8FBFF] px-6 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#1D74E8] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            How It Works
          </span>
          <h2 className="mt-5 font-heading text-[clamp(2.35rem,4vw,3.85rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-[#111827] sm:whitespace-nowrap">
            Your Language Journey
          </h2>
        </motion.div>

        <div ref={sectionRef} className="relative mt-10 lg:mt-12">
          {/* Animated line */}
          <div className="pointer-events-none absolute left-[15%] right-[15%] top-0 z-0 hidden lg:block">
            <div
              ref={lineRef}
              className="h-px bg-[#83B8F6]"
              style={{ width: "100%" }}
            />
          </div>

          {/* Static dots on the line */}
          <div className="pointer-events-none absolute left-[15%] right-[15%] top-0 z-0 hidden h-px lg:block">
            <span className="absolute left-1/4 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-[#2582F2] bg-[#F6FAFF]" />
            <span className="absolute left-3/4 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-[#2582F2] bg-[#F6FAFF]" />
          </div>

          <div className="mx-auto grid max-w-[1160px] gap-5 lg:grid-cols-3 lg:gap-7">
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="group relative z-10 pt-20 text-center lg:pt-20"
              >
                {/* Number circle - centered on the line */}
                <div
                  ref={(el) => { circleRefs.current[i] = el; }}
                  className="absolute left-1/2 top-0 z-20 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#DCEBFF] bg-white text-2xl font-bold tracking-[-0.04em] text-[#2179E8] shadow-[0_12px_26px_rgba(37,130,242,0.16)] lg:size-20 lg:text-[1.7rem]"
                >
                  {step.num}
                </div>

                <div className="blue-card rounded-[26px] p-4 transition-transform duration-300 group-hover:-translate-y-1 sm:p-5 lg:rounded-[30px]">
                  <div
                    ref={(el) => { imgRefs.current[i] = el; }}
                    className="relative aspect-[1.43] overflow-hidden rounded-[20px] bg-[#EAF4FF]"
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 31vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-semibold leading-tight tracking-[-0.03em] text-[#111827] lg:text-[1.45rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#536174] lg:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center lg:mt-10"
        >
          <Link
            href="/book-demo"
            className="inline-flex h-[52px] min-w-[230px] items-center justify-center gap-5 rounded-full bg-[#0c2847] px-8 text-base font-bold text-white shadow-[0_16px_34px_rgba(33,121,238,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0c2847] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c2847]"
          >
            Book Free Demo
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
