"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIN_OFFSET = 96;

const SunriseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const rhythms = [
  {
    icon: <SunriseIcon />,
    label: "Morning",
    time: "6 AM – 12 PM",
    desc: "Perfect for early learners",
    image: "/image29.png",
    note: "Start fresh with focused lessons before the day gets busy.",
  },
  {
    icon: <SunIcon />,
    label: "Afternoon",
    time: "12 PM – 5 PM",
    desc: "Convenient midday learning",
    image: "/image30.png",
    note: "A flexible slot for students, professionals, and hybrid learners.",
  },
  {
    icon: <MoonIcon />,
    label: "Evening",
    time: "5 PM – 10 PM",
    desc: "After-work learning",
    image: "/image31.png",
    note: "Learn comfortably after college, work, or daily responsibilities.",
  },
];

function refreshAfterImagesDecode(root: HTMLElement | null) {
  if (!root) return;

  const images = Array.from(root.querySelectorAll("img"));

  Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();

      return img.decode().catch(
        () =>
          new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          })
      );
    })
  ).then(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh(true));
  });
}

export function LearningRhythm() {
  const [active, setActive] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);

  const setActiveSafe = (index: number) => {
    if (activeRef.current === index) return;
    activeRef.current = index;
    setActive(index);
  };

  // fires every time the pin engages, in either scroll direction — a quick
  // "settle" pop layered on top of the continuous scrub-driven fade below
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const images = imageRefs.current.filter(Boolean) as HTMLImageElement[];
      const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];

      // ---- gentle, non-pinned reveal for the heading as it enters view ----
      if (headingRef.current && !prefersReduced) {
        gsap.set(headingRef.current, { autoAlpha: 0, y: 28 });
        gsap.to(headingRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }

      gsap.set(contentRef.current, { y: 0, force3D: true });

      gsap.set(images, { autoAlpha: 0, scale: 1.12, yPercent: 4, force3D: true });
      gsap.set(images[0], { autoAlpha: 1, scale: 1.035, yPercent: 0 });

      gsap.set(texts, { autoAlpha: 0, y: 22 });
      gsap.set(texts[0], { autoAlpha: 1, y: 0 });

      gsap.set(progressRef.current, { scaleY: 0, transformOrigin: "top center" });

      // the stage's own resting state — this is what the entry/exit
      // tweens below animate to/from, independent of the pin mechanics
      if (!prefersReduced) {
        gsap.set(stageRef.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          force3D: true,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: () => `top top+=${PIN_OFFSET}`,
          end: () =>
            `+=${window.innerHeight * (window.innerWidth < 640 ? 2.35 : 3.35)}`,
          scrub: prefersReduced ? true : 1.1,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.25) setActiveSafe(0);
            else if (progress < 0.54) setActiveSafe(1);
            else setActiveSafe(2);
          },
        },
      });

      triggerRef.current = tl.scrollTrigger ?? null;

      tl.to(progressRef.current, { scaleY: 1, ease: "none", duration: 5.6 }, 0);

      // Morning hold
      tl.to({}, { duration: 0.7 });

      // Morning out
      tl.to(images[0], { autoAlpha: 0, scale: 1, yPercent: -3, duration: 1.05, ease: "power2.inOut" }, 1.05);
      tl.to(texts[0], { autoAlpha: 0, y: -22, duration: 0.65, ease: "power2.out" }, 1.08);

      // Afternoon in
      tl.to(images[1], { autoAlpha: 1, scale: 1.035, yPercent: 0, duration: 1.15, ease: "power2.inOut" }, 1.38);
      tl.to(texts[1], { autoAlpha: 1, y: 0, duration: 0.78, ease: "power3.out" }, 1.55);

      // Afternoon hold
      tl.to({}, { duration: 1.05 });

      // Afternoon out
      tl.to(images[1], { autoAlpha: 0, scale: 1, yPercent: -3, duration: 1.05, ease: "power2.inOut" }, 3.05);
      tl.to(texts[1], { autoAlpha: 0, y: -22, duration: 0.65, ease: "power2.out" }, 3.08);

      // Evening in
      tl.to(images[2], { autoAlpha: 1, scale: 1.035, yPercent: 0, duration: 1.15, ease: "power2.inOut" }, 3.38);
      tl.to(texts[2], { autoAlpha: 1, y: 0, duration: 0.78, ease: "power3.out" }, 3.55);

      // Evening hold
      tl.to({}, { duration: 0.75 });
      refreshAfterImagesDecode(sectionRef.current);

      const refresh = () => ScrollTrigger.refresh(true);
      requestAnimationFrame(refresh);
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToIndex = (index: number) => {
    const trigger = triggerRef.current;

    if (!trigger) {
      setActiveSafe(index);
      return;
    }

    const positions = [0.14, 0.5, 0.86];
    const target = trigger.start + (trigger.end - trigger.start) * positions[index];

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-4 lg:overflow-visible lg:py-6">
      <div ref={pinRef} className="relative bg-background">
        <div ref={headingRef} className="page-shell pt-0">
          <div className="mb-2 lg:mb-3">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#faf5f0] px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Schedule
            </span>

            <h2 className="font-heading text-[34px] font-medium leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl sm:leading-[1.06] sm:tracking-[-0.045em] lg:text-[56px]">
              Choose Your Learning Rhythm
            </h2>

            <p className="mt-2 hidden max-w-[315px] text-[15px] leading-7 text-muted-foreground sm:block sm:max-w-lg sm:text-base">
              Pick morning, afternoon, or evening batches designed for online,
              offline, and hybrid learners.
            </p>
          </div>
        </div>

        <div ref={contentRef} className="page-shell pt-0 will-change-transform">
          <div ref={stageRef} className="grid w-full min-w-0 gap-4 sm:gap-5 lg:grid-cols-5 lg:items-stretch lg:gap-6">
            <div className="relative overflow-hidden rounded-[28px] lg:col-span-3 lg:rounded-[32px]">
              <div className="relative h-[250px] overflow-hidden rounded-[24px] sm:h-[360px] sm:rounded-[28px] lg:h-[430px] lg:rounded-[32px]">
                {rhythms.map((rhythm, index) => (
                  <img
                    key={rhythm.label}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    src={rhythm.image}
                    alt={`${rhythm.label} language class timing`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                  />
                ))}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/18 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10" />

                <div className="absolute bottom-4 left-4 right-4 min-h-[104px] sm:bottom-7 sm:left-7 sm:right-7 sm:min-h-[116px]">
                  {rhythms.map((rhythm, index) => (
                    <div
                      key={`${rhythm.label}-text`}
                      ref={(el) => {
                        textRefs.current[index] = el;
                      }}
                      className="absolute bottom-0 left-0 right-0 max-w-full sm:right-auto sm:max-w-xl"
                    >
                      <span className="mb-2 inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:mb-3 sm:text-[11px]">
                        {rhythm.time}
                      </span>

                      <h3 className="font-heading text-[28px] font-medium leading-none tracking-[-0.035em] text-white sm:text-5xl sm:tracking-[-0.04em]">
                        {rhythm.label}
                      </h3>

                      <p className="mt-2 max-w-[280px] text-xs leading-5 text-white/78 sm:mt-3 sm:max-w-md sm:text-base sm:leading-6">
                        {rhythm.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex min-w-0 max-w-full gap-4 overflow-hidden lg:col-span-2 lg:overflow-visible">
              <div className="relative hidden w-1 shrink-0 overflow-hidden rounded-full bg-black/5 lg:block">
                <div
                  ref={progressRef}
                  className="absolute inset-x-0 top-0 h-full rounded-full bg-[#e8734a]/45"
                />
              </div>

              <div className="flex min-w-0 flex-1 justify-center gap-3 overflow-hidden pb-1 sm:hidden">
                {rhythms.map((rhythm, index) => (
                  <button
                    key={`${rhythm.label}-mobile`}
                    type="button"
                    aria-label={`Show ${rhythm.label} batch`}
                    aria-pressed={active === index}
                    onClick={() => scrollToIndex(index)}
                    className={[
                      "flex size-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      active === index
                        ? "border-[#e8734a]/35 bg-[#fff7f2] text-[#e8734a] shadow-[0_10px_26px_rgba(232,115,74,0.16)]"
                        : "border-black/6 bg-white text-black/35",
                    ].join(" ")}
                  >
                    {rhythm.icon}
                  </button>
                ))}
              </div>

              <div className="hidden min-w-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 sm:flex lg:flex-col lg:justify-center lg:gap-4 lg:overflow-visible lg:pb-0">
                {rhythms.map((rhythm, index) => (
                  <button
                    key={rhythm.label}
                    type="button"
                    aria-pressed={active === index}
                    onClick={() => scrollToIndex(index)}
                    className={[
                      "group relative min-w-full max-w-full snap-start overflow-hidden rounded-[22px] border p-4 text-left transition-all duration-500 sm:min-w-[270px] sm:max-w-none sm:p-5 lg:min-w-0 lg:rounded-[26px]",
                      active === index
                        ? "border-[#e8734a]/18 bg-[#faf5f0] shadow-[0_18px_55px_rgba(0,0,0,0.055)]"
                        : "border-black/5 bg-white hover:border-black/10 hover:bg-[#faf5f0]/45",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "absolute inset-y-0 left-0 w-1 rounded-full transition-all duration-500",
                        active === index
                          ? "bg-[#e8734a]/70 opacity-100"
                          : "bg-transparent opacity-0",
                      ].join(" ")}
                    />

                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={[
                          "flex size-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 sm:size-12",
                          active === index
                            ? "bg-white text-[#e8734a] shadow-[0_10px_30px_rgba(232,115,74,0.12)]"
                            : "bg-[#faf5f0] text-black/35",
                        ].join(" ")}
                      >
                        {rhythm.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-heading text-base font-medium tracking-[-0.02em] text-foreground sm:text-lg">
                          {rhythm.label}
                        </h4>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {rhythm.time}
                        </p>
                      </div>

                      <span
                        className={[
                          "hidden max-w-[150px] text-right text-xs font-semibold leading-5 transition-colors duration-500 sm:block",
                          active === index
                            ? "text-foreground"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {rhythm.desc}
                      </span>
                    </div>

                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-black/[0.04]">
                      <div
                        className={[
                          "h-full rounded-full bg-[#e8734a]/70 transition-all duration-700",
                          active === index ? "w-full" : "w-0",
                        ].join(" ")}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
