"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6" />
        <path d="M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 3 6 12 0v-5" />
        <path d="M16 16l2 2 4-4" />
      </svg>
    ),
    title: "Experienced Trainers",
    desc: "Learn with certified language mentors and exam-focused guidance.",
    side: "left",
    position: "left-[7vw] top-[24vh]",
  },
  {
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M3 20c3-2 6-3 9-3s6 1 9 3" />
      </svg>
    ),
    title: "Flexible Learning",
    desc: "Online, offline, or hybrid batches designed around your schedule.",
    side: "right",
    position: "right-[7vw] top-[18vh]",
  },
  {
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M12 14l2 2 4-4" />
      </svg>
    ),
    title: "Global Certification",
    desc: "Prepare for recognised language certifications and global goals.",
    side: "left",
    position: "left-[10vw] bottom-[14vh]",
  },
  {
    icon: (
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11l2 2 4-4" />
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M7 8h10" />
        <path d="M7 12h6" />
      </svg>
    ),
    title: "Practical Learning",
    desc: "Real-world conversation practice from day one.",
    side: "right",
    position: "right-[10vw] bottom-[7vh]",
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const imageMaskRef = useRef<HTMLDivElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        // ---------------------------------------------------------------
        // DESKTOP — unchanged from the original implementation
        // ---------------------------------------------------------------
        if (isDesktop) {
          const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

          gsap.set(imageMaskRef.current, {
            clipPath: "circle(72px at 50% 78%)",
            opacity: 1,
          });

          gsap.set(bgImageRef.current, {
            scale: 1.28,
            yPercent: -6,
          });

          gsap.set(cards, {
            opacity: 0,
            y: 110,
            scale: 0.94,
          });

          cards.forEach((card) => {
            const side = card.dataset.side;
            gsap.set(card, {
              x: side === "left" ? -220 : 220,
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          });

          // 1. Circle slowly moves from below the heading to center.
          tl.to(
            imageMaskRef.current,
            {
              clipPath: "circle(105px at 50% 58%)",
              ease: "power2.inOut",
              duration: 2,
            },
            0
          );

          // 2. Heading slowly moves away.
          tl.to(
            introRef.current,
            {
              opacity: 0,
              y: -130,
              scale: 0.96,
              ease: "power2.out",
              duration: 1.4,
            },
            1
          );

          // 3. Very slow fullscreen reveal.
          tl.to(
            imageMaskRef.current,
            {
              clipPath: "circle(150vmax at 50% 50%)",
              ease: "power2.inOut",
              duration: 5.2,
            },
            2.4
          );

          // 4. Image zooms out slowly while circle expands.
          tl.to(
            bgImageRef.current,
            {
              scale: 1.04,
              yPercent: 0,
              ease: "none",
              duration: 5.8,
            },
            1.8
          );

          // 5. Hold fullscreen image for a moment before cards.
          tl.to({}, { duration: 1.2 });

          // 6. Cards enter slowly one by one.
          cards.forEach((card, i) => {
            tl.to(
              card,
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotate: i % 2 === 0 ? -1.5 : 1.5,
                ease: "power3.out",
                duration: 1.25,
              },
              8.2 + i * 0.75
            );
          });

          // 7. Cards float upward while scrolling.
          cards.forEach((card, i) => {
            tl.to(
              card,
              {
                y: i % 2 === 0 ? -38 : -60,
                ease: "none",
                duration: 1.8,
              },
              11.4 + i * 0.18
            );
          });

          // 8. Only cards disappear. Image stays. No whiteout.
          tl.to(
            cards,
            {
              opacity: 0,
              y: -120,
              scale: 0.95,
              stagger: 0.08,
              ease: "power2.inOut",
              duration: 1.2,
            },
            13.5
          );
        }

        // ---------------------------------------------------------------
        // MOBILE — shorter, touch-friendly parallax that drives the
        // stacked card list instead of the absolutely-positioned desktop
        // cards. Scroll distance is drastically reduced so the section
        // doesn't force endless scrolling on a small screen.
        // ---------------------------------------------------------------
        if (isMobile) {
          const mobileCards = mobileCardRefs.current.filter(
            Boolean
          ) as HTMLDivElement[];

          gsap.set(imageMaskRef.current, {
            clipPath: "circle(60px at 50% 72%)",
            opacity: 1,
          });

          gsap.set(bgImageRef.current, {
            scale: 1.32,
            yPercent: -8,
          });

          gsap.set(mobileCards, {
            opacity: 0,
            y: 50,
            scale: 0.96,
          });

          const tlMobile = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.85,
              invalidateOnRefresh: true,
              refreshPriority: -1,
            },
          });

          // 1. Circle nudges toward center.
          tlMobile.to(
            imageMaskRef.current,
            {
              clipPath: "circle(85px at 50% 62%)",
              ease: "power2.inOut",
              duration: 1,
            },
            0
          );

          // 2. Heading fades and lifts away.
          tlMobile.to(
            introRef.current,
            {
              opacity: 0,
              y: -70,
              scale: 0.97,
              ease: "power2.out",
              duration: 0.7,
            },
            0.35
          );

          // 3. Fullscreen reveal.
          tlMobile.to(
            imageMaskRef.current,
            {
              clipPath: "circle(150vmax at 50% 50%)",
              ease: "power2.inOut",
              duration: 1.9,
            },
            0.9
          );

          // 4. Image settles.
          tlMobile.to(
            bgImageRef.current,
            {
              scale: 1.05,
              yPercent: 0,
              ease: "none",
              duration: 2.1,
            },
            0.8
          );

          // 5. Brief hold on fullscreen image.
          tlMobile.to({}, { duration: 0.35 });

          // 6. Cards stagger in from the bottom.
          mobileCards.forEach((card, i) => {
            tlMobile.to(
              card,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "power3.out",
                duration: 0.55,
              },
              3.2 + i * 0.3
            );
          });

          // 7. Brief hold so cards are readable.
          tlMobile.to({}, { duration: 0.5 });

          // 8. Cards fade out together, image stays.
          tlMobile.to(
            mobileCards,
            {
              opacity: 0,
              y: -40,
              scale: 0.96,
              stagger: 0.05,
              ease: "power2.inOut",
              duration: 0.6,
            },
            5.2
          );
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-parallax-section="journey-start"
      className="relative h-[480vh] bg-white md:h-[1300vh]"
    >
      <div ref={pinRef} className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Intro text */}
        <div
          ref={introRef}
          className="absolute inset-x-0 top-[18vh] z-20 mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0c2847]/20 bg-white/80 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#0c2847]">
            Why Choose Us
          </span>

          <h2 className="font-heading text-[clamp(1.85rem,8vw,2.35rem)] font-medium leading-[1.06] tracking-[-0.045em] text-foreground md:text-[clamp(2.4rem,5vw,5.1rem)] md:leading-[1.02] md:tracking-[-0.055em]">
            <span className="block md:whitespace-nowrap">
              Let Your Language Journey
            </span>
            <span className="block md:whitespace-nowrap">
              Begin in the Right Place
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-black/75 sm:text-lg">
            We help students build real communication skills, prepare for global
            certifications, and move closer to study, work, and life abroad with
            confidence.
          </p>
        </div>

        {/* Image revealed through circle */}
        <div
          ref={imageMaskRef}
          className="absolute inset-0 z-10 overflow-hidden opacity-100 will-change-[clip-path]"
        >
          <img
            ref={bgImageRef}
            src="/eustreet-opt.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover will-change-transform"
          />

          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        </div>

        {/* Floating cards after fullscreen reveal (desktop only) */}
        {features.map((feature, index) => (
          <div
            key={feature.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            data-side={feature.side}
            className={`absolute z-40 hidden w-[335px] rounded-[30px] border border-white/15 bg-[#0c2847]/92 p-7 text-white shadow-[0_28px_90px_rgba(6,33,61,0.28)] backdrop-blur-xl will-change-transform md:block ${feature.position}`}
          >
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/75">
              {feature.icon}
            </div>

            <h3 className="font-heading text-2xl font-medium leading-[1.15] tracking-[-0.03em] text-white">
              {feature.title}
            </h3>

            <p className="mt-4 text-[15px] leading-7 text-white/68">
              {feature.desc}
            </p>
          </div>
        ))}

        {/* Mobile fallback — now scroll-driven with its own parallax timeline */}
        <div className="absolute inset-x-5 bottom-6 z-40 grid gap-3 md:hidden">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => {
                mobileCardRefs.current[index] = el;
              }}
              className="rounded-[22px] border border-white/15 bg-[#0c2847]/92 p-5 text-white shadow-xl backdrop-blur-xl will-change-transform"
            >
              <h3 className="font-heading text-lg font-medium text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-white/70">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
