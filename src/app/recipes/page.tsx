import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RECIPES } from "@/data/recipes-seed";

export const metadata: Metadata = {
  title: "Heart-smart recipes | Heart of the Block",
  description:
    "The food Brooklyn actually cooks — oxtail, fried chicken, rice and peas — made a little kinder to your heart. Real recipes with the swaps built in.",
};

export default function RecipesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-block">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
            Cook it
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Heart-smart recipes
          </h1>
          <p className="mt-3 text-lg text-muted">
            The food we actually cook — just a little kinder to your heart. Same
            flavor, with the swaps built right in.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RECIPES.map((r) => (
            <Link
              key={r.id}
              href={`/recipes/${r.slug}`}
              className="card group block p-0 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="relative h-40 overflow-hidden rounded-t-2xl bg-cream">
                <Image
                  src={r.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover transition duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {r.tags.slice(0, 2).map((t) => (
                    <span key={t} className="pill bg-cream text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-lg font-bold text-ink group-hover:text-brick-700">
                  {r.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{r.blurb}</p>
                <p className="mt-3 text-xs font-semibold text-muted">
                  ⏱ {r.minutes} min · serves {r.servings}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Cooking guidance, not medical advice. Your doctor can help with what’s
          right for you.
        </p>
      </div>
    </div>
  );
}
