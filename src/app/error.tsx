"use client";

import { useEffect } from "react";
import Link from "next/link";

/** App-level error boundary — keeps a crash from showing a blank screen. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production this is where we'd report to monitoring.
    console.error(error);
  }, [error]);

  return (
    <div className="container-block flex flex-col items-center py-20 text-center">
      <h1 className="font-display text-3xl font-extrabold text-ink">
        Something went sideways
      </h1>
      <p className="mt-3 max-w-md text-muted">
        We hit a snag on our end. Try again — and if it keeps happening, come
        back in a bit.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/" className="btn-secondary">
          Back home
        </Link>
      </div>
      <p className="mt-6 text-xs text-muted">
        If this is a medical emergency, call <strong>911</strong>.
      </p>
    </div>
  );
}
