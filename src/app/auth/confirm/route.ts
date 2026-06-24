import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Email confirmation / magic-link landing.
 *
 * Supports BOTH Supabase confirmation flows so it works regardless of how the
 * email template is configured:
 *
 *  1. token_hash + type  → verifyOtp  (the recommended @supabase/ssr flow; use
 *     a template URL of
 *     {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup)
 *  2. code               → exchangeCodeForSession  (PKCE flow)
 *
 * Either way the session is written to cookies via the SSR client, which is
 * what the server reads on later requests. The plain {{ .ConfirmationURL }}
 * implicit flow does NOT work here — it returns the session in the URL hash,
 * which the server can never see, so the user lands back looking unverified.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");
  const next =
    nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/account";

  const supabase = await createClient();

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(new URL("/error?reason=confirm", request.url));
}
