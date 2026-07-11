import type { MetadataRoute } from "next";
import { allSlugs as allCourseSlugs } from "@/lib/courseData";
import { getMergedBlogPosts } from "@/lib/blogStore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://foreignlanguageacademy.co.in";
  const blogPosts = await getMergedBlogPosts();

  const coursePages = allCourseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/online-language-courses`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/study-abroad-language-courses`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/nursing-it-jobs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.86 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    ...coursePages,
    ...blogPages,
  ];
}
