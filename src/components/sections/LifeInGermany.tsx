"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    country: "Germany",
    image: "/germany-street-opt.webp",
    value: "9M+",
    body: "Europe's largest economy offering world-class universities, skilled careers, and excellent long-term growth for international students.",
  },
  {
    country: "France",
    image: "/france-street-opt.webp",
    value: "175+",
    body: "Countries and institutions worldwide recognise DELF & DALF certifications for study, work, and immigration purposes.",
  },
  {
    country: "Netherlands",
    image: "/netherland-street-opt.webp",
    value: "95%",
    body: "One of Europe's highest English proficiency rates, making it ideal for international education and multicultural careers.",
  },
  {
    country: "Poland",
    image: "/poland-street-opt.webp",
    value: "Schengen",
    body: "An affordable European study destination providing access to quality education, work opportunities, and travel across Europe.",
  },
];

export function LifeInGermany() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        x: -200,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      });

      gsap.from(imageRef.current, {
        x: 200,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
        },
      });

      const stackOffset = 7;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        gsap.set(card, {
          yPercent: i === 0 ? 0 : 110,
          y: i === 0 ? 0 : i * stackOffset,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${(cards.length - 1) * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 0.35,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((_, i) => {
        if (i === 0) return;

        tl.to(
          cardRefs.current[i],
          {
            yPercent: 0,
            y: i * stackOffset,
            duration: 1,
            ease: "power2.out",
          },
          i - 1
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-background">
      <div className="page-shell pt-3 lg:pt-4">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,0.75fr)]">
          <div ref={textRef}>
            <span className="mb-4 inline-flex w-fit rounded-full bg-[#6f4a36]/8 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f4a36]">
              Life in Europe
            </span>

            <h2 className="max-w-2xl font-heading text-[clamp(1.8rem,3.2vw,3rem)] font-medium leading-[1.02] tracking-[-0.04em] text-foreground">
              Europe opens doors to healthcare success
            </h2>

            <p className="mt-3 max-w-md text-[15px] leading-7 text-black/70">
              Master the language, earn globally recognised certifications, and
              prepare for international study, work, and career opportunities
              with expert guidance, practical learning, and personalized support
              at every stage of your journey.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/courses"
                className="inline-flex h-10 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition duration-300 hover:-translate-y-0.5 hover:bg-[#0C8BDD]"
              >
                Explore Courses
                <span className="ml-1.5" aria-hidden="true">
                  &rarr;
                </span>
              </Link>

              <Link
                href="/book-demo"
                className="text-sm font-semibold text-foreground/80 underline decoration-black/15 underline-offset-4 transition-colors hover:text-foreground"
              >
                Book Free Demo
              </Link>
            </div>
          </div>

          <div ref={imageRef} className="relative hidden h-[300px] overflow-hidden rounded-[28px] border border-black/5 bg-[#F5FAFF] shadow-[0_24px_70px_rgba(0,0,0,0.08)] lg:block">
            <img
              src="/euimage.png"
              alt="European study abroad and language learning"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll-pinned stacking area */}
      <div ref={wrapperRef} className="relative mt-10">
        <div
          ref={pinRef}
          className="relative flex h-screen items-center justify-center overflow-hidden"
        >
          <div className="page-shell relative flex h-[64vh] w-full items-center justify-center">
            {cards.map((card, index) => (
              <div
                key={card.country}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute inset-x-0 mx-auto h-full w-full max-w-[900px] overflow-hidden rounded-[28px] border border-black/5 shadow-[0_28px_80px_rgba(0,0,0,0.28)]"
                style={{ zIndex: index + 1 }}
              >
                <img
                  src={card.image}
                  alt={card.country}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

                <div className="absolute inset-x-0 top-0 p-6">
                  <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {card.country}
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-[14%] flex justify-center px-6">
                  <h3 className="text-center font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-bold uppercase leading-none tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
                    {card.country}
                  </h3>
                </div>

                <div className="absolute bottom-0 left-0 z-10 p-10">
                  <p className="font-heading text-[clamp(2rem,3.5vw,3.2rem)] font-medium leading-none tracking-[-0.03em] text-white">
                    {card.value}
                  </p>

                  <p className="mt-3 max-w-[46ch] text-[15px] leading-7 text-white/90">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}