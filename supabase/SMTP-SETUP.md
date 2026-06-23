# Branded auth emails (custom SMTP via Resend)

Goal: keep email confirmation on, but have the email come from
**heartoftheblock.org** (branded) instead of Supabase's generic server.
This also stops confirmation emails from landing in spam.

You already use Resend (for YODM), so we reuse it.

---

## 1. Add heartoftheblock.org to Resend

1. Resend dashboard → **Domains** → **Add Domain** → `heartoftheblock.org`.
2. Resend shows DNS records (a few `TXT` for DKIM/SPF, sometimes an MX for the
   send subdomain). If it offers **"Auto-configure with GoDaddy,"** use that —
   it's the same trick that worked for yodm.com.
3. If adding by hand at GoDaddy: add each record exactly as shown (host/name +
   value). Keep your existing MX/root records untouched so domain email still
   works.
4. Back in Resend, click **Verify**. Wait until the domain shows **Verified**
   (DNS can take a few minutes to a couple hours).

## 2. Create a Resend API key

Resend → **API Keys** → **Create API Key** (Full access or Sending access).
Copy the key (`re_...`) — you'll paste it as the SMTP password.

## 3. Point Supabase at Resend

Supabase dashboard → **Project Settings → Authentication → SMTP Settings**
(or **Authentication → Emails → SMTP**). Toggle **Enable Custom SMTP** and enter:

| Field             | Value                                   |
| ----------------- | --------------------------------------- |
| Sender email      | `hello@heartoftheblock.org`             |
| Sender name       | `Heart of the Block`                    |
| Host              | `smtp.resend.com`                       |
| Port              | `587`                                   |
| Username          | `resend`                                |
| Password          | your Resend API key (`re_...`)          |
| Minimum interval  | leave default                           |

Save. (The sender email's domain **must** be the verified Resend domain.)

## 4. Use the branded email template

Supabase → **Authentication → Email Templates → "Confirm signup"**.
Replace the body with the contents of
`supabase/email-templates/confirm-signup.html` (in this repo).
Keep the `{{ .ConfirmationURL }}` variable exactly as-is.

You can do the same for the other templates (Magic Link, Reset Password)
later if you want them branded too.

## 5. Confirm redirect URLs are set

Supabase → **Authentication → URL Configuration**:
- **Site URL:** `https://heartoftheblock.org`
- **Redirect URLs:** include `https://heartoftheblock.org/**` (and
  `http://localhost:3000/**` for local testing).

This is what makes the confirm link land on `/auth/confirm` correctly.

## 6. Test

Sign up with a real address you can check. You should get a **branded** email
from `hello@heartoftheblock.org`, click it, land on `/account` signed in.

---

### No app code change needed
The signup flow (`src/app/login/actions.ts`) already sends users the
"check your email" notice and `/auth/confirm` already verifies the link.
Custom SMTP only changes *who sends* the email and *what it looks like*.
