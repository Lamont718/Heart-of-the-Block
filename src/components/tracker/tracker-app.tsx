"use client";

import { useEffect, useState } from "react";
import {
  METRIC_META,
  type Metric,
  type Reading,
  type WeightGoal,
} from "@/lib/tracker/types";
import {
  addReading,
  clearWeightGoal,
  deleteReading,
  getReadings,
  getWeightGoal,
  setWeightGoal,
} from "@/lib/tracker/storage";
import { TrendChart, type Series } from "./trend-chart";

const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export function TrackerApp({ signedIn }: { signedIn: boolean }) {
  const [metric, setMetric] = useState<Metric>("weight");
  const [mounted, setMounted] = useState(false);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [goal, setGoal] = useState<WeightGoal | null>(null);

  function refresh(m: Metric) {
    setReadings(getReadings(m));
    setGoal(getWeightGoal());
  }

  useEffect(() => {
    setMounted(true);
    refresh(metric);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metric]);

  return (
    <div>
      {/* Tabs */}
      <div
        className="grid grid-cols-3 gap-1 rounded-xl bg-cream p-1"
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

      {!mounted ? (
        <div className="card mt-5 text-muted">Loading your numbers…</div>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Left: log form + (weight) goal */}
          <div className="space-y-5">
            <LogForm metric={metric} onAdded={() => refresh(metric)} />
            {metric === "weight" && (
              <WeightGoalCard
                goal={goal}
                readings={readings}
                onChange={() => refresh(metric)}
              />
            )}
          </div>

          {/* Right: trend + history */}
          <div className="space-y-5">
            <TrendCard metric={metric} readings={readings} />
            <HistoryCard
              metric={metric}
              readings={readings}
              onDeleted={() => refresh(metric)}
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
  onAdded,
}: {
  metric: Metric;
  onAdded: () => void;
}) {
  const [date, setDate] = useState(todayISO());
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [unit, setUnit] = useState("lb");
  const [err, setErr] = useState("");

  // Reset fields when switching metric.
  useEffect(() => {
    setA("");
    setB("");
    setC("");
    setErr("");
    setDate(todayISO());
  }, [metric]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const num = (v: string) => (v.trim() === "" ? NaN : Number(v));

    if (metric === "weight") {
      const value = num(a);
      if (!(value > 0)) return setErr("Enter a weight.");
      addReading({ metric, date, values: { value }, unit });
    } else if (metric === "bp") {
      const systolic = num(a);
      const diastolic = num(b);
      if (!(systolic > 0) || !(diastolic > 0))
        return setErr("Enter both top and bottom numbers.");
      addReading({ metric, date, values: { systolic, diastolic } });
    } else {
      const total = num(a);
      const ldl = num(b);
      const hdl = num(c);
      if (!(total > 0)) return setErr("Enter at least your total cholesterol.");
      const values: Record<string, number> = { total };
      if (ldl > 0) values.ldl = ldl;
      if (hdl > 0) values.hdl = hdl;
      addReading({ metric, date, values });
    }
    setA("");
    setB("");
    setC("");
    onAdded();
  }

  return (
    <form onSubmit={submit} className="card space-y-4">
      <h2 className="font-display text-lg font-bold text-ink">
        Log {METRIC_META[metric].label.toLowerCase()}
      </h2>

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

      <button type="submit" className="btn-primary w-full">
        Add entry
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
  const unit = "";
  if (metric === "weight") {
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
  onChange,
}: {
  goal: WeightGoal | null;
  readings: Reading[];
  onChange: () => void;
}) {
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("lb");

  if (!goal) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const t = Number(target);
          if (!(t > 0)) return;
          setWeightGoal({
            targetWeight: t,
            unit,
            startWeight: readings[readings.length - 1]?.values.value,
            startDate: todayISO(),
          });
          setTarget("");
          onChange();
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
          onClick={() => {
            clearWeightGoal();
            onChange();
          }}
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
  onDeleted,
}: {
  metric: Metric;
  readings: Reading[];
  onDeleted: () => void;
}) {
  if (readings.length === 0) return null;
  const rows = [...readings].reverse();

  const valueText = (r: Reading) => {
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
              onClick={() => {
                deleteReading(r.id);
                onDeleted();
              }}
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
    metric === "weight"
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
