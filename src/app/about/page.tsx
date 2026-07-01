import Link from "next/link";
import { mediaFallbacks } from "@/lib/constants";
import { ApproachSection, TrainersSection } from "@/components/AboutSections";

export const metadata = {
  title: "About | Foreign Language Academy",
  description:
    "Excel in language learning since 2007. Expert courses in German, French, Spanish, Japanese, Chinese, English, Russian, Korean & Italian in Chennai.",
};

const certImages = [
  "/certs/cert1.png",
  "/certs/cert2.png",
  "/certs/cert3.png",
  "/certs/cert4.png",
  "/certs/cert5.png",
  "/certs/cert6.png",
  "/certs/cert7.webp",
  "/certs/cert8.png",
  "/certs/cert9.svg",
  "/certs/cert10.png",
  "/certs/cert11.webp",
];

function CertificationsMarquee() {
  const rowOne = certImages;
  const rowTwo = [...certImages].reverse();

  return (
    <section className="bg-background pb-14 pt-4 lg:pb-20 lg:pt-6">
      <div className="page-shell">
        <div className="mb-8 max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#faf5f0] px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
            <span className="size-1.5 rounded-full bg-[#e8734a]" />
            Recognition
          </span>

          <h2 className="font-heading text-3xl font-medium leading-[1.18] tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
            Our Certifications &
            <br />
            Partnerships
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Trusted certification-focused training, academic guidance, and
            globally relevant language preparation for students planning their
            next step.
          </p>
        </div>

        <div className="relative overflow-hidden py-3">
          {/* left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-background via-background/90 to-transparent sm:w-32 lg:w-44" />

          {/* right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-background via-background/90 to-transparent sm:w-32 lg:w-44" />

          <div className="space-y-4">
            <div className="cert-marquee cert-marquee-left">
              {[...rowOne, ...rowOne].map((src, index) => (
                <div key={`cert-row-one-${index}`} className="cert-logo">
                  <img
                    src={src}
                    alt={`Certification partner ${(index % certImages.length) + 1}`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="cert-marquee cert-marquee-right">
              {[...rowTwo, ...rowTwo].map((src, index) => (
                <div
                  key={`cert-row-two-${index}`}
                  className="cert-logo cert-logo-soft"
                >
                  <img
                    src={src}
                    alt={`Academy recognition ${(index % certImages.length) + 1}`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cert-marquee {
          display: flex;
          width: max-content;
          gap: 20px;
          will-change: transform;
        }

        .cert-marquee-left {
          animation: certMarqueeLeft 34s linear infinite;
        }

        .cert-marquee-right {
          animation: certMarqueeRight 40s linear infinite;
        }

        .cert-marquee:hover {
          animation-play-state: paused;
        }

        .cert-logo {
          width: 190px;
          height: 104px;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: rgba(255, 255, 255, 0.82);
          padding: 20px;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.04);
          transition:
            transform 0.35s ease,
            opacity 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .cert-logo-soft {
          width: 174px;
          height: 94px;
          opacity: 0.78;
        }

        .cert-logo:hover {
          transform: translateY(-3px) scale(1.03);
          opacity: 1;
          border-color: rgba(0, 0, 0, 0.1);
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.075);
        }

        @keyframes certMarqueeLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes certMarqueeRight {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        @media (max-width: 640px) {
          .cert-marquee {
            gap: 14px;
          }

          .cert-logo {
            width: 150px;
            height: 84px;
            border-radius: 18px;
            padding: 14px;
          }

          .cert-logo-soft {
            width: 140px;
            height: 76px;
          }
        }
      `}</style>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <div className="page-shell pt-24 lg:pt-32">
          <div className="overflow-hidden rounded-[32px]">
            <img
              src={mediaFallbacks["about-hero"]}
              alt="FLA Campus"
              className="aspect-[16/7] w-full object-cover lg:aspect-[23/8]"
            />
          </div>
        </div>

        <div className="pb-10 pt-8 lg:pb-12 lg:pt-12">
          <div className="page-shell grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#faf5f0] px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
                <span className="size-1.5 rounded-full bg-[#e8734a]" />
                About Us
              </span>

              <h1 className="font-heading text-5xl font-medium leading-[1.28] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[64px]">
                Excellence in
                <br />
                language learning
                <br />
                <span className="text-muted-foreground">since 2007</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-muted-foreground">
                Founded in 2007, we are now one of the largest and best-known
                language schools in India and Germany. We offer over 100
                courses yearly in 10+ languages with branches in Bangalore,
                Chennai, Pune, Delhi, Berlin, Australia, New Zealand, and
                Canada.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/courses"
                  className="inline-flex h-14 items-center rounded-full bg-foreground px-8 text-base font-semibold text-background transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Our Courses →
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center rounded-full border border-black/10 px-8 text-base font-medium text-foreground transition-all duration-300 hover:bg-black/5"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-black/8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <img
                src="/aboutimage.png"
                alt="Students learning at Foreign Language Academy"
                className="aspect-[4/5] w-full object-cover lg:aspect-[1/1]"
              />
            </div>
          </div>
        </div>
      </section>

      <CertificationsMarquee />

      <ApproachSection />
      <TrainersSection />

      <section className="relative overflow-hidden bg-[#1a1a1a] py-16">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-[#e8734a]/5 blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-[#e8734a]/5 blur-[100px]" />

        <div className="relative page-shell max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e8734a]/10 bg-[#e8734a]/5 px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8734a]/50">
            Get Started
          </span>

          <h2 className="font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-white sm:text-5xl">
            Ready to speak your first
            <br />
            sentence in a new language?
          </h2>

          <p className="mx-auto mt-4 max-w-md text-lg text-white/50">
            Book a free demo. No payment required. No obligation.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex h-14 items-center rounded-full bg-white px-8 text-base font-semibold text-[#1a1a1a] transition-all duration-300 hover:scale-105 hover:bg-white/90"
            >
              Book Free Demo →
            </Link>

            <Link
              href="/courses"
              className="inline-flex h-14 items-center rounded-full border border-white/15 bg-white/5 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}