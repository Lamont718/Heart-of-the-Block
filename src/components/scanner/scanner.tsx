"use client";

import { useEffect, useRef, useState } from "react";
import type { IScannerControls } from "@zxing/browser";
import type { ScanResponse, ScoreLevel } from "@/lib/scanner/types";
import { ScanResult } from "./scan-result";

type View = "home" | "scanning" | "loading" | "result" | "notfound";

const RECENT_KEY = "hotb.scanner.recent.v1";
const SAVED_KEY = "hotb.scanner.saved.v1";

type Recent = { barcode: string; name: string; level: ScoreLevel | null };

export function Scanner() {
  const [view, setView] = useState<View>("home");
  const [data, setData] = useState<ScanResponse | null>(null);
  const [lastBarcode, setLastBarcode] = useState("");
  const [manual, setManual] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [recent, setRecent] = useState<Recent[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"));
    } catch {
      /* ignore */
    }
    return () => controlsRef.current?.stop();
  }, []);

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
    setSaved(false);
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

  function saveScan() {
    if (!data?.product) return;
    try {
      const list: string[] = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      const next = list.includes(data.product.barcode)
        ? list
        : [...list, data.product.barcode];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      setSaved(true);
    } catch {
      /* ignore */
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
          saved={saved}
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
          onPick={(b) => lookup(b)}
        />
      )}
    </div>
  );
}

function Home({
  error,
  manual,
  setManual,
  onStart,
  onManual,
  recent,
  onPick,
}: {
  error: string;
  manual: string;
  setManual: (v: string) => void;
  onStart: () => void;
  onManual: () => void;
  recent: Recent[];
  onPick: (barcode: string) => void;
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
                    {r.level === "good"
                      ? "● good"
                      : r.level === "okay"
                        ? "◐ okay"
                        : r.level === "limit"
                          ? "○ limit"
                          : "—"}
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
