import type { MetadataRoute } from "next";
import { allSlugs as allCourseSlugs } from "@/lib/courseData";
import { getMergedBlogPosts } from "@/lib/blogStore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://foreignlanguageacademy.co.in";
  const blogPosts = await getMergedBlogPosts();
  const now = new Date();

  const publicPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/online-language-courses`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/study-abroad-language-courses`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/nursing-it-jobs`, lastModified: now, changeFrequency: "monthly", priority: 0.86 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/book-demo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const coursePages = allCourseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...publicPages, ...coursePages, ...blogPages];
}
