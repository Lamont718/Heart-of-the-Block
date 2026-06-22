import type { Config } from "tailwindcss";

/**
 * Heart of the Block — design tokens.
 * Warm, vibrant, Brooklyn energy. Never clinical. Colours are defined as RGB
 * triplet CSS vars (see globals.css) so Tailwind's `/opacity` modifiers work
 * (e.g. bg-ink/50 for the modal overlay). WCAG-AA contrast checked for the
 * primary text/button combinations against the cream background.
 */
const c = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        cream: c("--cream-rgb"),
        surface: c("--surface-rgb"),
        ink: c("--ink-rgb"),
        muted: c("--muted-rgb"),
        line: c("--line-rgb"),
        // Brand
        brick: {
          DEFAULT: c("--brick-rgb"),
          700: c("--brick-700-rgb"),
          100: c("--brick-100-rgb"),
        },
        gold: {
          DEFAULT: c("--gold-rgb"),
          100: c("--gold-100-rgb"),
        },
        teal: {
          DEFAULT: c("--teal-rgb"),
          100: c("--teal-100-rgb"),
        },
        // Health-score scale (good / okay / limit) — non-clinical
        good: c("--good-rgb"),
        okay: c("--okay-rgb"),
        limit: c("--limit-rgb"),
        // Convenience aliases
        background: c("--cream-rgb"),
        foreground: c("--ink-rgb"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(33,26,21,0.04), 0 8px 24px -12px rgba(33,26,21,0.18)",
        lift: "0 8px 30px -8px rgba(194,58,34,0.35)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
export default config;
