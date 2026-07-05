import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

      {/* ── Hero image ──────────────────────────────────── */}
      <section className="px-6 pb-4 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="blue-card relative aspect-[16/7] overflow-hidden rounded-[48px] sm:aspect-[21/7] lg:aspect-[24/7] lg:rounded-[64px]">
            <Image
              src="/bloghero.webp"
              alt="FLA Blog"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Blog cards grid ─────────────────────────────── */}
      <section className="px-6 py-12 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-[28px] border border-[#B9E2FF]/45 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0c2847]/22 hover:shadow-[0_18px_45px_rgba(29,155,240,0.1)]"
              >
                {/* Header with purple gradient triangle pattern */}
                <div
                  className="relative overflow-hidden rounded-t-[28px] border-b border-white/10 px-7 pt-10 pb-8"
                  style={{
                    backgroundColor: "#93A0D5",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(178,768,391)'%3E%3Cstop offset='0' stop-color='%2393A0D5'/%3E%3Cstop offset='1' stop-color='%23041451'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='449' height='374.2' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.08'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
                    backgroundSize: "cover",
                  }}
                >
                  {/* Tag */}
                  {post.tags[0] && (
                    <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-white/75 backdrop-blur-sm">
                      {post.tags[0]}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="mt-4 font-heading text-2xl font-medium leading-[1.3] tracking-[-0.02em] text-white transition-colors group-hover:text-white/90">
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
                      <span className="inline-flex h-10 items-center rounded-full border border-black/8 px-5 text-sm font-medium text-foreground transition-all duration-300 group-hover:border-[#0c2847]/30 group-hover:bg-[#0c2847] group-hover:text-white">
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
          <div className="blue-dark-panel blue-grid-bg overflow-hidden rounded-[32px] px-8 py-16 text-center lg:px-16">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              Stay Updated
            </span>
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-medium leading-[1.33] tracking-[-0.02em] text-white sm:text-4xl">
              Want to learn more about languages and culture?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/72">
              Follow us for tips, stories, and updates from the Foreign Language
              Academy community.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex h-13 items-center rounded-full bg-white px-8 text-sm font-semibold text-[#0c2847] transition-all duration-300 hover:scale-105 hover:bg-white/90"
              >
                Explore Courses →
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-13 items-center rounded-full border border-white/18 bg-white/10 px-8 text-sm font-medium text-white transition-all duration-300 hover:bg-white/16"
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
