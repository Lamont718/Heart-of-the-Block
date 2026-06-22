import Link from "next/link";
import {
  TOPIC_META,
  readingMinutes,
  type Article,
} from "@/lib/articles/types";

const GRADIENTS = [
  "from-brick-100 to-gold-100",
  "from-teal-100 to-gold-100",
  "from-gold-100 to-brick-100",
  "from-teal-100 to-brick-100",
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
      <div
        className={`h-28 rounded-t-2xl bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
      />
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
