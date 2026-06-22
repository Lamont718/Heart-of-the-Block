"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "playing" | "paused";

/**
 * Audio read-aloud (SPEC Pillar 1 — accessibility) using the browser's built-in
 * Speech Synthesis. No audio files, works offline. Renders nothing if the
 * browser doesn't support it.
 */
export function ReadAloud({ text, title }: { text: string; title: string }) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<State>("idle");
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" && "speechSynthesis" in window,
    );
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!supported) return null;

  function play() {
    const synth = window.speechSynthesis;
    if (state === "paused") {
      synth.resume();
      setState("playing");
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(`${title}. ${text}`);
    u.rate = 0.95;
    u.onend = () => setState("idle");
    u.onerror = () => setState("idle");
    utterRef.current = u;
    synth.speak(u);
    setState("playing");
  }

  function pause() {
    window.speechSynthesis.pause();
    setState("paused");
  }

  function stop() {
    window.speechSynthesis.cancel();
    setState("idle");
  }

  return (
    <div className="inline-flex items-center gap-2">
      {state === "playing" ? (
        <button onClick={pause} className="btn-secondary !min-h-[40px] !py-2 text-sm">
          ⏸ Pause
        </button>
      ) : (
        <button onClick={play} className="btn-secondary !min-h-[40px] !py-2 text-sm">
          🔊 {state === "paused" ? "Resume" : "Listen"}
        </button>
      )}
      {state !== "idle" && (
        <button
          onClick={stop}
          className="text-sm font-semibold text-muted hover:text-brick-700"
        >
          Stop
        </button>
      )}
    </div>
  );
}
