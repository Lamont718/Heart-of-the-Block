import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getUser } from "@/lib/supabase/auth";
import { DisclaimerBanner } from "@/components/disclaimer-banner";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "My account",
};

export default async function AccountPage() {
  const user = await getUser();
  if (!user) redirect("/login?next=/account");

  // Profile row is created automatically by a DB trigger on signup.
  let displayName: string | null = null;
  let neighborhood: string | null = null;
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("display_name, neighborhood")
      .eq("id", user.id)
      .single();
    displayName = data?.display_name ?? null;
    neighborhood = data?.neighborhood ?? null;
  }

  const greeting =
    displayName || (user.email ? user.email.split("@")[0] : "neighbor");

  return (
    <div className="container-block py-10">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brick-700">
          Your block
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink">
          Welcome, {greeting}
        </h1>
        <p className="mt-2 text-muted">
          This is your home base. Your numbers now follow you here — log them on
          your phone, see them on your computer.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <section className="card">
          <h2 className="font-display text-lg font-bold text-ink">Profile</h2>
          <p className="mt-1 text-sm text-muted">
            Tell us what to call you and where you’re repping.
          </p>
          <ProfileForm
            email={user.email ?? "—"}
            displayName={displayName ?? ""}
            neighborhood={neighborhood ?? ""}
          />
        </section>

        <section className="card flex flex-col">
          <h2 className="font-display text-lg font-bold text-ink">
            Saved to your account
          </h2>
          <Link
            href="/tracker"
            className="mt-4 flex items-center gap-3 rounded-xl border border-teal/30 bg-teal-100 p-3 transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span aria-hidden className="text-2xl">
              📈
            </span>
            <span>
              <span className="block font-display font-bold text-ink">
                Your numbers — synced
              </span>
              <span className="block text-sm text-muted">
                A1C, blood pressure, cholesterol & weight, on every device →
              </span>
            </span>
          </Link>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Link
              href="/scan"
              className="rounded-xl border border-line bg-cream px-3 py-2 text-sm font-semibold text-ink transition hover:border-brick/40"
            >
              📷 Saved scans →
            </Link>
            <Link
              href="/swaps"
              className="rounded-xl border border-line bg-cream px-3 py-2 text-sm font-semibold text-ink transition hover:border-brick/40"
            >
              ♥ Favorite swaps →
            </Link>
            <Link
              href="/plans"
              className="rounded-xl border border-line bg-cream px-3 py-2 text-sm font-semibold text-ink transition hover:border-brick/40"
            >
              🍽️ Plan progress →
            </Link>
            <Link
              href="/community"
              className="rounded-xl border border-line bg-cream px-3 py-2 text-sm font-semibold text-ink transition hover:border-brick/40"
            >
              🔥 Streaks & challenges →
            </Link>
            <Link
              href="/community"
              className="rounded-xl border border-line bg-cream px-3 py-2 text-sm font-semibold text-ink transition hover:border-brick/40 sm:col-span-2"
            >
              🏆 Block leaderboard (opt-in) →
            </Link>
          </div>

          <form action="/auth/signout" method="post" className="mt-auto pt-6">
            <button type="submit" className="btn-secondary w-full">
              Sign out
            </button>
          </form>
        </section>
      </div>

      <div className="mt-8">
        <DisclaimerBanner variant="inline" />
      </div>
    </div>
  );
}
