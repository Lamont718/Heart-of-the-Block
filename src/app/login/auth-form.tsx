"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useState } from "react";
import { signIn, signUp, type AuthState } from "./actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full">
      {pending ? "One moment…" : label}
    </button>
  );
}

export function AuthForm({
  initialMode,
  next,
}: {
  initialMode: "signin" | "signup";
  next: string;
}) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const action = mode === "signup" ? signUp : signIn;
  const [state, formAction] = useFormState<AuthState, FormData>(action, null);
  // Email is controlled so switching tabs (which remounts the form to reset the
  // action + clear stale errors) doesn't wipe what the person already typed.
  const [email, setEmail] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="card">
      <div
        className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-cream p-1"
        role="tablist"
        aria-label="Sign in or create account"
      >
        {(["signin", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`min-h-[40px] rounded-lg px-3 py-2 text-sm font-semibold transition ${
              mode === m
                ? "bg-surface text-ink shadow-card"
                : "text-muted hover:text-ink"
            }`}
          >
            {m === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form action={formAction} className="space-y-4" key={mode}>
        <input type="hidden" name="next" value={next} />

        {mode === "signup" && (
          <div>
            <label htmlFor="display_name" className="label">
              Name <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="display_name"
              name="display_name"
              type="text"
              autoComplete="name"
              className="field"
              placeholder="What should we call you?"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              required
              minLength={mode === "signup" ? 8 : undefined}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              className="field pr-16"
              placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-pressed={showPw}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-semibold text-brick-700 hover:underline"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {state?.error && (
          <p role="alert" className="rounded-xl bg-brick-100 px-4 py-3 text-sm font-medium text-brick-700">
            {state.error}
          </p>
        )}
        {state?.notice && (
          <p role="status" className="rounded-xl bg-teal-100 px-4 py-3 text-sm font-medium text-teal">
            {state.notice}
          </p>
        )}

        <SubmitButton label={mode === "signup" ? "Create my account" : "Sign in"} />
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        {mode === "signin" ? (
          <>
            New here?{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="font-semibold text-brick-700 hover:underline"
            >
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="font-semibold text-brick-700 hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </p>

      <p className="mt-4 text-center text-xs text-muted">
        By continuing you agree this is education, not medical care. See our{" "}
        <Link href="/disclaimer" className="underline">
          disclaimer
        </Link>
        .
      </p>
    </div>
  );
}
