/**
 * Heart of the Block mark — a heart whose base is a row of brownstone
 * rooflines. Heart health + the block, in one glyph.
 */
export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="Heart of the Block"
    >
      <path
        d="M16 28C16 28 4 20.5 4 12.2C4 8.2 7 5.5 10.4 5.5C12.7 5.5 14.8 6.8 16 8.9C17.2 6.8 19.3 5.5 21.6 5.5C25 5.5 28 8.2 28 12.2C28 20.5 16 28 16 28Z"
        fill="rgb(var(--brick-rgb))"
      />
      {/* brownstone rooflines along the heart's lower body */}
      <path
        d="M9 17.5L11 15.5L13 17.5L16 14.5L19 17.5L21 15.5L23 17.5V20.5C21.5 22.6 18.9 24.6 16 26.6C13.1 24.6 10.5 22.6 9 20.5V17.5Z"
        fill="rgb(var(--gold-rgb))"
      />
      <rect
        x="14.9"
        y="20"
        width="2.2"
        height="4"
        rx="0.4"
        fill="rgb(var(--brick-rgb))"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-ink ${className}`}
    >
      <Logo />
      <span className="leading-none">
        Heart of <span className="text-brick-700">the Block</span>
      </span>
    </span>
  );
}
