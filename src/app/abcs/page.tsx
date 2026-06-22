import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The ABCs of Life | Heart of the Block",
  description:
    "Three numbers worth knowing for your heart — A1C (blood sugar), Blood pressure, and Cholesterol. Plain-language guideposts, and where to track yours.",
};

type ABC = {
  letter: string;
  name: string;
  what: string;
  rows: { label: string; range: string; tone: "good" | "okay" | "limit" }[];
  note: string;
  track: { href: string; label: string };
  read?: { href: string; label: string };
};

const ABCS: ABC[] = [
  {
    letter: "A",
    name: "A1C — your blood sugar",
    what: "A single number that reflects your average blood sugar over about the last 3 months. One meal won't spike it — it's the long view.",
    rows: [
      { label: "Normal", range: "under 5.7%", tone: "good" },
      { label: "Prediabetes", range: "5.7% – 6.4%", tone: "okay" },
      { label: "Diabetes range", range: "6.5% and up", tone: "limit" },
    ],
    note: "High blood sugar over time quietly damages blood vessels, which is hard on your heart — so knowing this number early matters.",
    track: { href: "/tracker", label: "Track your A1C" },
    read: { href: "/learn/diabetes-and-your-heart", label: "Diabetes & your heart" },
  },
  {
    letter: "B",
    name: "Blood pressure",
    what: "The force of your blood pushing against your artery walls — written as two numbers, like 120/80 (the top when your heart beats, the bottom when it rests).",
    rows: [
      { label: "Normal", range: "under 120 / 80", tone: "good" },
      { label: "Elevated", range: "120–129 / under 80", tone: "okay" },
      { label: "High (stage 1)", range: "130–139 / 80–89", tone: "limit" },
      { label: "High (stage 2)", range: "140+ / 90+", tone: "limit" },
    ],
    note: "It usually has no symptoms — which is exactly why it's worth measuring. The American Heart Association puts the target under 120/80.",
    track: { href: "/tracker", label: "Track your blood pressure" },
    read: { href: "/learn/blood-pressure-the-quiet-one", label: "Blood pressure: the quiet one" },
  },
  {
    letter: "C",
    name: "Cholesterol",
    what: "A few numbers, really: LDL (the “bad” kind that builds up), HDL (the “good” kind that clears it out), and your total.",
    rows: [
      { label: "Total — desirable", range: "under 200", tone: "good" },
      { label: "LDL (“bad”)", range: "lower is better", tone: "okay" },
      { label: "HDL (“good”)", range: "higher is better", tone: "good" },
    ],
    note: "Fiber, better fats (like the omega-3s in salmon), and moving your body all help — see the Learn section for everyday food moves.",
    track: { href: "/tracker", label: "Track your cholesterol" },
    read: { href: "/learn/cholesterol-plain-and-simple", label: "Cholesterol, plain and simple" },
  },
];

const TONE: Record<"good" | "okay" | "limit", string> = {
  good: "bg-teal-100 text-teal",
  okay: "bg-gold-100 text-ink",
  limit: "bg-brick-100 text-brick-700",
};

export default function ABCsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-block">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
            Know your numbers
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            The ABCs of Life
          </h1>
          <p className="mt-3 text-lg text-muted">
            Three numbers worth knowing for your heart — and the good news is
            they’re all things you can get ahead of. Learn what they mean, then
            track yours and bring them to your doctor.
          </p>
        </div>

        {/* Origin credit */}
        <div className="mt-6 rounded-2xl border border-line bg-surface p-5 text-sm text-muted">
          <p>
            <span aria-hidden>🎙️ </span>
            The “ABCs of Life” came straight from the block — a Father’s Day
            conversation on the <em>Your Opinion Doesn’t Matter</em> podcast with
            two Brooklyn neighbors who work in health care: a physical therapist
            and a nurse practitioner. Their message was simple:{" "}
            <strong className="text-ink">
              know your numbers, and get ahead of them.
            </strong>{" "}
            This whole platform grew out of that talk.
          </p>
        </div>

        {/* A / B / C cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {ABCS.map((abc) => (
            <section key={abc.letter} className="card flex flex-col">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brick text-2xl font-extrabold text-white">
                  {abc.letter}
                </span>
                <h2 className="font-display text-xl font-bold text-ink">
                  {abc.name}
                </h2>
              </div>

              <p className="mt-3 text-sm text-muted">{abc.what}</p>

              <ul className="mt-4 space-y-2">
                {abc.rows.map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm font-semibold text-ink">
                      {r.label}
                    </span>
                    <span
                      className={`pill whitespace-nowrap text-xs ${TONE[r.tone]}`}
                    >
                      {r.range}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-muted">{abc.note}</p>

              <div className="mt-auto pt-5">
                <Link href={abc.track.href} className="btn-primary w-full">
                  {abc.track.label}
                </Link>
                {abc.read && (
                  <Link
                    href={abc.read.href}
                    className="mt-2 block text-center text-sm font-semibold text-brick-700 hover:underline"
                  >
                    Read: {abc.read.label} →
                  </Link>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink">
          <p>
            These ranges are <strong>general guideposts</strong> (the kind the
            American Heart Association uses), not a diagnosis. Your numbers belong
            in a conversation with your doctor, who sees your whole picture. In an
            emergency, call <strong>911</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
