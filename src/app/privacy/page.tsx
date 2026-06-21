import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Heart of the Block handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="container-block max-w-2xl py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink">Privacy</h1>
      <p className="mt-3 text-muted">
        Plain-language summary. A full policy will be published before launch.
      </p>
      <div className="mt-6 space-y-5 text-muted">
        <p>
          <strong className="text-ink">Your health data is yours.</strong> Logs
          you create — numbers, weight, activity, saved scans — are stored
          privately and protected with row-level security, so only your account
          can read them.
        </p>
        <p>
          <strong className="text-ink">We don’t sell your data.</strong> We use
          it to power your trends, streaks, and saved items — nothing else.
        </p>
        <p>
          <strong className="text-ink">You can leave.</strong> You’ll be able to
          export or delete your account and its data.
        </p>
      </div>
    </div>
  );
}
