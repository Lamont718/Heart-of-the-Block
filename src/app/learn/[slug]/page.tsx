import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles } from "@/lib/articles/articles";
import { renderMarkdown, toPlainText } from "@/lib/articles/markdown";
import { TOPIC_META, readingMinutes } from "@/lib/articles/types";
import { ReadAloud } from "@/components/articles/read-aloud";
import { ArticleCard } from "@/components/articles/article-card";
import { DisclaimerBanner } from "@/components/disclaimer-banner";

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const html = renderMarkdown(article.body);
  const plain = toPlainText(article.body);
  const mins = readingMinutes(article.body);

  const all = await getArticles();
  const related = all
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.topic_tags.some((t) => article.topic_tags.includes(t)),
    )
    .slice(0, 3);

  return (
    <article className="container-block max-w-2xl py-8 sm:py-10">
      <Link
        href="/learn"
        className="text-sm font-semibold text-brick-700 hover:underline"
      >
        ← All articles
      </Link>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.topic_tags.map((t) => (
          <Link
            key={t}
            href={`/learn?topic=${t}`}
            className="pill bg-cream text-xs text-muted hover:text-brick-700"
          >
            {TOPIC_META[t].emoji} {TOPIC_META[t].label}
          </Link>
        ))}
      </div>

      <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
        <span className="text-sm text-muted">{mins} min read · plain language</span>
        <ReadAloud text={plain} title={article.title} />
      </div>

      <div
        className="article-prose mt-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-10">
        <DisclaimerBanner variant="inline" />
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-extrabold text-ink">
            Keep reading
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
