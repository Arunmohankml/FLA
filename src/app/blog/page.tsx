import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BlogAdminEditButton } from "@/components/blog/BlogAdminEditButton";
import { getMergedBlogPosts } from "@/lib/blogStore";

export const revalidate = 60;

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

export default async function BlogPage() {
  const blogPosts = await getMergedBlogPosts();

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
              <article
                key={post.slug}
                className="group relative flex flex-col rounded-[28px] border border-[#B9E2FF]/45 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0c2847]/22 hover:shadow-[0_18px_45px_rgba(29,155,240,0.1)]"
              >
                <BlogAdminEditButton post={post} />
                <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                  <div
                    className="relative overflow-hidden rounded-t-[28px] border-b border-white/10 px-7 pt-10 pb-8"
                    style={{
                      backgroundColor: "#93A0D5",
                      backgroundImage: `linear-gradient(145deg,#93A0D5 0%,#0c2847 100%)`,
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
              </article>
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
