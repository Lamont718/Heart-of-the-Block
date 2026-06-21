import type { DayKey, WeeklyHours } from "./types";

const DAY_ORDER: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAY_LABEL: Record<DayKey, string> = {
  sun: "Sun",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
};

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}

export type OpenState = {
  open: boolean;
  /** e.g. "Open until 8:00 PM" or "Closed · opens Mon 9:00 AM" */
  label: string;
};

function fmt(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hr}:${String(m).padStart(2, "0")} ${period}` : `${hr}:00 ${period}`;
}

/**
 * Is the place open at `now`? Pass `now` from the caller so server and client
 * agree (and so it stays deterministic). Handles multi-window days and
 * overnight windows (close < open spills into the next day).
 */
export function getOpenState(hours: WeeklyHours, now: Date): OpenState {
  const dayIdx = now.getDay();
  const today = DAY_ORDER[dayIdx];
  const cur = now.getHours() * 60 + now.getMinutes();

  for (const w of hours[today] ?? []) {
    const o = toMinutes(w.open);
    const c = toMinutes(w.close);
    const closesNextDay = c <= o;
    if ((!closesNextDay && cur >= o && cur < c) || (closesNextDay && cur >= o)) {
      return { open: true, label: `Open until ${fmt(w.close)}` };
    }
  }
  // Check if an overnight window from yesterday is still running.
  const prev = DAY_ORDER[(dayIdx + 6) % 7];
  for (const w of hours[prev] ?? []) {
    const o = toMinutes(w.open);
    const c = toMinutes(w.close);
    if (c <= o && cur < c) {
      return { open: true, label: `Open until ${fmt(w.close)}` };
    }
  }

  // Closed — find the next opening within the next 7 days.
  for (let step = 0; step < 8; step++) {
    const idx = (dayIdx + step) % 7;
    const key = DAY_ORDER[idx];
    for (const w of hours[key] ?? []) {
      const o = toMinutes(w.open);
      if (step === 0 && cur >= o) continue; // already passed today
      const when = step === 0 ? `today ${fmt(w.open)}` : `${DAY_LABEL[key]} ${fmt(w.open)}`;
      return { open: false, label: `Closed · opens ${when}` };
    }
  }
  return { open: false, label: "Hours not listed" };
}

/** Compact week summary for a listing detail, grouping identical days. */
export function summarizeHours(hours: WeeklyHours): { day: string; text: string }[] {
  return DAY_ORDER.map((d) => {
    const windows = hours[d] ?? [];
    const text =
      windows.length === 0
        ? "Closed"
        : windows.map((w) => `${fmt(w.open)} – ${fmt(w.close)}`).join(", ");
    return { day: DAY_LABEL[d], text };
  });
}
