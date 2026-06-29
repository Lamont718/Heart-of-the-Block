import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Render markdown to a SANITIZED HTML string (server-side only).
 *
 * Article bodies are first-party but loaded from the Supabase `articles` table,
 * so we treat them as untrusted at render time: a malicious or compromised row
 * must never become stored XSS when injected via dangerouslySetInnerHTML.
 */
export function renderMarkdown(md: string): string {
  const html = marked.parse(md) as string;
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });
}

/** Plain text for the read-aloud feature and reading-time math. */
export function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
