import type { MetadataRoute } from "next";
import { allSlugs as allCourseSlugs } from "@/lib/courseData";
import { blogPosts } from "@/lib/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://foreignlanguageacademy.in";

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
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...coursePages,
    ...blogPages,
  ];
}
