import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { getArticles } from "@/lib/articles/articles";
import { TOPIC_META, type TopicTag } from "@/lib/articles/types";
import { ArticleCard } from "@/components/articles/article-card";

export const metadata = pageMeta({
  title: "Learn — your favorites, made to love you back",
  description:
    "Short, plain-language reads on heart health, grounded in the food Brooklyn actually cooks. Cholesterol, blood pressure, salt, sugar, and more.",
  path: "/learn",
});

export const revalidate = 3600;

export default async function LearnPage({
  searchParams,
}: {
  searchParams: { topic?: string };
}) {
  const articles = await getArticles();

  // Topics that actually appear, in TOPIC_META order.
  const present = new Set<TopicTag>();
  articles.forEach((art) => art.topic_tags.forEach((t) => present.add(t)));
  const topics = (Object.keys(TOPIC_META) as TopicTag[]).filter((t) =>
    present.has(t),
  );

  const active =
    searchParams.topic && present.has(searchParams.topic as TopicTag)
      ? (searchParams.topic as TopicTag)
      : null;

  const shown = active
    ? articles.filter((a) => a.topic_tags.includes(active))
    : articles;

  return (
    <div className="container-block py-8 sm:py-10">
      <header className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
          Learn
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Your favorites, made to love you back
        </h1>
        <p className="mt-2 text-muted">
          Short, real reads — the food you actually cook, done heart-smart. Tap
          the speaker on any article to have it read to you.
        </p>
      </header>

      {/* Topic filter (linkable) */}
      <nav aria-label="Topics" className="mt-6 flex flex-wrap gap-2">
        <TopicChip href="/learn" label="All topics" active={!active} />
        {topics.map((t) => (
          <TopicChip
            key={t}
            href={`/learn?topic=${t}`}
            label={`${TOPIC_META[t].emoji} ${TOPIC_META[t].label}`}
            active={active === t}
          />
        ))}
      </nav>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((article, i) => (
          <ArticleCard key={article.id} article={article} index={i} />
        ))}
      </div>
    </div>
  );
}

function TopicChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`pill border transition ${
        active
          ? "border-brick bg-brick text-white"
          : "border-line bg-surface text-ink hover:bg-cream"
      }`}
    >
      {label}
    </Link>
  );
}
