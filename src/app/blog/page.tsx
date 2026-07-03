import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Blog | Foreign Language Academy",
  description:
    "Language learning tips, exam guides, career advice, and cultural insights. Stay updated with the latest from Foreign Language Academy in Chennai.",
  alternates: { canonical: "https://foreignlanguageacademy.in/blog" },
  openGraph: {
    title: "Blog | Foreign Language Academy",
    description:
      "Language learning tips, exam guides, career advice, and cultural insights from Foreign Language Academy in Chennai.",
    url: "https://foreignlanguageacademy.in/blog",
    siteName: "Foreign Language Academy",
    locale: "en_IN",
    type: "website",
  },
};

const decorativePatterns = [
  "from-[#1D9BF0]/8 to-[#1D9BF0]/3",
  "from-[#EAF4FF] to-[#1D9BF0]/5",
  "from-[#1D9BF0]/6 to-[#0C8BDD]/3",
];

export default function BlogPage() {
  return (
    <>
      {/* ── Header ──────────────────────────────────────── */}
      <section className="px-6 pt-20 pb-4 lg:px-12 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
            Blog
          </span>
          <h1
            className="font-heading text-5xl font-medium leading-[1.28] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[72px]"
          >
            Insights &amp; Articles
          </h1>
          <p
            className="mt-5 max-w-xl text-lg leading-[1.6] text-[#334155]"
          >
            Discover language learning tips, student stories, instructor
            interviews, and more.
          </p>
        </div>
      </section>

      {/* ── Blog cards grid ─────────────────────────────── */}
      <section className="px-6 py-12 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-[28px] border border-black/5 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1"
              >
                {/* Decorative header instead of image */}
                <div className={`relative overflow-hidden rounded-t-[28px] bg-gradient-to-br ${decorativePatterns[i % 3]} px-7 pt-10 pb-8`}>
                  {/* Decorative circles */}
                  <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full border border-black/[0.04]" />
                  <div className="pointer-events-none absolute -right-2 -top-2 size-16 rounded-full border border-black/[0.03]" />
                  <div className="pointer-events-none absolute -bottom-4 -left-4 size-20 rounded-full border border-black/[0.03]" />

                  {/* Tag */}
                  {post.tags[0] && (
                    <span className="inline-flex rounded-full bg-white/60 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-foreground/80 backdrop-blur-sm">
                      {post.tags[0]}
                    </span>
                  )}

                  {/* Title on decorative bg */}
                  <h2 className="mt-4 font-heading text-2xl font-medium leading-[1.3] tracking-[-0.02em] text-foreground transition-colors group-hover:text-[#1D9BF0]">
                    {post.title}
                  </h2>
                </div>

                {/* Content area */}
                <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
                  <p className="text-[15px] leading-7 text-[#334155] line-clamp-3">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <div className="h-px bg-black/5" />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-[#334155]">{post.date}</span>
                      <span className="inline-flex h-10 items-center rounded-full border border-black/8 px-5 text-sm font-medium text-foreground transition-all duration-300 group-hover:border-[#1D9BF0]/30 group-hover:bg-[#1D9BF0] group-hover:text-white">
                        View Article
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section ──────────────────────────────────── */}
      <section className="px-6 pb-16 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[32px] bg-[#F5FAFF] px-8 py-16 text-center lg:px-16">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-black/70">
              Stay Updated
            </span>
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-4xl">
              Want to learn more about languages and culture?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-[#334155]">
              Follow us for tips, stories, and updates from the Foreign Language
              Academy community.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex h-13 items-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-[#0C8BDD] hover:shadow-lg hover:shadow-[#1D9BF0]/20"
              >
                Explore Courses →
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-13 items-center rounded-full border border-[#1D9BF0]/30 bg-white px-8 text-sm font-medium text-[#0C8BDD] transition-all duration-300 hover:bg-[#EAF4FF]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
