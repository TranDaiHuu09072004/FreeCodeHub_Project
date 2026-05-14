import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://free-code-hub-project.vercel.app";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const coursesRes = await fetch(`${apiUrl}/courses`, {
    next: { revalidate: 3600 },
  })
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => []);

  const blogsRes = await fetch(`${apiUrl}/blogs`, {
    next: { revalidate: 3600 },
  })
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => []);

  const staticPages = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: "daily" },
    { url: `${baseUrl}/courses`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/blog`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/about-us`, priority: 0.7, changeFrequency: "monthly" },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency as "daily" | "weekly" | "monthly",
  }));

  const coursePages = coursesRes.map((course: any) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(course.updatedAt || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogsRes.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const lessonPages = coursesRes.map((course: any) => ({
    url: `${baseUrl}/lesson/${course.slug}`,
    lastModified: new Date(course.updatedAt || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...coursePages, ...blogPages, ...lessonPages];
}
