import { blogPosts, type BlogPost } from "@/lib/blogData";
import { supabaseAdmin } from "@/lib/supabase";

const BLOG_OVERRIDES_KEY = "blog-post-overrides";

type BlogOverrideMap = Record<string, BlogPost>;

function normalizeTags(tags: unknown) {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => String(tag).trim())
      .filter(Boolean)
      .slice(0, 12);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 12);
  }

  return [];
}

function fallbackPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug) || null;
}

function parseOverrides(value: unknown): BlogOverrideMap {
  if (!value) return {};

  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as BlogOverrideMap;
  } catch {
    return {};
  }
}

async function getBlogOverrides(): Promise<BlogOverrideMap> {
  const { data, error } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", BLOG_OVERRIDES_KEY)
    .maybeSingle();

  if (error || !data?.value) return {};
  return parseOverrides(data.value);
}

export async function getMergedBlogPosts() {
  const overrides = await getBlogOverrides();
  return blogPosts.map((post) => ({
    ...post,
    ...overrides[post.slug],
    slug: post.slug,
  }));
}

export async function getMergedBlogPost(slug: string) {
  const base = fallbackPost(slug);
  if (!base) return null;
  const overrides = await getBlogOverrides();
  return {
    ...base,
    ...overrides[slug],
    slug,
  };
}

export function validateBlogPostPayload(slug: string, payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { error: "Blog post data is required" };
  }

  const body = payload as Partial<BlogPost>;
  const base = fallbackPost(slug);
  if (!base) return { error: "Blog post not found" };

  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const content = String(body.content || "").trim();
  const date = String(body.date || "").trim();
  const author = String(body.author || "").trim();
  const image = String(body.image || "").trim();
  const tags = normalizeTags(body.tags);

  if (title.length < 4) return { error: "Title must be at least 4 characters" };
  if (description.length < 20) return { error: "Description must be at least 20 characters" };
  if (content.length < 50) return { error: "Content must be at least 50 characters" };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Date must use YYYY-MM-DD format" };
  if (!author) return { error: "Author is required" };
  if (!image.startsWith("/")) return { error: "Image must be a site path like /bloghero.webp" };

  return {
    post: {
      slug,
      title,
      description,
      content,
      date,
      author,
      image,
      tags: tags.length ? tags : base.tags,
    } satisfies BlogPost,
  };
}

export async function saveBlogPostOverride(slug: string, post: BlogPost) {
  const overrides = await getBlogOverrides();
  const nextOverrides = {
    ...overrides,
    [slug]: post,
  };

  const { error } = await supabaseAdmin
    .from("site_settings")
    .upsert(
      { key: BLOG_OVERRIDES_KEY, value: JSON.stringify(nextOverrides) },
      { onConflict: "key" },
    );

  if (error) {
    if (
      error.message.includes("site_settings") ||
      error.message.toLowerCase().includes("could not find the table")
    ) {
      return {
        error:
          "Blog editor storage is not set up. Run the site_settings SQL from src/app/api/certificates/SETUP.sql in Supabase.",
      };
    }
    return { error: error.message };
  }

  return { post };
}
