/**
 * The persistent medical-safety disclaimer (SPEC §6). Rendered in the footer on
 * every page, and reusable as an inline notice on any tool that touches
 * personal health. Plain language, always visible — never bolted on.
 */
export function DisclaimerBanner({
  variant = "footer",
}: {
  variant?: "footer" | "inline";
}) {
  const inline = variant === "inline";
  return (
    <div
      role="note"
      aria-label="Medical disclaimer"
      className={
        inline
          ? "flex items-start gap-3 rounded-xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink"
          : "flex items-start gap-3 rounded-2xl border border-line bg-cream p-5 text-sm text-muted"
      }
    >
      <HeartGuard className="mt-0.5 h-5 w-5 shrink-0 text-brick-700" />
      <p className="leading-relaxed">
        <strong className="font-semibold text-ink">
          This is education, not medical advice.
        </strong>{" "}
        Heart of the Block helps you learn and make everyday choices — it can’t
        diagnose, treat, or replace your doctor. Never start, stop, or change any
        medication based on what you see here. For anything about your health,
        talk to a licensed healthcare provider.
      </p>
    </div>
  );
}

function HeartGuard({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s-7-4.35-9.2-9.05C1.4 9.1 2.9 6 6 6c1.9 0 3.4 1.1 4 2.6C10.6 7.1 12.1 6 14 6c3.1 0 4.6 3.1 3.2 5.95C15 16.65 12 21 12 21Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M12 8.6C11.4 7.1 9.9 6 8 6 4.9 6 3.4 9.1 4.8 11.95 7 16.65 12 21 12 21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
