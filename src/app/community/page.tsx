import { pageMeta } from "@/lib/seo";
import { getUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { CommunityHub } from "@/components/community/community-hub";

export const metadata = pageMeta({
  title: "Your block — check in, keep your streak, take on a challenge",
  description:
    "The part that makes it stick: daily check-ins, streaks, small challenges, and your progress from across the app, all in one place.",
  path: "/community",
});

export default async function CommunityPage() {
  const user = await getUser();

  // Name + neighborhood feed the leaderboard's display (chosen, non-health).
  let displayName = "";
  let neighborhood = "";
  if (user && isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("display_name, neighborhood")
      .eq("id", user.id)
      .single();
    displayName = data?.display_name ?? "";
    neighborhood = data?.neighborhood ?? "";
  }

  return (
    <div className="container-block py-8 sm:py-10">
      <header className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
          Your block
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Better together, one day at a time
        </h1>
        <p className="mt-2 text-muted">
          Check in, keep your streak alive, and take on a challenge. Small steps,
          every day — that’s what makes it stick.
        </p>
      </header>

      <div className="mt-6">
        <CommunityHub
          signedIn={!!user}
          userId={user?.id ?? null}
          displayName={displayName}
          neighborhood={neighborhood}
        />
      </div>
    </div>
  );
}
