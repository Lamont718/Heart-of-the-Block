import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { HeartRiskCheck } from "@/components/heart-risk/heart-risk-check";

export const metadata = pageMeta({
  title: "Heart-risk check — know where you stand",
  description:
    "A quick, private check-in on the things that matter most for your heart — blood pressure, cholesterol, blood sugar, and a few habits. Plain-language, never a diagnosis, always pointed back to your doctor.",
  path: "/heart-risk",
});

export default function HeartRiskPage() {
  return (
    <div className="container-block py-8 sm:py-10">
      <header className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
          Heart-risk check
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Where does your heart stand?
        </h1>
        <p className="mt-2 text-muted">
          Answer what you know — even just a couple — and we&apos;ll give you a
          clear, plain-language picture of where you stand and what&apos;s worth
          bringing to your doctor. No score, no scare. Just the few things that
          matter most, and what you can do next.
        </p>
        <p className="mt-3 text-sm text-muted">
          New to these numbers? Start with{" "}
          <Link
            href="/abcs"
            className="font-semibold text-brick-700 hover:underline"
          >
            the ABCs of Life
          </Link>
          .
        </p>
      </header>

      <div className="mt-6">
        <HeartRiskCheck />
      </div>
    </div>
  );
}
