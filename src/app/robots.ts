import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Personal pages have nothing useful to crawl.
      disallow: ["/account", "/api/"],
    },
    sitemap: "https://heartoftheblock.org/sitemap.xml",
  };
}
