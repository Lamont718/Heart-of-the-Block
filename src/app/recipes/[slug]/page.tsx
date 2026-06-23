import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RECIPES, getRecipe } from "@/data/recipes-seed";
import { getLocale } from "@/i18n/server";
import { RECIPES_CHROME, RECIPES_TR } from "@/i18n/content/recipes";

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const recipe = getRecipe(params.slug);
  if (!recipe) return { title: "Recipe not found | Heart of the Block" };
  return {
    title: `${recipe.title} | Heart of the Block`,
    description: recipe.blurb,
  };
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipe(params.slug);
  if (!recipe) notFound();

  const locale = getLocale();
  const c = RECIPES_CHROME[locale];
  const t = locale === "en" ? null : RECIPES_TR[locale]?.[recipe.slug];

  const title = t?.title ?? recipe.title;
  const blurb = t?.blurb ?? recipe.blurb;
  const tags = t?.tags ?? recipe.tags;
  const ingredients = t?.ingredients ?? recipe.ingredients;
  const steps = t?.steps ?? recipe.steps;
  const swaps = t?.swaps ?? recipe.swaps;
  const why = t?.why ?? recipe.why;

  return (
    <div className="py-10 sm:py-14">
      <div className="container-block max-w-3xl">
        <Link
          href="/recipes"
          className="text-sm font-semibold text-brick-700 hover:underline"
        >
          {c.allRecipes}
        </Link>

        {/* Hero */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-line shadow-card">
          <div className="relative h-56 sm:h-72">
            <Image
              src={recipe.image}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="pill bg-cream text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-lg text-muted">{blurb}</p>
          <p className="mt-3 text-sm font-semibold text-muted">
            {c.metaTemplate
              .replace("{min}", String(recipe.minutes))
              .replace("{serves}", String(recipe.servings))}
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          {/* Ingredients */}
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              {c.ingredients}
            </h2>
            <ul className="mt-3 space-y-2">
              {ingredients.map((ing) => (
                <li key={ing} className="flex gap-2 text-ink">
                  <span aria-hidden className="text-brick">
                    •
                  </span>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h2 className="font-display text-xl font-bold text-ink">{c.steps}</h2>
            <ol className="mt-3 space-y-3">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brick-100 text-sm font-bold text-brick-700">
                    {i + 1}
                  </span>
                  <span className="text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Heart-smart swaps */}
        <div className="mt-8 rounded-2xl border border-teal/30 bg-teal-100 p-5">
          <h2 className="font-display text-lg font-bold text-ink">
            {c.heartSmartMoves}
          </h2>
          <ul className="mt-3 space-y-2">
            {swaps.map((s) => (
              <li key={s} className="flex gap-2 text-ink">
                <span aria-hidden className="text-teal">
                  ✓
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why */}
        <p className="mt-6 font-display text-xl font-bold text-ink">{why}</p>

        {recipe.relatedArticleSlug && (
          <Link
            href={`/learn/${recipe.relatedArticleSlug}`}
            className="mt-4 inline-block text-sm font-semibold text-brick-700 hover:underline"
          >
            {c.readMore}
          </Link>
        )}

        <p className="mt-8 rounded-xl bg-cream p-4 text-sm text-muted">
          {c.detailDisclaimer}
        </p>
      </div>
    </div>
  );
}
