import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogAdminEditButton } from "@/components/blog/BlogAdminEditButton";
import { allBlogSlugs } from "@/lib/blogData";
import { getMergedBlogPost } from "@/lib/blogStore";

export const revalidate = 60;

export function generateStaticParams() {
  return allBlogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getMergedBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Foreign Language Academy`,
    description: post.description,
    alternates: { canonical: `https://foreignlanguageacademy.co.in/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Foreign Language Academy`,
      description: post.description,
      url: `https://foreignlanguageacademy.co.in/blog/${slug}`,
      siteName: "Foreign Language Academy",
      locale: "en_IN",
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getMergedBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: "Foreign Language Academy" },
    datePublished: post.date,
    publisher: { "@type": "Organization", name: "Foreign Language Academy" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ── Article header ────────────────────────────────── */}
      <section className="px-6 pt-20 pb-8 lg:px-12 lg:pt-28">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/8 bg-[#F5FAFF] px-4 py-2 text-sm font-medium text-[#334155] transition-all duration-300 hover:border-[#0c2847]/30 hover:text-foreground"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <div className="mb-5">
            <BlogAdminEditButton post={post} compact />
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#0c2847]/8 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-[#0c2847]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-5 font-heading text-4xl font-medium leading-[1.25] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[56px]">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-black/5 pb-8">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-[#0c2847]/10 font-heading text-xs font-semibold text-[#0c2847]">
                FLA
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{post.author}</p>
                <p className="text-xs text-[#334155]">{post.date}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article content ────────────────────────────────── */}
      <article className="px-6 pb-16 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="prose-fl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children, ...props }) => (
                  <h1
                    className="mt-12 mb-5 font-heading text-3xl font-medium leading-[1.3] tracking-[-0.02em] text-foreground sm:text-4xl"
                    {...props}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2
                    className="mt-12 mb-4 font-heading text-2xl font-medium leading-[1.33] tracking-[-0.02em] text-foreground sm:text-3xl"
                    {...props}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3
                    className="mt-8 mb-3 font-heading text-xl font-medium leading-[1.4] tracking-[-0.01em] text-foreground"
                    {...props}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children, ...props }) => (
                  <p
                    className="mb-5 text-base leading-[1.8] text-[#334155]"
                    {...props}
                  >
                    {children}
                  </p>
                ),
                strong: ({ children, ...props }) => (
                  <strong
                    className="font-semibold text-foreground"
                    {...props}
                  >
                    {children}
                  </strong>
                ),
                em: ({ children, ...props }) => (
                  <em
                    className="text-foreground/80"
                    {...props}
                  >
                    {children}
                  </em>
                ),
                ul: ({ children, ...props }) => (
                  <ul
                    className="mb-6 ml-0 space-y-2.5 pl-0"
                    {...props}
                  >
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol
                    className="mb-6 ml-0 space-y-2.5 pl-0 list-decimal list-inside"
                    {...props}
                  >
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li
                    className="flex items-start gap-3 text-base leading-[1.8] text-[#334155]"
                    {...props}
                  >
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#0c2847]" />
                    <span className="flex-1">{children}</span>
                  </li>
                ),
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    className="font-medium text-[#0c2847] underline decoration-[#0c2847]/30 underline-offset-4 transition-colors hover:decoration-[#0c2847]"
                    {...props}
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote
                    className="my-8 rounded-r-[16px] border-l-4 border-[#0c2847]/30 bg-[#F5FAFF] py-6 pl-6 pr-8"
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
                hr: () => (
                  <div className="my-10 flex items-center gap-4">
                    <div className="h-px flex-1 bg-black/5" />
                    <div className="size-1.5 rounded-full bg-[#0c2847]/30" />
                    <div className="h-px flex-1 bg-black/5" />
                  </div>
                ),
                table: ({ children, ...props }) => (
                  <div className="my-8 overflow-x-auto rounded-[16px] border border-black/5">
                    <table
                      className="w-full text-sm"
                      {...props}
                    >
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children, ...props }) => (
                  <thead
                    className="bg-[#F5FAFF]"
                    {...props}
                  >
                    {children}
                  </thead>
                ),
                th: ({ children, ...props }) => (
                  <th
                    className="px-5 py-3 text-left font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#334155]"
                    {...props}
                  >
                    {children}
                  </th>
                ),
                td: ({ children, ...props }) => (
                  <td
                    className="border-t border-black/5 px-5 py-3 text-[#334155]"
                    {...props}
                  >
                    {children}
                  </td>
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code
                        className="rounded-md bg-[#F5FAFF] px-1.5 py-0.5 font-mono text-sm text-[#0c2847]"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code
                      className={className}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre: ({ children, ...props }) => (
                  <pre
                    className="my-6 overflow-x-auto rounded-[16px] bg-[#071D2E] p-6 text-[15px] leading-7 text-white/80"
                    {...props}
                  >
                    {children}
                  </pre>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* ── Author card ─────────────────────────────────── */}
          <div className="mt-16 rounded-[24px] border border-black/5 bg-[#F5FAFF] p-8">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#0c2847]/10 font-heading text-sm font-semibold text-[#0c2847]">
                FLA
              </div>
              <div>
                <p className="font-heading text-base font-medium text-foreground">{post.author}</p>
                <p className="text-sm text-[#334155]">Expert language education since 2010</p>
              </div>
            </div>
          </div>

          {/* ── CTA ─────────────────────────────────────────── */}
          <div className="mt-12 text-center">
            <Link
              href="/courses"
              className="inline-flex h-13 items-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-[#0c2847] hover:shadow-lg hover:shadow-[#0c2847]/20"
            >
              Explore Our Courses →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
