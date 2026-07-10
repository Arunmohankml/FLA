import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineMail } from "react-icons/hi";
import { LegalPageContent } from "@/lib/legalContent";
import { site } from "@/lib/constants";

export function LegalDocumentPage({ content }: { content: LegalPageContent }) {
  return (
    <main className="bg-[#F5FAFF]">
      <section className="relative overflow-hidden border-b border-[#B9E2FF]/70 bg-[#EEF7FF]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(29,155,240,0.13),transparent_32%),linear-gradient(180deg,#F4FAFF_0%,#EEF7FF_100%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-12">
          <Link
            href="/"
            className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0c2847] transition-colors hover:text-[#1d9bf0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d9bf0]"
          >
            <HiOutlineArrowLeft className="size-4" />
            Back to home
          </Link>

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d9bf0]">
              {content.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-[-0.03em] text-[#0c2847] sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#334155]">
              {content.description}
            </p>
            <p className="mt-6 text-sm font-medium text-[#475569]">
              Last updated: {content.updated}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[260px_1fr] lg:px-12">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border-l-2 border-[#B9E2FF] pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              On this page
            </p>
            <nav aria-label={`${content.eyebrow} sections`} className="mt-4 space-y-3">
              {content.sections.map((section) => (
                <a
                  key={section.title}
                  href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="block text-sm font-medium leading-5 text-[#334155] transition-colors hover:text-[#0c2847] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d9bf0]"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="space-y-7">
          {content.sections.map((section) => (
            <article
              key={section.title}
              id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="scroll-mt-28 rounded-lg border border-[#B9E2FF]/70 bg-white p-6 shadow-[0_2px_14px_rgba(12,40,71,0.05)] sm:p-8"
            >
              <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-[#0c2847]">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#334155]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}

          <div className="rounded-lg border border-[#B9E2FF]/70 bg-[#EEF7FF] p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-[#0c2847]">
              Need help with this page?
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#334155]">
              Contact {site.name} for questions about privacy, terms, course records, certificates,
              or website use.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#0c2847] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#143b65] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d9bf0]"
            >
              <HiOutlineMail className="size-4" />
              Email us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
