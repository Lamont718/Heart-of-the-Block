/** Educational content types. Mirrors the `articles` table (CONTEXT). */

export interface Article {
  id: string;
  title: string;
  slug: string;
  /** One-line hook shown on cards. */
  excerpt: string;
  /** Markdown body. */
  body: string;
  topic_tags: TopicTag[];
  reading_level: "easy";
  audio_url?: string | null;
  published: boolean;
}

export type TopicTag =
  | "heart-basics"
  | "cholesterol"
  | "blood-pressure"
  | "sodium"
  | "sugar"
  | "fiber"
  | "fats"
  | "cooking"
  | "movement"
  | "caribbean"
  | "soul-food"
  | "advocacy";

export const TOPIC_META: Record<TopicTag, { label: string; emoji: string }> = {
  "heart-basics": { label: "Heart basics", emoji: "❤️" },
  cholesterol: { label: "Cholesterol", emoji: "🩸" },
  "blood-pressure": { label: "Blood pressure", emoji: "🫀" },
  sodium: { label: "Salt & sodium", emoji: "🧂" },
  sugar: { label: "Sugar", emoji: "🍬" },
  fiber: { label: "Fiber", emoji: "🌾" },
  fats: { label: "Fats", emoji: "🥑" },
  cooking: { label: "Cooking", emoji: "🍳" },
  movement: { label: "Moving more", emoji: "👟" },
  caribbean: { label: "Caribbean", emoji: "🌴" },
  "soul-food": { label: "Soul food", emoji: "🍗" },
  advocacy: { label: "Speak up", emoji: "🗣️" },
};

/** Rough reading time from the markdown body (~200 wpm). */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
