import Link from "next/link";
import Image from "next/image";
import {
  TOPIC_META,
  readingMinutes,
  type Article,
} from "@/lib/articles/types";

// Real food photos matched to each article by subject. Falls back to a cycling
// pool for any article not in the map (e.g. future DB content).
const IMAGE_BY_SLUG: Record<string, string> = {
  "oxtail-heart-smart": "/images/food/oxtail.jpg", // Caribbean oxtail stew
  "fried-chicken-lighter": "/images/food/friedchicken.jpg", // fried chicken
  "cholesterol-plain-and-simple": "/images/food/salmon.jpg", // omega-3 / good fats
  "blood-pressure-the-quiet-one": "/images/food/move.jpg", // movement = #1 BP tip
  "rice-and-peas-lighter": "/images/food/seafoodrice.jpg", // rice & peas
  "salt-without-losing-flavor": "/images/cooking.jpg", // seasoning / cooking
  "fiber-the-quiet-hero": "/images/food/beans.jpg", // beans = fiber
  "diabetes-and-your-heart": "/images/food/porridge.jpg", // oats steady blood sugar
  "sweet-drinks-and-your-heart": "/images/food/soda.jpg", // sugary drink
  "read-a-food-label": "/images/market.jpg", // groceries / labels
  "greens-that-love-you-back": "/images/food/greens.jpg", // greens
  "move-on-your-terms": "/images/food/move.jpg", // exercise / movement
  "be-your-own-advocate": "/images/hero-block.jpg", // a confident neighbor
};

const FOOD = [
  "/images/food/seafoodrice.jpg",
  "/images/food/greens.jpg",
  "/images/food/oxtail.jpg",
  "/images/food/salmon.jpg",
  "/images/food/porridge.jpg",
  "/images/food/beans.jpg",
];

export function ArticleCard({
  article,
  index = 0,
}: {
  article: Article;
  index?: number;
}) {
  const mins = readingMinutes(article.body);
  return (
    <Link
      href={`/learn/${article.slug}`}
      className="card group block p-0 transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative h-32 overflow-hidden rounded-t-2xl bg-cream">
        <Image
          src={IMAGE_BY_SLUG[article.slug] ?? FOOD[index % FOOD.length]}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover transition duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {article.topic_tags.slice(0, 2).map((t) => (
            <span key={t} className="pill bg-cream text-xs text-muted">
              {TOPIC_META[t].emoji} {TOPIC_META[t].label}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold text-ink group-hover:text-brick-700">
          {article.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{article.excerpt}</p>
        <p className="mt-3 text-xs font-semibold text-muted">
          {mins} min read
        </p>
      </div>
    </Link>
  );
}
