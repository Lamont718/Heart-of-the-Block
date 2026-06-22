"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "playing" | "paused";

/**
 * Pick the most natural-sounding English voice the device offers. Modern
 * browsers ship neural voices (Microsoft "… Natural" / Online, Google US
 * English, Apple Samantha) that sound far more human than the default robotic
 * fallback — we just have to ask for one instead of taking whatever's default.
 */
function pickVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
  const en = voices.filter((v) => /^en[-_]?/i.test(v.lang));
  const pool = en.length ? en : voices;
  if (!pool.length) return null;
  const prefs = [
    /natural/i, // Microsoft neural "… (Natural)" — the most human
    /\b(aria|jenny|michelle|ava|nova|emma)\b/i, // MS / Apple neural
    /google us english/i,
    /google uk english female/i,
    /\b(samantha|allison|joelle|zoe|karen|moira)\b/i, // Apple
    /\b(zira)\b/i, // older MS, warmer than the David default
  ];
  for (const re of prefs) {
    const hit = pool.find((v) => re.test(v.name));
    if (hit) return hit;
  }
  return pool.find((v) => v.default) ?? pool[0];
}

/**
 * Audio read-aloud (SPEC Pillar 1 — accessibility) using the browser's built-in
 * Speech Synthesis. No audio files, works offline. Renders nothing if the
 * browser doesn't support it.
 */
export function ReadAloud({ text, title }: { text: string; title: string }) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<State>("idle");
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const synth = window.speechSynthesis;
    // Voices can load asynchronously — pick now and again on voiceschanged.
    const load = () => {
      voiceRef.current = pickVoice(synth.getVoices());
    };
    load();
    synth.onvoiceschanged = load;
    return () => {
      synth.onvoiceschanged = null;
      synth.cancel();
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
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = 1; // natural voices sound best at their normal pace
    u.pitch = 1;
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
