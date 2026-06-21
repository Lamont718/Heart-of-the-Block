"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";

const STORAGE_KEY = "hotb.disclaimer.ack.v1";

/**
 * First-run medical-safety modal (SPEC §6). Shows once per browser until the
 * visitor acknowledges that this is education, not medical care. Stored locally
 * so it never blocks a returning user.
 */
export function FirstRunModal() {
  const [open, setOpen] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      // localStorage blocked (private mode) — show it anyway, harmless.
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      acceptRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function acknowledge() {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="firstrun-title"
      aria-describedby="firstrun-body"
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center"
    >
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-card">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <h2
            id="firstrun-title"
            className="font-display text-xl font-extrabold text-ink"
          >
            Before you start
          </h2>
        </div>

        <div id="firstrun-body" className="mt-4 space-y-3 text-sm text-ink">
          <p>
            Heart of the Block is here to help you learn and make everyday
            choices for a healthier heart — the Brooklyn way.
          </p>
          <p className="rounded-xl bg-gold-100 p-3">
            <strong className="font-semibold">It’s education, not medical
            advice.</strong>{" "}
            It can’t diagnose or treat you, and it’s never a substitute for your
            doctor. Don’t start, stop, or change any medication based on what you
            see here.
          </p>
          <p className="text-muted">
            For anything about your health, talk to a licensed provider. In an
            emergency, call <strong className="text-ink">911</strong>.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            ref={acceptRef}
            type="button"
            onClick={acknowledge}
            className="btn-primary w-full"
          >
            I understand — let’s go
          </button>
          <a href="/disclaimer" className="btn-ghost w-full text-sm">
            Read the full disclaimer
          </a>
        </div>
      </div>
    </div>
  );
}
