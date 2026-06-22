"use client";

export type Series = {
  label: string;
  color: string; // CSS color
  points: { date: string; value: number }[];
};

/**
 * Lightweight inline-SVG line chart — no chart library (SPEC: keep the bundle
 * light). Scales all series to a shared y-range, draws lines + dots, labels the
 * first/last dates, and includes a visually-hidden data table for screen
 * readers.
 */
export function TrendChart({
  series,
  unit = "",
  height = 180,
}: {
  series: Series[];
  unit?: string;
  height?: number;
}) {
  const W = 320;
  const H = 160;
  const padX = 12;
  const padY = 16;

  const allPoints = series.flatMap((s) => s.points);
  const dates = Array.from(new Set(allPoints.map((p) => p.date))).sort();
  const values = allPoints.map((p) => p.value);

  if (dates.length === 0 || values.length === 0) return null;

  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const spanY = maxY - minY || 1;
  const padRange = spanY * 0.15;
  const lo = minY - padRange;
  const hi = maxY + padRange;

  const x = (date: string) => {
    if (dates.length === 1) return W / 2;
    const i = dates.indexOf(date);
    return padX + (i / (dates.length - 1)) * (W - padX * 2);
  };
  const y = (v: number) =>
    padY + (1 - (v - lo) / (hi - lo)) * (H - padY * 2);

  const fmtDate = (d: string) => {
    const [, m, day] = d.split("-");
    return `${Number(m)}/${Number(day)}`;
  };

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={height}
        role="img"
        aria-label={`Trend chart: ${series.map((s) => s.label).join(", ")}`}
        className="overflow-visible"
      >
        {/* baseline */}
        <line
          x1={padX}
          y1={H - padY}
          x2={W - padX}
          y2={H - padY}
          stroke="rgb(var(--line-rgb))"
          strokeWidth="1"
        />
        {series.map((s) => {
          const pts = [...s.points].sort((a, b) =>
            a.date.localeCompare(b.date),
          );
          const d = pts
            .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.date)} ${y(p.value)}`)
            .join(" ");
          return (
            <g key={s.label}>
              {pts.length > 1 && (
                <path
                  d={d}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              {pts.map((p) => (
                <circle
                  key={p.date}
                  cx={x(p.date)}
                  cy={y(p.value)}
                  r="3.5"
                  fill={s.color}
                />
              ))}
            </g>
          );
        })}
        {/* y range labels */}
        <text x={padX} y={padY - 4} fontSize="9" fill="rgb(var(--muted-rgb))">
          {Math.round(hi)}
          {unit}
        </text>
        <text x={padX} y={H - padY + 11} fontSize="9" fill="rgb(var(--muted-rgb))">
          {Math.round(lo)}
          {unit}
        </text>
        {/* x labels: first & last */}
        <text x={padX} y={H - 2} fontSize="9" fill="rgb(var(--muted-rgb))">
          {fmtDate(dates[0])}
        </text>
        {dates.length > 1 && (
          <text
            x={W - padX}
            y={H - 2}
            fontSize="9"
            textAnchor="end"
            fill="rgb(var(--muted-rgb))"
          >
            {fmtDate(dates[dates.length - 1])}
          </text>
        )}
      </svg>

      {series.length > 1 && (
        <div className="mt-1 flex flex-wrap justify-center gap-3 text-xs text-muted">
          {series.map((s) => (
            <span key={s.label} className="inline-flex items-center gap-1">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: s.color }}
              />
              {s.label}
            </span>
          ))}
        </div>
      )}

      {/* a11y table */}
      <figcaption className="sr-only">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              {series.map((s) => (
                <th key={s.label}>{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map((d) => (
              <tr key={d}>
                <td>{d}</td>
                {series.map((s) => (
                  <td key={s.label}>
                    {s.points.find((p) => p.date === d)?.value ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </figcaption>
    </figure>
  );
}
