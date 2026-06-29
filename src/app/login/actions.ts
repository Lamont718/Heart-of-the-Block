"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSiteUrl } from "@/lib/site-url";

export type AuthState = {
  error?: string;
  notice?: string;
} | null;

function safeNext(next: FormDataEntryValue | null): string {
  const n = typeof next === "string" ? next : "";
  // Only allow same-site relative paths.
  return n.startsWith("/") && !n.startsWith("//") ? n : "/account";
}

export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured) {
    return { error: "Sign-in isn’t connected yet. Add Supabase keys to enable accounts." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "We couldn’t sign you in. Check your email and password." };
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!isSupabaseConfigured) {
    return { error: "Sign-up isn’t connected yet. Add Supabase keys to enable accounts." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("display_name") ?? "").trim();
  const next = safeNext(formData.get("next"));

  if (!email || password.length < 8) {
    return { error: "Use a valid email and a password of at least 8 characters." };
  }

  const supabase = await createClient();
  const origin = await getSiteUrl();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName || null },
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    // Don't surface the raw Supabase message (account-enumeration / info leak).
    // Log it server-side for debugging; show the person a friendly line.
    console.error("[signUp]", error.message);
    const friendly = /registered|already/i.test(error.message)
      ? "That email already has an account. Try signing in instead."
      : "We couldn’t create that account. Double-check your email and try again.";
    return { error: friendly };
  }

  return {
    notice:
      "Check your email to confirm your account, then come back and sign in.",
  };
}
