import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "./auth-form";
import { getUser } from "@/lib/supabase/auth";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in or create your Heart of the Block account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { mode?: string; next?: string };
}) {
  const user = await getUser();
  // Only allow same-site relative paths — block protocol-relative ("//evil.com").
  const next =
    searchParams.next &&
    searchParams.next.startsWith("/") &&
    !searchParams.next.startsWith("//")
      ? searchParams.next
      : "/account";

  if (user) redirect(next);

  const mode = searchParams.mode === "signup" ? "signup" : "signin";

  return (
    <div className="container-block flex flex-col items-center py-12 sm:py-16">
      <Link href="/" className="mb-6 flex flex-col items-center gap-2">
        <Logo className="h-12 w-12" />
        <span className="font-display text-xl font-extrabold text-ink">
          Heart of the Block
        </span>
      </Link>

      <div className="w-full max-w-md">
        <h1 className="mb-2 text-center font-display text-2xl font-extrabold text-ink">
          {mode === "signup" ? "Join the block" : "Welcome back"}
        </h1>
        <p className="mb-6 text-center text-sm text-muted">
          Save your progress, track your numbers, and keep your streak going.
        </p>
        <AuthForm initialMode={mode} next={next} />
      </div>
    </div>
  );
}
