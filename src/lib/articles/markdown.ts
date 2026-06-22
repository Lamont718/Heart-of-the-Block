import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Render trusted, first-party markdown to an HTML string (server-side only).
 * Content is authored by us, so no user-input sanitization is needed.
 */
export function renderMarkdown(md: string): string {
  return marked.parse(md) as string;
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
