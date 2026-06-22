import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RECIPES, getRecipe } from "@/data/recipes-seed";

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

  return (
    <div className="py-10 sm:py-14">
      <div className="container-block max-w-3xl">
        <Link
          href="/recipes"
          className="text-sm font-semibold text-brick-700 hover:underline"
        >
          ← All recipes
        </Link>

        {/* Hero */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-line shadow-card">
          <div className="relative h-56 sm:h-72">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map((t) => (
              <span key={t} className="pill bg-cream text-xs text-muted">
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {recipe.title}
          </h1>
          <p className="mt-2 text-lg text-muted">{recipe.blurb}</p>
          <p className="mt-3 text-sm font-semibold text-muted">
            ⏱ {recipe.minutes} min · serves {recipe.servings}
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          {/* Ingredients */}
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              Ingredients
            </h2>
            <ul className="mt-3 space-y-2">
              {recipe.ingredients.map((ing) => (
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
            <h2 className="font-display text-xl font-bold text-ink">Steps</h2>
            <ol className="mt-3 space-y-3">
              {recipe.steps.map((step, i) => (
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
            💚 The heart-smart moves
          </h2>
          <ul className="mt-3 space-y-2">
            {recipe.swaps.map((s) => (
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
        <p className="mt-6 font-display text-xl font-bold text-ink">
          {recipe.why}
        </p>

        {recipe.relatedArticleSlug && (
          <Link
            href={`/learn/${recipe.relatedArticleSlug}`}
            className="mt-4 inline-block text-sm font-semibold text-brick-700 hover:underline"
          >
            Read more about it in Learn →
          </Link>
        )}

        <p className="mt-8 rounded-xl bg-cream p-4 text-sm text-muted">
          Cooking guidance, not medical advice. For what’s right for your heart,
          talk with your doctor.
        </p>
      </div>
    </div>
  );
}
