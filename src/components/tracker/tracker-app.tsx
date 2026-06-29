"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  METRIC_META,
  type Metric,
  type Reading,
  type WeightGoal,
} from "@/lib/tracker/types";
import {
  loadReadings,
  loadWeightGoal,
  migrateLocalToAccount,
  removeReading,
  removeWeightGoal,
  saveReading,
  saveWeightGoal,
} from "@/lib/tracker/data";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { TrendChart, type Series } from "./trend-chart";

type ReadingInput = Omit<Reading, "id" | "createdAt">;

const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export function TrackerApp({
  signedIn,
  initialMetric = "a1c",
}: {
  signedIn: boolean;
  initialMetric?: Metric;
}) {
  // Synced to the account when signed in (and Supabase is wired up); otherwise
  // local-first on this device.
  const remote = signedIn && isSupabaseConfigured;
  const [metric, setMetric] = useState<Metric>(initialMetric);
  const [loading, setLoading] = useState(true);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [goal, setGoal] = useState<WeightGoal | null>(null);
  const [error, setError] = useState("");
  const migrated = useRef(false);

  const refresh = useCallback(
    async (m: Metric) => {
      const [rs, g] = await Promise.all([
        loadReadings(m, remote),
        loadWeightGoal(remote),
      ]);
      setReadings(rs);
      setGoal(g);
    },
    [remote],
  );

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        // On first signed-in load, lift any locally-tracked numbers into the
        // account (safe no-op if the account already has data).
        if (remote && !migrated.current) {
          migrated.current = true;
          await migrateLocalToAccount();
        }
        await refresh(metric);
      } catch {
        if (active)
          setError(
            "We couldn’t load your numbers just now. Check your connection and try again.",
          );
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [metric, remote, refresh]);

  async function handleAdd(input: ReadingInput): Promise<boolean> {
    setError("");
    try {
      await saveReading(input, remote);
      await refresh(metric);
      return true;
    } catch {
      setError("We couldn’t save that just now. Check your connection and try again.");
      return false;
    }
  }

  async function handleDelete(id: string) {
    setError("");
    try {
      await removeReading(id, remote);
      await refresh(metric);
    } catch {
      setError("We couldn’t delete that just now. Try again in a moment.");
    }
  }

  async function handleSetGoal(g: WeightGoal) {
    setError("");
    try {
      await saveWeightGoal(g, remote);
      await refresh(metric);
    } catch {
      setError("We couldn’t save your goal just now. Try again in a moment.");
    }
  }

  async function handleClearGoal() {
    setError("");
    try {
      await removeWeightGoal(remote);
      await refresh(metric);
    } catch {
      setError("We couldn’t update your goal just now. Try again in a moment.");
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div
        className="grid grid-cols-2 gap-1 rounded-xl bg-cream p-1 sm:grid-cols-4"
        role="tablist"
        aria-label="Choose what to track"
      >
        {(Object.keys(METRIC_META) as Metric[]).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={metric === m}
            onClick={() => setMetric(m)}
            className={`min-h-[44px] rounded-lg px-2 text-sm font-semibold transition ${
              metric === m
                ? "bg-surface text-ink shadow-card"
                : "text-muted hover:text-ink"
            }`}
          >
            <span aria-hidden>{METRIC_META[m].emoji} </span>
            {METRIC_META[m].short}
          </button>
        ))}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-brick/30 bg-brick-100 p-3 text-sm font-semibold text-brick-700"
        >
          {error}
        </p>
      )}

      {loading ? (
        <div className="card mt-5 text-muted">
          {remote ? "Loading your account…" : "Loading your numbers…"}
        </div>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Left: log form + (weight) goal */}
          <div className="space-y-5">
            <LogForm metric={metric} onAdd={handleAdd} />
            {metric === "weight" && (
              <WeightGoalCard
                goal={goal}
                readings={readings}
                onSetGoal={handleSetGoal}
                onClearGoal={handleClearGoal}
              />
            )}
          </div>

          {/* Right: trend + history */}
          <div className="space-y-5">
            <TrendCard metric={metric} readings={readings} />
            <HistoryCard
              metric={metric}
              readings={readings}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}

      {/* Local-first / sync note */}
      <p className="mt-6 rounded-xl bg-cream p-4 text-sm text-muted">
        {signedIn ? (
          <>Your numbers are saved to your account.</>
        ) : (
          <>
            🔒 Your numbers are saved <strong>on this device only</strong> and
            stay private. When accounts go live you’ll be able to back them up
            and sync across your phone and computer.
          </>
        )}
      </p>

      <SafetyNote metric={metric} />
    </div>
  );
}

/* ----------------------------- Log form ----------------------------- */

function LogForm({
  metric,
  onAdd,
}: {
  metric: Metric;
  onAdd: (input: ReadingInput) => Promise<boolean>;
}) {
  const [date, setDate] = useState(todayISO());
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [unit, setUnit] = useState("lb");
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  // Reset fields when switching metric.
  useEffect(() => {
    setA("");
    setB("");
    setC("");
    setErr("");
    setDate(todayISO());
  }, [metric]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const num = (v: string) => (v.trim() === "" ? NaN : Number(v));

    let input: ReadingInput;
    if (metric === "a1c") {
      const value = num(a);
      if (!(value > 0)) return setErr("Enter your A1C number.");
      if (value > 25)
        return setErr("That looks high for an A1C — it's usually a number like 5.6.");
      input = { metric, date, values: { value } };
    } else if (metric === "weight") {
      const value = num(a);
      if (!(value > 0)) return setErr("Enter a weight.");
      input = { metric, date, values: { value }, unit };
    } else if (metric === "bp") {
      const systolic = num(a);
      const diastolic = num(b);
      if (!(systolic > 0) || !(diastolic > 0))
        return setErr("Enter both top and bottom numbers.");
      input = { metric, date, values: { systolic, diastolic } };
    } else {
      const total = num(a);
      const ldl = num(b);
      const hdl = num(c);
      if (!(total > 0)) return setErr("Enter at least your total cholesterol.");
      const values: Record<string, number> = { total };
      if (ldl > 0) values.ldl = ldl;
      if (hdl > 0) values.hdl = hdl;
      input = { metric, date, values };
    }

    setSaving(true);
    const ok = await onAdd(input);
    setSaving(false);
    if (ok) {
      setA("");
      setB("");
      setC("");
    }
  }

  return (
    <form onSubmit={submit} className="card space-y-4">
      <h2 className="font-display text-lg font-bold text-ink">
        Log {METRIC_META[metric].label.toLowerCase()}
      </h2>

      {metric === "a1c" && (
        <div>
          <label htmlFor="a1c" className="label">
            A1C (%)
          </label>
          <input
            id="a1c"
            inputMode="decimal"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="field"
            placeholder="e.g. 5.6"
          />
          <p className="mt-1.5 text-xs text-muted">
            Your A1C is the “A” in the ABCs of Life — your average blood sugar
            over about 3 months. It’s the number from your blood test, like 5.6.
          </p>
        </div>
      )}

      {metric === "weight" && (
        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="w" className="label">
              Weight
            </label>
            <input
              id="w"
              inputMode="decimal"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="field"
              placeholder="e.g. 180"
            />
          </div>
          <div>
            <label htmlFor="unit" className="label">
              Unit
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="field"
            >
              <option value="lb">lb</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>
      )}

      {metric === "bp" && (
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label htmlFor="sys" className="label">
              Top (systolic)
            </label>
            <input
              id="sys"
              inputMode="numeric"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="field"
              placeholder="e.g. 120"
            />
          </div>
          <span className="pb-3 text-xl text-muted">/</span>
          <div className="flex-1">
            <label htmlFor="dia" className="label">
              Bottom (diastolic)
            </label>
            <input
              id="dia"
              inputMode="numeric"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="field"
              placeholder="e.g. 80"
            />
          </div>
        </div>
      )}

      {metric === "cholesterol" && (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="total" className="label">
              Total
            </label>
            <input
              id="total"
              inputMode="numeric"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="field"
              placeholder="190"
            />
          </div>
          <div>
            <label htmlFor="ldl" className="label">
              LDL
            </label>
            <input
              id="ldl"
              inputMode="numeric"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="field"
              placeholder="100"
            />
          </div>
          <div>
            <label htmlFor="hdl" className="label">
              HDL
            </label>
            <input
              id="hdl"
              inputMode="numeric"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="field"
              placeholder="50"
            />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="date" className="label">
          Date
        </label>
        <input
          id="date"
          type="date"
          max={todayISO()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="field"
        />
      </div>

      {err && (
        <p role="alert" className="text-sm font-medium text-brick-700">
          {err}
        </p>
      )}

      <button type="submit" className="btn-primary w-full" disabled={saving}>
        {saving ? "Adding…" : "Add entry"}
      </button>
    </form>
  );
}

/* ----------------------------- Trend card ----------------------------- */

function TrendCard({
  metric,
  readings,
}: {
  metric: Metric;
  readings: Reading[];
}) {
  if (readings.length === 0) {
    return (
      <div className="card text-center text-muted">
        <p>No entries yet.</p>
        <p className="mt-1 text-sm">Add one and your trend shows up here.</p>
      </div>
    );
  }

  let series: Series[] = [];
  const unit = metric === "a1c" ? "%" : "";
  if (metric === "a1c") {
    series = [
      {
        label: "A1C",
        color: "rgb(var(--brick-rgb))",
        points: readings.map((r) => ({ date: r.date, value: r.values.value })),
      },
    ];
  } else if (metric === "weight") {
    series = [
      {
        label: "Weight",
        color: "rgb(var(--brick-rgb))",
        points: readings.map((r) => ({ date: r.date, value: r.values.value })),
      },
    ];
  } else if (metric === "bp") {
    series = [
      {
        label: "Systolic",
        color: "rgb(var(--brick-rgb))",
        points: readings.map((r) => ({ date: r.date, value: r.values.systolic })),
      },
      {
        label: "Diastolic",
        color: "rgb(var(--teal-rgb))",
        points: readings.map((r) => ({
          date: r.date,
          value: r.values.diastolic,
        })),
      },
    ];
  } else {
    series = [
      {
        label: "Total",
        color: "rgb(var(--brick-rgb))",
        points: readings.map((r) => ({ date: r.date, value: r.values.total })),
      },
    ];
    if (readings.some((r) => r.values.ldl != null))
      series.push({
        label: "LDL",
        color: "rgb(var(--gold-rgb))",
        points: readings
          .filter((r) => r.values.ldl != null)
          .map((r) => ({ date: r.date, value: r.values.ldl })),
      });
    if (readings.some((r) => r.values.hdl != null))
      series.push({
        label: "HDL",
        color: "rgb(var(--teal-rgb))",
        points: readings
          .filter((r) => r.values.hdl != null)
          .map((r) => ({ date: r.date, value: r.values.hdl })),
      });
  }

  const latest = readings[readings.length - 1];
  const summary = summarize(metric, readings);

  return (
    <div className="card">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Your trend</h2>
        <span className="text-sm text-muted">Latest {fmtDate(latest.date)}</span>
      </div>
      <p className="mb-2 font-display text-2xl font-extrabold text-ink">
        {summary.headline}
      </p>
      {summary.change && (
        <p className="mb-3 text-sm font-semibold text-muted">{summary.change}</p>
      )}
      <TrendChart series={series} unit={unit} />
    </div>
  );
}

function summarize(metric: Metric, readings: Reading[]) {
  const first = readings[0];
  const last = readings[readings.length - 1];
  if (metric === "a1c") {
    const delta = last.values.value - first.values.value;
    const change =
      readings.length > 1
        ? `${delta === 0 ? "No change" : `${delta > 0 ? "↑" : "↓"} ${Math.abs(delta).toFixed(1)}%`} since ${fmtDate(first.date)}`
        : "";
    return { headline: `${last.values.value}%`, change };
  }
  if (metric === "weight") {
    const u = last.unit ?? "lb";
    const delta = last.values.value - first.values.value;
    const change =
      readings.length > 1
        ? `${delta === 0 ? "No change" : `${delta > 0 ? "↑" : "↓"} ${Math.abs(delta).toFixed(1)} ${u}`} since ${fmtDate(first.date)}`
        : "";
    return { headline: `${last.values.value} ${u}`, change };
  }
  if (metric === "bp") {
    return {
      headline: `${last.values.systolic}/${last.values.diastolic}`,
      change: readings.length > 1 ? `${readings.length} readings logged` : "",
    };
  }
  return {
    headline: `Total ${last.values.total}`,
    change: readings.length > 1 ? `${readings.length} readings logged` : "",
  };
}

/* --------------------------- Weight goal card --------------------------- */

function WeightGoalCard({
  goal,
  readings,
  onSetGoal,
  onClearGoal,
}: {
  goal: WeightGoal | null;
  readings: Reading[];
  onSetGoal: (goal: WeightGoal) => Promise<void>;
  onClearGoal: () => Promise<void>;
}) {
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("lb");

  if (!goal) {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const t = Number(target);
          if (!(t > 0)) return;
          await onSetGoal({
            targetWeight: t,
            unit,
            startWeight: readings[readings.length - 1]?.values.value,
            startDate: todayISO(),
          });
          setTarget("");
        }}
        className="card space-y-3"
      >
        <h2 className="font-display text-lg font-bold text-ink">
          Set a weight goal
        </h2>
        <p className="text-sm text-muted">
          A gentle target to aim for. Encouraging, not a diet — log your weight
          and watch the line move.
        </p>
        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="target" className="label">
              Target weight
            </label>
            <input
              id="target"
              inputMode="decimal"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="field"
              placeholder="e.g. 165"
            />
          </div>
          <div>
            <label htmlFor="gunit" className="label">
              Unit
            </label>
            <select
              id="gunit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="field"
            >
              <option value="lb">lb</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-secondary w-full">
          Set goal
        </button>
      </form>
    );
  }

  const start =
    goal.startWeight ?? readings[0]?.values.value ?? goal.targetWeight;
  const latest = readings[readings.length - 1]?.values.value ?? start;
  const totalSpan = start - goal.targetWeight;
  const done = start - latest;
  const pct =
    totalSpan === 0
      ? 100
      : Math.max(0, Math.min(100, (done / totalSpan) * 100));
  const toGo = Math.abs(latest - goal.targetWeight);
  const reached =
    (totalSpan > 0 && latest <= goal.targetWeight) ||
    (totalSpan < 0 && latest >= goal.targetWeight);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">
          Goal: {goal.targetWeight} {goal.unit}
        </h2>
        <button
          onClick={() => onClearGoal()}
          className="text-sm font-semibold text-muted hover:text-brick-700"
        >
          Clear
        </button>
      </div>
      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-cream">
        <div
          className="h-full rounded-full bg-teal transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-sm font-semibold text-ink">
        {reached
          ? "🎉 You reached your goal — beautiful work."
          : `${toGo.toFixed(1)} ${goal.unit} to go · started at ${start} ${goal.unit}`}
      </p>
    </div>
  );
}

/* ----------------------------- History ----------------------------- */

function HistoryCard({
  metric,
  readings,
  onDelete,
}: {
  metric: Metric;
  readings: Reading[];
  onDelete: (id: string) => Promise<void>;
}) {
  if (readings.length === 0) return null;
  const rows = [...readings].reverse();

  const valueText = (r: Reading) => {
    if (metric === "a1c") return `${r.values.value}%`;
    if (metric === "weight") return `${r.values.value} ${r.unit ?? "lb"}`;
    if (metric === "bp") return `${r.values.systolic}/${r.values.diastolic}`;
    return `Total ${r.values.total}${r.values.ldl != null ? ` · LDL ${r.values.ldl}` : ""}${r.values.hdl != null ? ` · HDL ${r.values.hdl}` : ""}`;
  };

  return (
    <div className="card">
      <h2 className="mb-3 font-display text-lg font-bold text-ink">History</h2>
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center justify-between py-2.5">
            <div>
              <p className="font-semibold text-ink">{valueText(r)}</p>
              <p className="text-xs text-muted">{fmtDate(r.date)}</p>
            </div>
            <button
              onClick={() => onDelete(r.id)}
              aria-label={`Delete entry from ${fmtDate(r.date)}`}
              className="rounded-lg px-2 py-1 text-sm font-semibold text-muted hover:bg-brick-100 hover:text-brick-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------- Safety ----------------------------- */

function SafetyNote({ metric }: { metric: Metric }) {
  const text =
    metric === "a1c"
      ? "Your A1C is your average blood sugar over about 3 months — the “A” in the ABCs of Life. We show the number and trend; what it means for you is a conversation for your doctor."
      : metric === "weight"
        ? "Weight is just one part of your health. What a healthy weight looks like is different for everyone — your doctor can help you set a target that’s right for you."
        : "We show your numbers and how they’re trending — we don’t tell you what they mean for your health. Bring these to your doctor; reading them together is how you get a real picture.";
  return (
    <div className="mt-4 flex items-start gap-3 rounded-xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink">
      <span aria-hidden className="text-lg">
        💛
      </span>
      <p>
        {text} This tool is for education and tracking — not a diagnosis. In an
        emergency, call <strong>911</strong>.
      </p>
    </div>
  );
}
