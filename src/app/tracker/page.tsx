import { pageMeta } from "@/lib/seo";
import { getUser } from "@/lib/supabase/auth";
import { TrackerApp } from "@/components/tracker/tracker-app";
import { METRIC_META, type Metric } from "@/lib/tracker/types";

export const metadata = pageMeta({
  title: "Numbers Tracker — your heart numbers over time",
  description:
    "Log your weight, blood pressure, and cholesterol and see simple trends over time. Private, low-burden, and always pointed back to your doctor.",
  path: "/tracker",
});

export default async function TrackerPage({
  searchParams,
}: {
  searchParams: { metric?: string };
}) {
  const user = await getUser();
  const requested = searchParams.metric;
  const initialMetric: Metric | undefined =
    requested && requested in METRIC_META ? (requested as Metric) : undefined;

  return (
    <div className="container-block py-8 sm:py-10">
      <header className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
          Numbers Tracker
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Know your numbers
        </h1>
        <p className="mt-2 text-muted">
          Keep an eye on your weight, blood pressure, and cholesterol over time.
          A few seconds to log, and you’ll see your trend — something real to
          bring to your next doctor’s visit.
        </p>
      </header>

      <div className="mt-6">
        <TrackerApp signedIn={!!user} initialMetric={initialMetric} />
      </div>
    </div>
  );
}
