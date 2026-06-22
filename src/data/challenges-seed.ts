/** Small, joinable challenges (SPEC Pillar 4). Daily-tap model: one tap per day
 *  moves progress; finishing earns points. Mirrors the `challenges` table. */

export interface ChallengeDef {
  id: string;
  title: string;
  blurb: string;
  emoji: string;
  /** Number of days to complete. */
  target: number;
  points: number;
}

export const CHALLENGES_SEED: ChallengeDef[] = [
  {
    id: "c-walks",
    title: "5 Walks This Week",
    blurb: "Take a walk five days this week — any length counts.",
    emoji: "🚶",
    target: 5,
    points: 50,
  },
  {
    id: "c-soda",
    title: "Skip the Soda",
    blurb: "Choose water or seltzer over soda, 7 days running.",
    emoji: "🥤",
    target: 7,
    points: 70,
  },
  {
    id: "c-move20",
    title: "20 a Day",
    blurb: "Move at least 20 minutes a day, 5 days.",
    emoji: "⏱️",
    target: 5,
    points: 50,
  },
  {
    id: "c-greens",
    title: "Eat Your Greens",
    blurb: "Put a vegetable on your plate, 7 days in a row.",
    emoji: "🥬",
    target: 7,
    points: 70,
  },
];
