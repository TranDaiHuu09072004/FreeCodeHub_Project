import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://free-code-hub-project.vercel.app";

  return {
    rules: [
      // Allow all search engines
      {
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
        ],
      },

      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },

      {
        userAgent: "Facebot",
        allow: "/",
      },

      {
        userAgent: "ZaloBot",
        allow: "/",
      },

      {
        userAgent: "Twitterbot",
        allow: "/",
      },

      {
        userAgent: "Discordbot",
        allow: "/",
      },

      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
