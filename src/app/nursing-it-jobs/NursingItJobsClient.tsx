"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineArrowRight,
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineLocationMarker,
  HiOutlineSparkles,
} from "react-icons/hi";

// Guard plugin registration for SSR — GSAP/ScrollTrigger must only touch
// window/document on the client.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const nursingDestinations = [
  {
    country: "Germany",
    language: "German B2",
    roles: "Registered nurse, geriatric nurse, hospital ward nurse, care home nurse",
    details: "Strong demand in hospitals, elderly care, rehabilitation centres, and speciality clinics.",
  },
  {
    country: "United Kingdom",
    language: "IELTS/OET English",
    roles: "Adult nurse, care assistant, senior care worker, clinical support worker",
    details: "NMC pathway preparation, communication practice, CV support, and interview readiness.",
  },
  {
    country: "Ireland",
    language: "English proficiency",
    roles: "Staff nurse, elderly care nurse, theatre support, healthcare assistant",
    details: "Popular for qualified nurses seeking English-speaking healthcare environments.",
  },
  {
    country: "Australia",
    language: "IELTS/OET English",
    roles: "Aged care nurse, enrolled nurse, registered nurse, community care support",
    details: "Attractive for post-study and healthcare migration pathways subject to eligibility.",
  },
  {
    country: "Canada",
    language: "English or French",
    roles: "Nursing assistant, care aide, home support worker, registered nursing pathway",
    details: "French can strengthen options in Quebec and bilingual healthcare teams.",
  },
  {
    country: "New Zealand",
    language: "English proficiency",
    roles: "Aged care, clinical support, hospital support, registered nursing pathway",
    details: "Good fit for healthcare professionals who need clear patient communication training.",
  },
];

const itDestinations = [
  {
    market: "Germany",
    roles: "Software developer, cloud engineer, SAP consultant, QA automation, embedded systems",
    edge: "German B1-B2 improves interviews, workplace integration, and client communication.",
    image: "/nimage7.png",
    accent: "SAP, cloud, automotive IT",
  },
  {
    market: "Canada",
    roles: "Full-stack developer, data analyst, cybersecurity analyst, IT support specialist",
    edge: "English communication plus French basics can help in bilingual teams and provinces.",
    image: "/nimage8.png",
    accent: "Data, support, cyber",
  },
  {
    market: "Australia",
    roles: "DevOps engineer, business analyst, network engineer, product support, QA tester",
    edge: "Professional English, resume positioning, and scenario-based interview practice matter.",
    image: "/nimage9.png",
    accent: "DevOps, QA, analysis",
  },
  {
    market: "Japan",
    roles: "Java developer, automotive IT, embedded engineer, testing engineer, support engineer",
    edge: "Japanese N4-N2 training supports daily work, documentation, and team collaboration.",
    image: "/nimage10.png",
    accent: "Embedded, Java, testing",
  },
  {
    market: "Netherlands",
    roles: "Frontend engineer, backend developer, data engineer, cloud operations",
    edge: "English is common, but workplace cultural communication is still a hiring advantage.",
    image: "/nimage11.png",
    accent: "Frontend, backend, data",
  },
  {
    market: "Singapore",
    roles: "IT support, cybersecurity, fintech developer, cloud administrator, data operations",
    edge: "Business English and interview clarity help candidates stand out in fast hiring cycles.",
    image: "/nimage12.png",
    accent: "Fintech, cloud, support",
  },
];

const process = [
  "Profile counselling and destination fitment",
  "Language training from foundation to B2 level",
  "Exam preparation for Goethe, IELTS, OET, DELF, JLPT, or relevant pathway",
  "International CV, LinkedIn, and document checklist guidance",
  "Mock interviews, workplace vocabulary, and career communication practice",
  "100% placement assistance for eligible students through suitable opportunity mapping",
];

const benefits = [
  "Separate learning paths for nurses, fresh IT graduates, and working professionals",
  "Healthcare German, medical vocabulary, patient communication, and hospital role-play",
  "IT interview language, project explanation practice, email writing, and workplace etiquette",
  "Guidance for destination selection, skill gaps, documentation, and realistic timelines",
  "Flexible online, offline, and hybrid batches from Foreign Language Academy",
  "Support focused on eligibility, preparation quality, and confidence, not risky job guarantees",
];

const eligibility = [
  "Nursing diploma, BSc Nursing, GNM, or relevant healthcare experience for nursing pathways",
  "BTech, BCA, MCA, diploma, portfolio projects, or IT work experience for technology roles",
  "Willingness to complete language levels up to B2 where the destination requires it",
  "Basic computer skills, documentation readiness, and professional communication discipline",
  "Employer, visa, licensing, and country-specific criteria must be met by the candidate",
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#B9E2FF]/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase text-[#0c2847] shadow-[0_10px_30px_rgba(29,155,240,0.08)] backdrop-blur">
      <HiOutlineSparkles className="size-3.5 text-[#1d9bf0]" />
      {children}
    </span>
  );
}

function CheckItem({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex gap-3 rounded-xl py-1.5 pl-1 text-[15px] leading-7 text-[#334155] transition-colors duration-300 hover:bg-[#EAF4FF]/70"
    >
      <motion.span
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          delay: index * 0.06 + 0.15,
          type: "spring",
          stiffness: 280,
          damping: 18,
        }}
        className="mt-1 shrink-0"
      >
        <HiOutlineCheckCircle className="size-5 text-[#1d9bf0] transition-transform duration-300 group-hover:scale-110" />
      </motion.span>
      <span>{children}</span>
    </motion.li>
  );
}

export function NursingItJobsClient() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], shouldReduceMotion ? [0, 0] : [0, -52]);
  const panelY = useTransform(scrollYProgress, [0.1, 0.75], shouldReduceMotion ? [0, 0] : [28, -36]);

  const itWrapperRef = useRef<HTMLDivElement | null>(null);
  const itPinRef = useRef<HTMLDivElement | null>(null);
  const itIntroRef = useRef<HTMLDivElement | null>(null);
  const itCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const wrapper = itWrapperRef.current;
    const pinEl = itPinRef.current;
    if (!wrapper || !pinEl) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (itIntroRef.current) {
        gsap.from(itIntroRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itIntroRef.current,
            start: "top 85%",
          },
        });
      }

      const cardEls = itCardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cardEls.length === 0) return;

      // Small vertical offset per card so, once stacked, each one leaves a
      // sliver of the card behind it peeking out — like a real pile of cards.
      const stackOffset = 10;

      cardEls.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 112,
          y: i === 0 ? 0 : i * stackOffset,
          force3D: true,
          willChange: "transform",
        });
      });

      if (prefersReducedMotion) return;

      // IMPORTANT: we let ScrollTrigger own the pinning (pin: true) instead
      // of relying on CSS `position: sticky` on the wrapper below. Sticky
      // silently stops working if ANY ancestor sets `overflow: hidden`
      // (which <main> does, further up the tree) — the element just never
      // sticks and the whole scroll-jack effect appears broken. GSAP's pin
      // switches the element to `position: fixed` under the hood, which is
      // immune to that ancestor-overflow gotcha, so this is the robust fix.
      //
      // Because `wrapper` already has an explicit height that provides the
      // scroll "runway" for this effect, we set pinSpacing: false so GSAP
      // doesn't ALSO inject its own spacer on top of it (that double-spacing
      // is what usually makes a pin+scrub combo feel janky or end early).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });

      cardEls.forEach((card, i) => {
        if (i === 0) return;
        tl.to(
          card,
          {
            yPercent: 0,
            y: i * stackOffset,
            duration: 1,
            ease: "power2.out",
          },
          i - 1,
        );
      });
    }, wrapper);

    // next/image loads asynchronously, which can shift layout after
    // ScrollTrigger has already measured start/end positions on mount.
    // Re-measuring once images settle keeps the pin range (and therefore
    // the scrub timing) accurate instead of drifting out of sync.
    const handleRefresh = () => ScrollTrigger.refresh(true);
    requestAnimationFrame(handleRefresh);
    window.addEventListener("load", handleRefresh);
    window.addEventListener("resize", handleRefresh);

    const images = Array.from(wrapper.querySelectorAll("img"));
    const pendingImages = images.filter((img) => !img.complete);
    pendingImages.forEach((img) => {
      img.decode().then(handleRefresh).catch(() => {
        img.addEventListener("load", handleRefresh, { once: true });
        img.addEventListener("error", handleRefresh, { once: true });
      });
    });

    return () => {
      window.removeEventListener("load", handleRefresh);
      window.removeEventListener("resize", handleRefresh);
      pendingImages.forEach((img) => {
        img.removeEventListener("load", handleRefresh);
        img.removeEventListener("error", handleRefresh);
      });
      ctx.revert();
    };
  }, []);

  return (
    <main className="bg-white">
      <section className="wave-pattern-bg wave-pattern-bg-hero relative overflow-hidden pt-28 lg:pt-32">
        <div className="page-shell relative z-10 pb-14 lg:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel>Nursing opportunities first</SectionLabel>
              <h1 className="mt-6 max-w-4xl font-heading text-[clamp(2.45rem,6vw,5.4rem)] font-medium leading-[0.98] text-[#0c2847]">
                Nursing & IT Jobs Abroad
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#334155]">
                Foreign Language Academy prepares eligible students for nursing
                and technology careers abroad with language training up to B2
                level, career preparation, interview guidance, documentation
                support, and 100% placement assistance.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#536471]">
                Placement assistance means guided opportunity support for
                eligible students. Final selection depends on qualification,
                language level, licensing, visa rules, employer criteria, and
                interview performance.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book-demo"
                  className="blue-cta inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d9bf0]"
                >
                  Enquire for career guidance
                  <HiOutlineArrowRight className="size-4" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex min-h-12 items-center rounded-full border border-[#0c2847]/20 bg-white px-6 text-sm font-semibold text-[#0c2847] transition-colors hover:bg-[#EAF4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d9bf0]"
                >
                  View language courses
                </Link>
              </div>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {[
                  ["B2", "language target"],
                  ["100%", "placement assistance"],
                  ["2010", "trusted since"],
                ].map(([value, label]) => (
                  <div key={label} className="blue-card rounded-2xl bg-white/90 p-4 text-center">
                    <p className="font-heading text-2xl font-semibold text-[#0c2847]">{value}</p>
                    <p className="mt-1 text-xs font-medium text-[#536471]">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative min-h-[540px] lg:min-h-[660px]">
              <motion.div
                style={{ y: heroY }}
                className="blue-card absolute left-0 top-8 aspect-[4/5] w-[62%] overflow-hidden rounded-[34px]"
              >
                <Image
                  src="/nimage1.png"
                  alt="Foreign Language Academy nursing opportunities abroad placeholder"
                  width={1200}
                  height={800}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 62vw, 420px"
                  className="size-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 28, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="blue-card absolute right-0 top-0 aspect-[5/4] w-[58%] overflow-hidden rounded-[34px]"
              >
                <Image
                  src="/nimage2.png"
                  alt="B2 language training for nurses and IT professionals"
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 58vw, 420px"
                  className="size-full object-cover"
                />
              </motion.div>
              <motion.div
                style={{ y: panelY }}
                className="blue-dark-panel blue-grid-bg absolute bottom-6 right-4 w-[78%] rounded-[30px] p-5 shadow-[0_28px_90px_rgba(12,40,71,0.28)] sm:p-6"
              >
                <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src="/nimage3.png"
                      alt="Hospital placement assistance and career preparation"
                      fill
                      sizes="(max-width: 768px) 45vw, 220px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-white/70">Career track</p>
                    <h2 className="mt-2 font-heading text-2xl font-medium leading-tight text-white">
                      Language + career preparation + guided opportunity mapping
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-white/76">
                      Built for students who want a serious pathway abroad
                      without weak promises or confusing shortcuts.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="blue-section py-16 lg:py-24">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionLabel>Nursing careers abroad</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-[#0c2847] sm:text-5xl">
                Build the language confidence healthcare employers expect.
              </h2>
              <p className="mt-5 text-[16px] leading-8 text-[#334155]">
                Nurses need more than grammar. Foreign Language Academy trains
                students for patient conversations, shift handovers, hospital
                vocabulary, documentation language, and interview confidence up
                to B2 level where required.
              </p>
              <div className="mt-8 overflow-hidden rounded-[28px] [mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)]">
                <Image
                  src="/nimage4.png"
                  alt="International healthcare and IT career preparation"
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 430px"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {nursingDestinations.map((item, index) => (
                <motion.article
                  key={item.country}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={reveal}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="blue-card blue-card-hover rounded-[24px] bg-white/95 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-2xl font-medium text-[#0c2847]">{item.country}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase text-[#1d9bf0]">{item.language}</p>
                    </div>
                    <HiOutlineLocationMarker className="size-6 shrink-0 text-[#1d9bf0]" />
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#0f1419]">{item.roles}</p>
                  <p className="mt-3 text-[14px] leading-6 text-[#536471]">{item.details}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#F5FAFF] py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(185,226,255,0.45)_1px,transparent_1px),linear-gradient(180deg,rgba(185,226,255,0.35)_1px,transparent_1px)] bg-[size:54px_54px] opacity-45" />
        <div className="page-shell relative">
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionLabel>Why B2 matters</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-[#0c2847] sm:text-5xl">
                B2 is where language becomes workplace-ready.
              </h2>
              <p className="mt-5 text-[16px] leading-8 text-[#334155]">
                For many nursing and regulated career routes, B2 is the level
                where candidates can explain symptoms, discuss procedures,
                understand instructions, write formal messages, and respond
                professionally under pressure.
              </p>
            </div>

            {/* Level ladder — treated as a connected progress track rather than
                four identical fade-up cards, since it's a sequence, not a list. */}
            <div className="relative">
              <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-[#B9E2FF]/70 sm:block" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "0% 50%" }}
                className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-[#1d9bf0] to-[#0c2847] sm:block"
              />
              <div className="grid gap-3 sm:grid-cols-4" style={{ perspective: 900 }}>
                {["A1 Foundation", "A2 Daily use", "B1 Independence", "B2 Career ready"].map((level, index) => (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, y: 26, rotateX: -14, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.5, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative rounded-[22px] border p-5 ${
                      index === 3
                        ? "border-[#0c2847] bg-[#0c2847] text-white shadow-[0_24px_70px_rgba(12,40,71,0.26)]"
                        : "border-[#B9E2FF]/80 bg-white text-[#0c2847]"
                    }`}
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -60 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        delay: index * 0.09 + 0.22,
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                      }}
                      className={`absolute -top-2.5 -right-2.5 flex size-7 items-center justify-center rounded-full text-[11px] font-bold ${
                        index === 3 ? "bg-white text-[#0c2847]" : "bg-[#1d9bf0] text-white"
                      }`}
                    >
                      {index + 1}
                    </motion.span>
                    <p className="font-heading text-3xl font-medium">{level.split(" ")[0]}</p>
                    <p className={`mt-10 text-sm font-semibold ${index === 3 ? "text-white/78" : "text-[#536471]"}`}>
                      {level.replace(level.split(" ")[0] + " ", "")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={itWrapperRef}
        data-parallax-section="it-destination-cards"
        className="relative h-[560vh] overflow-visible bg-white"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(29,155,240,0.1),transparent_28%),linear-gradient(90deg,rgba(185,226,255,0.36)_1px,transparent_1px),linear-gradient(180deg,rgba(185,226,255,0.26)_1px,transparent_1px)] bg-[size:100%_100%,70px_70px,70px_70px]" />
        <div
          ref={itPinRef}
          className="sticky top-0 flex min-h-screen items-start overflow-hidden pb-12 pt-20 sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-24"
        >
          <div className="page-shell relative w-full">
            <div className="grid w-full gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
              <div ref={itIntroRef}>
              <SectionLabel>IT jobs and career opportunities</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-[#0c2847] sm:text-5xl">
                Tech careers abroad need more than a good resume.
              </h2>
              <p className="mt-5 text-[16px] leading-8 text-[#334155]">
                Foreign Language Academy turns technical profiles into
                interview-ready global candidates with language goals,
                workplace communication, project storytelling, international CV
                shaping, and destination-specific preparation.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {["Cloud", "Data", "Cyber"].map((skill) => (
                  <div key={skill} className="rounded-2xl border border-[#B9E2FF]/70 bg-white/90 p-4 text-center shadow-[0_12px_38px_rgba(29,155,240,0.08)]">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1d9bf0]">Track</p>
                    <p className="mt-2 font-heading text-lg font-semibold text-[#0c2847]">{skill}</p>
                  </div>
                ))}
              </div>
            </div>

              <div className="relative flex h-[62vh] w-full max-w-[700px] items-center justify-center sm:h-[66vh] lg:h-[70vh]">
                  {itDestinations.map((item, index) => (
                    <div
                      key={item.market}
                      ref={(el) => {
                        itCardsRef.current[index] = el;
                      }}
                      className="blue-card absolute inset-x-0 mx-auto h-full w-full overflow-hidden rounded-[30px] bg-white shadow-[0_28px_90px_rgba(29,155,240,0.16)]"
                      style={{ zIndex: index + 1 }}
                    >
                      <div className="grid h-full sm:grid-cols-[0.92fr_1.08fr]">
                        <div className="relative min-h-[200px] overflow-hidden bg-[#0c2847] sm:min-h-full">
                          <Image
                            src={item.image}
                            alt={`${item.market} IT career opportunities with Foreign Language Academy`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 420px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#0c2847]/78 via-[#0c2847]/18 to-transparent" />
                        </div>
                        <div className="flex flex-col justify-center p-6 sm:p-8">
                          <div>
                            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#EAF4FF] text-[#0c2847]">
                              <HiOutlineBriefcase className="size-6" />
                            </div>
                            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#1d9bf0]">
                              {item.accent}
                            </p>
                            <h4 className="mt-3 font-heading text-2xl font-medium leading-tight text-[#0c2847] sm:text-3xl">
                              {item.roles}
                            </h4>
                            <p className="mt-5 text-[15px] leading-7 text-[#334155]">
                              {item.edge}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </section>

      <section className="blue-dark-panel blue-ribbon-bg py-16 lg:py-24">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionLabel>Training and placement process</SectionLabel>
              <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-white sm:text-5xl">
                A clear pathway from language level to opportunity readiness.
              </h2>
              <p className="mt-5 text-[16px] leading-8 text-white/76">
                The process is designed to help eligible students understand
                the gap between where they are now and what employers, licensing
                bodies, and immigration routes may expect.
              </p>
              <Link
                href="/register"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0c2847] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Register interest
                <HiOutlineArrowRight className="size-4" />
              </Link>
            </div>

            {/* Steps get a numbered connector + animated underline instead of
                a plain alternating fade — reinforces that this is a sequence. */}
            <ol className="grid gap-4 sm:grid-cols-2">
              {process.map((step, index) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-[24px] border border-white/16 bg-white/10 p-5 backdrop-blur transition-colors duration-300 hover:bg-white/[0.14]"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: index * 0.05 + 0.15,
                      type: "spring",
                      stiffness: 260,
                      damping: 16,
                    }}
                    className="flex size-9 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0c2847]"
                  >
                    {index + 1}
                  </motion.span>
                  <p className="mt-5 text-[15px] font-semibold leading-7 text-white/86">{step}</p>
                  <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#1d9bf0] to-white/60 transition-transform duration-500 group-hover:scale-x-100" />
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#F5FAFF] py-16 lg:py-24">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="blue-card rounded-[30px] bg-white p-6 sm:p-8">
              <div className="relative mb-7 aspect-[16/8] overflow-hidden rounded-[24px]">
                <Image
                  src="/nimage5.png"
                  alt="Foreign Language Academy career preparation benefits"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <h2 className="font-heading text-3xl font-medium text-[#0c2847]">Student benefits</h2>
              <ul className="mt-5 space-y-1">
                {benefits.map((item, i) => (
                  <CheckItem key={item} index={i}>
                    {item}
                  </CheckItem>
                ))}
              </ul>
            </div>

            <div className="blue-card rounded-[30px] bg-white p-6 sm:p-8">
              <div className="relative mb-7 aspect-[16/8] overflow-hidden rounded-[24px]">
                <Image
                  src="/nimage6.png"
                  alt="Eligibility and required skills for nursing and IT jobs abroad"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <h2 className="font-heading text-3xl font-medium text-[#0c2847]">Eligibility and required skills</h2>
              <ul className="mt-5 space-y-1">
                {eligibility.map((item, i) => (
                  <CheckItem key={item} index={i}>
                    {item}
                  </CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="page-shell">
          <div className="blue-dark-panel blue-grid-bg overflow-hidden rounded-[34px] p-6 sm:p-10 lg:p-12">
            <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase text-white/76">
                  <HiOutlineGlobeAlt className="size-4" />
                  Nursing and IT abroad guidance
                </p>
                <h2 className="mt-6 font-heading text-4xl font-medium leading-tight text-white sm:text-5xl">
                  Start with the right language level, then prepare for the right opportunity.
                </h2>
                <p className="mt-5 max-w-2xl text-[16px] leading-8 text-white/76">
                  Speak with Foreign Language Academy about B2 training,
                  destination selection, career preparation, and placement
                  assistance for eligible nursing and IT students.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href="/book-demo"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#0c2847] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Book a demo
                  <HiOutlineArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/24 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Talk to counsellor
                  <HiOutlineClock className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
