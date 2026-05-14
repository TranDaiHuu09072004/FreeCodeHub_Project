import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://free-code-hub-project.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/dashboard/",
        "/login",
        "/register",
        "/setting",
        "/forgot-password",
        "/reset-password",
        "/api/",
        "/_next/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
