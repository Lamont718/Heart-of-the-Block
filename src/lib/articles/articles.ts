import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ARTICLES_SEED } from "@/data/articles-seed";
import type { Article } from "./types";

/**
 * Published articles. Reads from the `articles` table (published only) when
 * Supabase is configured and populated; otherwise uses the bundled seed so the
 * Learn section works before the DB / CMS is wired up.
 */
export async function getArticles(): Promise<Article[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("articles")
        .select(
          "id, title, slug, excerpt, body, topic_tags, reading_level, audio_url, published",
        )
        .eq("published", true);
      if (!error && data && data.length > 0) {
        return data as unknown as Article[];
      }
    } catch {
      // fall through to seed
    }
  }
  return ARTICLES_SEED;
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const all = await getArticles();
  return all.find((art) => art.slug === slug) ?? null;
}
