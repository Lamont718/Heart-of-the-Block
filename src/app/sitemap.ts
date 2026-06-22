import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles/articles";
import { getPlans } from "@/lib/plans/plans";

const BASE = "https://heartoftheblock.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = [
    "",
    "/directory",
    "/healthy-buys",
    "/swaps",
    "/scan",
    "/tracker",
    "/learn",
    "/plans",
    "/community",
    "/disclaimer",
    "/privacy",
    "/login",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const [articles, plans] = await Promise.all([getArticles(), getPlans()]);

  const articleRoutes = articles.map((a) => ({
    url: `${BASE}/learn/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const planRoutes = plans.map((p) => ({
    url: `${BASE}/plans/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...planRoutes];
}
