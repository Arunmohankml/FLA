"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const approachCards = [
  {
    n: "01",
    title: "Student-Centered Learning",
    desc: "Every student. Every goal. Personalized learning paths.",
    image: "/approachcards-girl-teaching-opt.webp",
    width: 640,
    height: 427,
  },
  {
    n: "02",
    title: "Global Certification",
    desc: "Structured guidance for internationally recognised exams.",
    image: "/approachcards-globe-opt.webp",
    width: 640,
    height: 960,
  },
  {
    n: "03",
    title: "Conversation-First Method",
    desc: "Practical speaking confidence from day one.",
    image: "/approachcards-conversation-opt.webp",
    width: 640,
    height: 427,
  },
  {
    n: "04",
    title: "Online & Offline Support",
    desc: "Learn from classroom sessions or live online batches.",
    image: "/approachcards-sir-opt.webp",
    width: 640,
    height: 427,
  },
  {
    n: "05",
    title: "Certification Focus",
    desc: "Exam-focused preparation with regular practice.",
    image: "/approachcards-certificate-opt.webp",
    width: 640,
    height: 427,
  },
  {
    n: "06",
    title: "Modern Methods",
    desc: "Interactive, structured, and easy to stay consistent with.",
    image: "/approachcards-microphone-opt.webp",
    width: 467,
    height: 350,
  },
];

const faculty = [
  {
    lang: "German",
    code: "DE",
    cert: "Goethe Institut Certified",
    blurb: "Precision-built lessons for exam-ready fluency.",
    points: ["Native German Speakers", "10+ Years Teaching", "Goethe Certified Experts"],
    coord: "52.5° N",
  },
  {
    lang: "French",
    code: "FR",
    cert: "DELF-DALF Experts",
    blurb: "Melodic French with real conversation from lesson one.",
    points: ["Native French Speakers", "8+ Years of Experience", "DELF-DALF Certified"],
    coord: "48.8° N",
  },
  {
    lang: "Japanese",
    code: "JA",
    cert: "JLPT N1 Experts",
    blurb: "Structured toward JLPT, taught with real cultural context.",
    points: ["Native Japanese Speakers", "JLPT N1 Experts", "Cultural Immersion Focus"],
    coord: "35.6° N",
  },
  {
    lang: "Spanish",
    code: "ES",
    cert: "DELE Certified",
    blurb: "Confident conversational Spanish, DELE-ready.",
    points: ["Native Spanish Speakers", "8+ Years of Teaching", "DELE Certified Experts"],
    coord: "40.4° N",
  },
  {
    lang: "Korean",
    code: "KO",
    cert: "TOPIK Certified",
    blurb: "Fluency built for real conversations, TOPIK-tested.",
    points: ["Native Korean Speakers", "TOPIK Level 6 Experts", "Conversation Specialists"],
    coord: "37.5° N",
  },
  {
    lang: "English",
    code: "EN",
    cert: "CELTA / TEFL Certified",
    blurb: "Business-ready English from CELTA-trained natives.",
    points: ["Native English Speakers", "CELTA / TEFL Certified", "Business English Experts"],
    coord: "51.5° N",
  },
];

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { margin: "240px" });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = isInView && !prefersReducedMotion;

  return (
    <section ref={sectionRef} className="approach-pattern relative overflow-hidden bg-[#0c2847] py-12 lg:py-20">
      <div className="page-shell relative z-10">
        <div className="relative">
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 backdrop-blur">
                Our Approach
              </span>

              <h2 className="mt-6 font-heading text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.07em] text-white">
                Our Approach to
                <br />
                Teaching
              </h2>

              <p className="mt-6 max-w-lg text-[15px] leading-7 text-white/75">
                We combine structured lessons, practical speaking, certification
                preparation, and flexible online/offline learning to help every
                student progress with confidence.
              </p>

              <div className="mt-10 grid max-w-lg grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white/15 text-[#83C9FF] shadow-sm">
                    12K+
                  </span>
                  <p className="text-sm leading-5 text-white/75">
                    Students
                    <br />
                    guided
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white/15 text-[#83C9FF] shadow-sm">
                    8+
                  </span>
                  <p className="text-sm leading-5 text-white/75">
                    Countries
                    <br />
                    reached
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="relative min-h-[360px] sm:min-h-[420px]">
              <motion.img
                src="/approachhero1-opt.webp"
                alt="Student learning language"
                width={900}
                height={491}
                loading="lazy"
                decoding="async"
                animate={shouldAnimate ? { y: [0, -14, 0], rotate: [-2, 2, -2] } : { y: 0, rotate: -2 }}
                transition={{
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute left-[6%] top-0 h-[260px] w-[240px] rounded-[28px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.16)] will-change-transform sm:left-[10%] sm:h-[330px] sm:w-[330px] lg:h-[390px] lg:w-[390px]"
              />

              <motion.img
                src="/approachhero2-opt.webp"
                alt="Online language learning"
                width={560}
                height={540}
                loading="lazy"
                decoding="async"
                animate={shouldAnimate ? { y: [0, -10, 0], rotate: [3, 1, 3] } : { y: 0, rotate: 3 }}
                transition={{
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute right-2 top-4 h-[105px] w-[160px] rounded-[22px] object-cover shadow-[0_24px_60px_rgba(0,0,0,0.12)] will-change-transform sm:right-0 sm:top-2 sm:h-[150px] sm:w-[230px]"
              />

              <motion.img
                src="/approachhero3-opt.webp"
                alt="Language practice session"
                width={640}
                height={427}
                loading="lazy"
                decoding="async"
                animate={shouldAnimate ? { y: [0, 12, 0], rotate: [-3, -1, -3] } : { y: 0, rotate: -3 }}
                transition={{
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute bottom-12 right-3 h-[115px] w-[170px] rounded-[22px] object-cover shadow-[0_24px_60px_rgba(0,0,0,0.12)] will-change-transform sm:bottom-8 sm:right-6 sm:h-[170px] sm:w-[260px]"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={shouldAnimate ? { y: [0, -8, 0], rotate: [0, -0.6, 0] } : { y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  opacity: { duration: 0.45 },
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute bottom-12 left-1 max-w-[145px] rounded-[18px] border border-white/70 bg-white/90 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.1)] backdrop-blur-xl will-change-transform sm:bottom-4 sm:left-0 sm:max-w-[260px] sm:rounded-[24px] sm:p-5"
              >
                <div className="mb-2 flex size-8 items-center justify-center rounded-full bg-[#EAF4FF] text-sm text-[#0c2847] sm:mb-3 sm:size-10">
                  ✦
                </div>

                <h3 className="font-heading text-[15px] font-medium leading-tight text-foreground sm:text-lg">
                  Student-Centered Learning
                </h3>

                <p className="mt-2 text-xs leading-5 text-black/75 sm:text-sm sm:leading-6">
                  Personalised paths for every goal, level, and schedule.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="approach-marquee-fade relative mt-12 overflow-hidden">

            <motion.div
              className="flex w-max gap-4 pb-4"
              animate={shouldAnimate ? { x: ["0%", "-50%"] } : { x: "0%" }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {approachCards.concat(approachCards).map((card, index) => (
                <div
                  key={`${card.title}-${index}`}
                className="group w-[260px] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/8 p-4 backdrop-blur-xl transition-all duration-500 hover:bg-white/15"
                >
                  <div className="relative mb-5 h-36 overflow-hidden rounded-[22px] bg-white/10">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={card.width}
                      height={card.height}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <span className="text-xs font-semibold text-[#83C9FF]">
                    {card.n}
                  </span>

                  <h3 className="mt-2 font-heading text-lg font-medium leading-tight text-white">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-white/70">
                    {card.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function TrainersSection() {
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();

  if (!isDesktop || prefersReducedMotion) {
    return <TrainersMobile />;
  }

  return <TrainersDesktop />;
}

function TrainersDesktop() {
  const containerRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!railRef.current || !viewportRef.current) return;

      const getScrollMetrics = () => {
        const railWidth = railRef.current?.scrollWidth ?? 0;
        const viewportWidth = viewportRef.current?.offsetWidth ?? 0;
        const maxTranslate = railWidth - viewportWidth;
        const scrollDistance = Math.max(maxTranslate * 1.4, window.innerHeight * 1.6);

        return { maxTranslate, scrollDistance };
      };

      gsap.to(railRef.current, {
        x: () => -getScrollMetrics().maxTranslate,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onUpdate: (self) => {
            const idx = Math.min(
              faculty.length - 1,
              Math.max(0, Math.round(self.progress * (faculty.length - 1)))
            );

            setActive(idx);
            setScrollProgress(self.progress);
          },
        },
      });

      setActive(0);
      setScrollProgress(0);
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const routeProgress = scrollProgress;

  return (
    <section
      ref={containerRef}
      data-parallax-section="trainers"
      className="wave-overlay wave-overlay-light relative h-[320vh] !overflow-visible"
    >
      <div className="sticky top-0 flex min-h-screen flex-col justify-center py-8">
        <div className="page-shell w-full">
        <div ref={viewportRef} className="blue-dark-panel blue-grid-bg relative overflow-hidden rounded-[40px] px-6 py-10 shadow-[0_28px_90px_rgba(6,33,61,0.2)] sm:px-10">
          <svg
            className="pointer-events-none absolute inset-0 size-full opacity-40"
            viewBox="0 0 1200 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M40,380 C260,120 420,420 620,180 C800,-20 980,340 1160,120"
              fill="none"
              stroke="#0c2847"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              style={{ pathLength: routeProgress }}
            />
          </svg>

          <div className="relative z-10 mb-8 flex items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                Our Team &middot; Worldwide
              </span>
              <h2 className="mt-4 font-heading text-[clamp(2.2rem,3.6vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.06em] text-white">
                Trainers Who Live
                <br />
                What They Teach
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-6 text-white/72">
                Six languages, six homelands. Scroll to meet the certified native trainers behind every lesson.
              </p>
            </div>

            <div className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                {String(active + 1).padStart(2, "0")} / {String(faculty.length).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {faculty.map((f, i) => (
                  <span
                    key={f.code}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === active ? 20 : 6,
                      backgroundColor: i === active ? "#83C9FF" : "rgba(255,255,255,0.28)",
                }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div ref={railRef} className="relative z-10 flex w-max gap-6 will-change-transform">
            {faculty.map((t, i) => (
              <TrainerCard
                key={t.code}
                t={t}
                index={i}
                total={faculty.length}
                progress={scrollProgress}
              />
            ))}
            <div className="w-[10vw] shrink-0" />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function TrainerCard({
  t,
  index,
  total,
  progress,
}: {
  t: (typeof faculty)[number];
  index: number;
  total: number;
  progress: number;
}) {
  const per = 1 / total;
  const start = Math.max(0, index * per - per * 0.6);
  const mid = Math.min(1, index * per);
  const end = Math.min(1, index * per + per * 0.6);
  const entranceProgress =
    mid === start ? 1 : Math.min(1, Math.max(0, (progress - start) / (mid - start)));
  const exitProgress =
    end === mid ? 0 : Math.min(1, Math.max(0, (progress - mid) / (end - mid)));

  const rotateStart = index % 2 === 0 ? -7 : 7;
  const rotate = rotateStart * (1 - entranceProgress);
  const scale = 0.9 + entranceProgress * 0.1 - exitProgress * 0.04;
  const opacity = 0.35 + entranceProgress * 0.65;

  return (
    <motion.div
      style={{ rotate: `${rotate}deg`, scale, opacity }}
      className="w-[320px] shrink-0 overflow-hidden rounded-[24px] border border-black/5 bg-white p-5 shadow-[0_18px_40px_rgba(29,155,240,0.16)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#0c2847]/50 text-sm font-bold tracking-wide text-[#0c2847]">
            {t.code}
          </span>
          <div>
            <h3 className="font-heading text-[14px] font-medium text-foreground">
              {t.lang} Trainers
            </h3>
            <p className="mt-0.5 text-xs text-black/65">{t.cert}</p>
          </div>
        </div>
        <span className="mt-1 text-xs font-medium uppercase tracking-wider text-black/50">
          {t.coord}
        </span>
      </div>

      <p className="mt-4 text-[15px] leading-7 text-black/75">{t.blurb}</p>

      <div className="mt-4 flex flex-col gap-1.5 border-t border-black/5 pt-4">
        {t.points.map((pt) => (
          <span
            key={pt}
            className="inline-flex items-center gap-2 text-sm text-black"
          >
            <svg className="size-3 shrink-0 text-[#0c2847]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4.5 10.4 8.1 14 15.8 6.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {pt}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function TrainersMobile() {
  return (
    <section data-parallax-section="trainers-fallback" className="blue-section py-8">
      <div className="page-shell relative z-10">
        <div className="mb-6 max-w-xl">
          <span className="inline-flex rounded-full border border-[#0c2847]/30 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0c2847]">
            Our Team
          </span>
          <h2 className="mt-4 font-heading text-[clamp(2.2rem,3.6vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.06em] text-foreground">
            Trainers Who Live
            <br />
            What They Teach
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-6 text-black/70">
            Six languages, six homelands. Meet the certified native trainers behind every lesson.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faculty.map((t, i) => (
            <motion.div
              key={t.code}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="blue-card rounded-[22px] p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-[#0c2847]/50 text-sm font-bold tracking-wide text-[#0c2847]">
                  {t.code}
                </span>
                <div>
                  <h3 className="font-heading text-[14px] font-medium text-foreground">
                    {t.lang} Trainers
                  </h3>
                  <p className="mt-0.5 text-xs text-black/65">{t.cert}</p>
                </div>
              </div>
              <p className="mt-3 text-[15px] leading-7 text-black/75">{t.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.points.map((pt) => (
                  <span
                    key={pt}
                    className="inline-flex items-center gap-2 rounded-[10px] border border-black/5 bg-[#F5FAFF] px-3 py-1.5 text-sm text-black"
                  >
                    <svg className="size-3 shrink-0 text-[#0c2847]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M4.5 10.4 8.1 14 15.8 6.2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {pt}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
