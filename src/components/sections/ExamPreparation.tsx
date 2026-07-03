"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type ExamCard = {
  category: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  levels: string[];
  institution: string;
  logoSrc: string;
  logoAlt: string;
  logoClassName: string;
};

const cards: ExamCard[] = [
  {
    category: "Official Preparation",
    categoryColor: "text-[#c89e38]",
    title: "GOETHE",
    subtitle: "German Certification",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    institution: "Goethe-Institut",
    logoSrc: "/logos/goethe.webp",
    logoAlt: "Goethe logo",
    logoClassName: "object-contain p-5",
  },
  {
    category: "France Ministry of Education",
    categoryColor: "text-[#7292c2]",
    title: "DELF / DALF",
    subtitle: "French Certification",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    institution: "Ministere de l'Education Nationale",
    logoSrc: "/logos/DelfDalf-CMJN.webp",
    logoAlt: "DELF DALF logo",
    logoClassName: "object-contain p-5",
  },
  {
    category: "Global Standard",
    categoryColor: "text-[#d37a7a]",
    title: "JLPT",
    subtitle: "Japanese Proficiency",
    levels: ["N5", "N4", "N3", "N2", "N1"],
    institution: "The Japan Foundation",
    logoSrc: "/logos/jlpt.webp",
    logoAlt: "JLPT logo",
    logoClassName: "object-contain p-5",
  },
  {
    category: "Instituto Cervantes",
    categoryColor: "text-[#f08b2d]",
    title: "DELE",
    subtitle: "Spanish Diploma",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
    institution: "Instituto Cervantes",
    logoSrc: "/logos/logo+DELE.webp",
    logoAlt: "DELE logo",
    logoClassName: "object-contain p-5",
  },
  {
    category: "Chinese Ministry of Education",
    categoryColor: "text-[#7ca690]",
    title: "HSK",
    subtitle: "Chinese Proficiency",
    levels: ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"],
    institution: "Hanban / Chinese Ministry of Education",
    logoSrc: "/logos/hsk.webp",
    logoAlt: "HSK logo",
    logoClassName: "object-contain p-5",
  },
  {
    category: "Korean Government",
    categoryColor: "text-[#8c7cc2]",
    title: "TOPIK",
    subtitle: "Korean Proficiency",
    levels: ["TOPIK 1", "TOPIK 2", "TOPIK 3", "TOPIK 4", "TOPIK 5", "TOPIK 6"],
    institution: "National Institute for International Education",
    logoSrc: "/logos/logo-TOPIK-Final.webp",
    logoAlt: "TOPIK logo",
    logoClassName: "object-contain p-4",
  },
];

function LogoBadge({ logoSrc, logoAlt, logoClassName }: Pick<ExamCard, "logoSrc" | "logoAlt" | "logoClassName">) {
  return (
    <div className="flex size-[88px] items-center justify-center rounded-full border border-black/5 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.02]">
      <Image src={logoSrc} alt={logoAlt} width={88} height={88} className={logoClassName} />
    </div>
  );
}

export function ExamPreparation() {
  return (
    <section className="pb-12 pt-8 lg:pb-16 lg:pt-12">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="inline-flex rounded-full bg-[#f6efe3] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#b89249]">
            Certifications
          </span>
          <h2 className="mt-4 font-heading text-[clamp(2.5rem,4.4vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.05em] text-foreground">
            Exam Preparation
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-6 text-[#334155]">
            We prepare you for the world&apos;s most recognised language certifications.
          </p>
        </motion.div>

        <div className="mt-8 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="group relative overflow-hidden rounded-[32px] border border-black/[0.04] bg-white/95 px-6 pb-5 pt-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-[2px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.14)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(29,155,240,0.05),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.7))]" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className={["text-xs font-semibold uppercase tracking-[0.14em]", card.categoryColor].join(" ")}>
                    {card.category}
                  </p>
                  <h3 className="mt-3 font-heading text-[clamp(1.55rem,2vw,2.05rem)] font-medium tracking-[-0.05em] text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#334155]">{card.subtitle}</p>
                </div>

                <LogoBadge logoSrc={card.logoSrc} logoAlt={card.logoAlt} logoClassName={card.logoClassName} />
              </div>

              <div className="relative mt-5">
                <p className="text-xs uppercase tracking-[0.14em] text-[#334155]">Levels</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {card.levels.map((level) => (
                    <span
                      key={level}
                      className="inline-flex h-7 items-center rounded-full border border-black/8 bg-white px-2.5 text-xs font-medium text-foreground shadow-[0_1px_1px_rgba(15,23,42,0.03)]"
                    >
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-black/5 pt-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="flex size-4 items-center justify-center text-black/55">
                      <span className="block size-2 rounded-full border border-current" />
                    </span>
                    <p className="truncate text-xs text-[#334155]">{card.institution}</p>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-opacity duration-200 hover:opacity-70"
                >
                  Learn More
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
