"use client";

import { useEffect, useRef, useState } from "react";
import type { IScannerControls } from "@zxing/browser";
import type { ScanResponse, ScoreLevel } from "@/lib/scanner/types";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  loadSavedScans,
  migrateLocalSavedScans,
  removeSavedScan,
  saveScan as persistScan,
  type SavedScan,
} from "@/lib/scanner/saved";
import { ScanResult } from "./scan-result";

type View = "home" | "scanning" | "loading" | "result" | "notfound";

const RECENT_KEY = "hotb.scanner.recent.v1";

type Recent = { barcode: string; name: string; level: ScoreLevel | null };

export function Scanner({ signedIn }: { signedIn: boolean }) {
  const remote = signedIn && isSupabaseConfigured;
  const [view, setView] = useState<View>("home");
  const [data, setData] = useState<ScanResponse | null>(null);
  const [lastBarcode, setLastBarcode] = useState("");
  const [manual, setManual] = useState("");
  const [error, setError] = useState("");
  const [savedScans, setSavedScans] = useState<SavedScan[]>([]);
  const [recent, setRecent] = useState<Recent[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"));
    } catch {
      /* ignore */
    }
    (async () => {
      try {
        // On first signed-in load, lift locally-saved scans into the account.
        if (remote) await migrateLocalSavedScans();
        setSavedScans(await loadSavedScans(remote));
      } catch {
        /* leave saved list empty if it can't load */
      }
    })();
    return () => controlsRef.current?.stop();
  }, [remote]);

  function stopCamera() {
    controlsRef.current?.stop();
    controlsRef.current = null;
  }

  async function startScan() {
    setError("");
    setView("scanning");
    try {
      const { BrowserMultiFormatReader } = await import("@zxing/browser");
      const reader = new BrowserMultiFormatReader();
      // Prefer the rear camera for in-aisle scanning.
      controlsRef.current = await reader.decodeFromConstraints(
        { video: { facingMode: "environment" } },
        videoRef.current!,
        (result) => {
          if (result) {
            stopCamera();
            lookup(result.getText());
          }
        },
      );
    } catch {
      stopCamera();
      setView("home");
      setError(
        "We couldn’t open the camera. Check the camera permission, or type the barcode number below.",
      );
    }
  }

  async function lookup(code: string) {
    const clean = code.replace(/\D/g, "");
    setLastBarcode(clean);
    setView("loading");
    try {
      const res = await fetch(`/api/product/${clean}`);
      const json = (await res.json()) as ScanResponse;
      if (json.found && json.product) {
        setData(json);
        setView("result");
        pushRecent({
          barcode: clean,
          name: json.product.name,
          level: json.product.score.level,
        });
      } else {
        setData(null);
        setView("notfound");
      }
    } catch {
      setData(null);
      setView("notfound");
    }
  }

  function pushRecent(r: Recent) {
    setRecent((prev) => {
      const next = [r, ...prev.filter((x) => x.barcode !== r.barcode)].slice(0, 8);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  async function saveScan() {
    if (!data?.product) return;
    const product = data.product;
    setError("");
    // Optimistic add to the saved list.
    setSavedScans((prev) =>
      prev.some((s) => s.barcode === product.barcode)
        ? prev
        : [
            {
              barcode: product.barcode,
              name: product.name,
              brand: product.brand,
              level: product.score.level,
            },
            ...prev,
          ],
    );
    try {
      await persistScan(product, remote);
    } catch {
      setError(
        "We couldn’t save that just now. Check your connection and try again.",
      );
      setSavedScans((prev) =>
        prev.filter((s) => s.barcode !== product.barcode),
      );
    }
  }

  async function removeSaved(barcode: string) {
    setSavedScans((prev) => prev.filter((s) => s.barcode !== barcode));
    try {
      await removeSavedScan(barcode, remote);
    } catch {
      /* it'll reappear on next load if the delete failed */
    }
  }

  function reset() {
    stopCamera();
    setData(null);
    setView("home");
    setError("");
  }

  return (
    <div>
      {view === "scanning" ? (
        <div className="card overflow-hidden p-0">
          <div className="relative aspect-square w-full bg-ink">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              aria-label="Camera preview for barcode scanning"
              playsInline
              muted
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-28 w-4/5 rounded-xl border-4 border-white/80 shadow-[0_0_0_9999px_rgba(33,26,21,0.35)]" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4">
            <p className="text-sm text-muted">Point at the barcode…</p>
            <button onClick={reset} className="btn-secondary !min-h-[40px] !py-2">
              Cancel
            </button>
          </div>
        </div>
      ) : view === "loading" ? (
        <div className="card text-center text-muted">
          Looking up {lastBarcode}…
        </div>
      ) : view === "result" && data ? (
        <ScanResult
          data={data}
          saved={savedScans.some((s) => s.barcode === data.product?.barcode)}
          onSave={saveScan}
          onScanAnother={reset}
        />
      ) : view === "notfound" ? (
        <NotFound barcode={lastBarcode} onScanAnother={reset} />
      ) : (
        <Home
          error={error}
          manual={manual}
          setManual={setManual}
          onStart={startScan}
          onManual={() => manual.trim() && lookup(manual)}
          recent={recent}
          saved={savedScans}
          onPick={(b) => lookup(b)}
          onRemoveSaved={removeSaved}
        />
      )}
    </div>
  );
}

function levelLabel(level: ScoreLevel | null) {
  return level === "good"
    ? "● good"
    : level === "okay"
      ? "◐ okay"
      : level === "limit"
        ? "○ limit"
        : "—";
}

function Home({
  error,
  manual,
  setManual,
  onStart,
  onManual,
  recent,
  saved,
  onPick,
  onRemoveSaved,
}: {
  error: string;
  manual: string;
  setManual: (v: string) => void;
  onStart: () => void;
  onManual: () => void;
  recent: Recent[];
  saved: SavedScan[];
  onPick: (barcode: string) => void;
  onRemoveSaved: (barcode: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="card text-center">
        <div className="text-4xl" aria-hidden>
          📷
        </div>
        <h2 className="mt-2 font-display text-xl font-bold text-ink">
          Scan a product
        </h2>
        <p className="mt-1 text-sm text-muted">
          Point your camera at the barcode and get a plain-language heart read —
          then a better swap.
        </p>
        <button onClick={onStart} className="btn-primary mt-4 w-full">
          Open camera
        </button>
        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-brick-700">
            {error}
          </p>
        )}
      </div>

      <div className="card">
        <label htmlFor="manual" className="label">
          No camera? Type the barcode number
        </label>
        <div className="flex gap-2">
          <input
            id="manual"
            inputMode="numeric"
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onManual()}
            placeholder="e.g. 049000028911"
            className="field"
          />
          <button onClick={onManual} className="btn-secondary shrink-0">
            Look up
          </button>
        </div>
      </div>

      {saved.length > 0 && (
        <div className="card">
          <h3 className="mb-2 font-display text-base font-bold text-ink">
            ♥ Saved products
          </h3>
          <ul className="divide-y divide-line">
            {saved.map((s) => (
              <li key={s.barcode} className="flex items-center gap-2 py-2.5">
                <button
                  onClick={() => onPick(s.barcode)}
                  className="flex flex-1 items-center justify-between text-left hover:text-brick-700"
                >
                  <span className="truncate text-sm font-semibold text-ink">
                    {s.name}
                    {s.brand ? (
                      <span className="font-normal text-muted"> · {s.brand}</span>
                    ) : null}
                  </span>
                  <span className="ml-3 shrink-0 text-xs text-muted">
                    {levelLabel(s.level)}
                  </span>
                </button>
                <button
                  onClick={() => onRemoveSaved(s.barcode)}
                  aria-label={`Remove ${s.name} from saved`}
                  className="shrink-0 rounded-lg px-2 py-1 text-sm font-semibold text-muted hover:bg-brick-100 hover:text-brick-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recent.length > 0 && (
        <div className="card">
          <h3 className="mb-2 font-display text-base font-bold text-ink">
            Recent scans
          </h3>
          <ul className="divide-y divide-line">
            {recent.map((r) => (
              <li key={r.barcode}>
                <button
                  onClick={() => onPick(r.barcode)}
                  className="flex w-full items-center justify-between py-2.5 text-left hover:text-brick-700"
                >
                  <span className="truncate text-sm font-semibold text-ink">
                    {r.name}
                  </span>
                  <span className="ml-3 shrink-0 text-xs text-muted">
                    {levelLabel(r.level)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function NotFound({
  barcode,
  onScanAnother,
}: {
  barcode: string;
  onScanAnother: () => void;
}) {
  return (
    <div className="card text-center">
      <div className="text-3xl" aria-hidden>
        🔍
      </div>
      <h2 className="mt-2 font-display text-xl font-bold text-ink">
        We don’t have this one yet
      </h2>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
        It’s not in the open product database{barcode ? ` (barcode ${barcode})` : ""}.
        You can add it on Open Food Facts to help your neighbors — it’s free and
        community-run.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
        {barcode && (
          <a
            href={`https://world.openfoodfacts.org/cgi/product.pl?type=add&code=${barcode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Add it on Open Food Facts
          </a>
        )}
        <button onClick={onScanAnother} className="btn-primary">
          Scan another
        </button>
      </div>
    </div>
  );
}
