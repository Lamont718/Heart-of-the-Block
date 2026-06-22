import type { Metadata } from "next";
import { getUser } from "@/lib/supabase/auth";
import { TrackerApp } from "@/components/tracker/tracker-app";

export const metadata: Metadata = {
  title: "Numbers Tracker — your heart numbers over time",
  description:
    "Log your weight, blood pressure, and cholesterol and see simple trends over time. Private, low-burden, and always pointed back to your doctor.",
};

export default async function TrackerPage() {
  const user = await getUser();

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
        <TrackerApp signedIn={!!user} />
      </div>
    </div>
  );
}
