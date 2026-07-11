import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import {
  getMergedBlogPost,
  saveBlogPostOverride,
  validateBlogPostPayload,
} from "@/lib/blogStore";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const post = await getMergedBlogPost(slug);
    if (!post) return NextResponse.json({ error: "Blog post not found" }, { status: 404 });

    return NextResponse.json(
      { post },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
    );
  } catch (error) {
    console.error("GET /api/blog-posts/[slug] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const admin = await verifyAdminRequest(request);
  if (!admin.ok) {
    return NextResponse.json({ error: admin.error }, { status: admin.status });
  }

  try {
    const { slug } = await context.params;
    const payload = await request.json();
    const validation = validateBlogPostPayload(slug, payload);

    if ("error" in validation) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = await saveBlogPostOverride(slug, validation.post);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");
    revalidatePath("/feed.xml");

    return NextResponse.json({
      success: true,
      post: result.post,
      editedBy: admin.email,
    });
  } catch (error) {
    console.error("PUT /api/blog-posts/[slug] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
