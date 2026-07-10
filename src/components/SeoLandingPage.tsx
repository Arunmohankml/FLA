import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineCheckCircle } from "react-icons/hi";
import { SeoLandingPageContent } from "@/lib/seoLandingContent";
import { languages } from "@/lib/constants";

export function SeoLandingPage({ content }: { content: SeoLandingPageContent }) {
  return (
    <main className="bg-[#F5FAFF]">
      <section className="relative overflow-hidden border-b border-[#B9E2FF]/70 bg-[#EEF7FF]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(29,155,240,0.13),transparent_32%),linear-gradient(180deg,#F4FAFF_0%,#EEF7FF_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:pt-36">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d9bf0]">
              {content.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#0c2847] sm:text-6xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#334155]">
              {content.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book-demo"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0c2847] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#143b65] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d9bf0]"
              >
                {content.primaryCta}
                <HiOutlineArrowRight className="size-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex min-h-12 items-center rounded-full border border-[#0c2847]/20 bg-white px-6 text-sm font-semibold text-[#0c2847] transition-colors hover:bg-[#EAF4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d9bf0]"
              >
                {content.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-[#B9E2FF]/80 bg-white p-6 shadow-[0_20px_70px_rgba(12,40,71,0.08)]">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-[#0c2847]">
              Popular programmes
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {languages.slice(0, 10).map((language) => (
                <Link
                  key={language.slug}
                  href={`/courses/${language.slug}`}
                  className="rounded-lg border border-[#B9E2FF]/70 bg-[#F8FCFF] p-4 transition-colors hover:bg-[#EEF7FF]"
                >
                  <p className="font-heading text-base font-semibold text-[#0c2847]">
                    {language.name}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[#64748b]">
                    {language.levels}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {content.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-lg border border-[#B9E2FF]/70 bg-white p-6 shadow-[0_2px_14px_rgba(12,40,71,0.05)]"
            >
              <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-[#0c2847]">
                {section.title}
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#334155]">{section.body}</p>
              <ul className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-[#334155]">
                    <HiOutlineCheckCircle className="mt-0.5 size-5 shrink-0 text-[#1d9bf0]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <div className="rounded-lg border border-[#B9E2FF]/70 bg-[#EEF7FF] p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-[#0c2847]">
            Search topics this page covers
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {content.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-[#B9E2FF] bg-white px-3 py-1.5 text-xs font-medium text-[#334155]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
