/**
 * Upcoming community screening events — shown on /get-screened.
 *
 * ⚠️ ONLY ADD REAL, CONFIRMED (or genuinely planned) EVENTS HERE.
 * Do not invent dates, addresses, or hosts. An empty list renders a clean
 * "nothing posted right now" state — that's fine and honest. Past events
 * (date before today) are filtered out automatically, so it's safe to leave
 * old entries; remove them when convenient.
 *
 * `date` is ISO yyyy-mm-dd. Set `tentative: true` for events that are planned
 * but not locked in (shows a "Planned" tag). Keep event text in English
 * (proper nouns / addresses), like the directory listings.
 */

export type ScreeningEvent = {
  id: string;
  title: string;
  /** ISO yyyy-mm-dd. */
  date: string;
  /** Free-text time, e.g. "12–5 PM". Optional. */
  time?: string;
  locationName: string;
  /** Street address or neighborhood. Leave off if not public. */
  address?: string;
  neighborhood?: string;
  /** What screenings/checks are offered. */
  offered: string[];
  host: string;
  /** e.g. "Free". */
  cost?: string;
  link?: string;
  note?: string;
  /** Planned but not fully confirmed. */
  tentative?: boolean;
};

export const SCREENING_EVENTS: ScreeningEvent[] = [
  {
    id: "block-party-2026",
    title: "We Are The Block — 4th Annual Block Party",
    date: "2026-07-18",
    locationName: "Albany Block Association",
    neighborhood: "Brooklyn",
    offered: ["Free blood-pressure checks", "Heart-health info"],
    host: "We Are The Block",
    cost: "Free",
    note: "Free blood-pressure table planned with a local clinician. Come say hi.",
    tentative: true,
  },
];

/** Upcoming events (today or later), soonest first. `today` = ISO yyyy-mm-dd. */
export function upcomingEvents(today: string): ScreeningEvent[] {
  return SCREENING_EVENTS.filter((e) => e.date >= today).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}
