import type { Metadata } from "next";

/**
 * Per-page metadata helper.
 *
 * The root layout sets `alternates.canonical: "/"`, and Next.js inherits that
 * to every child route that doesn't override it — which would tell search
 * engines that every page is a duplicate of the homepage. Each page must set
 * its own canonical. This helper also fills in page-specific Open Graph and
 * Twitter card fields so shared links preview correctly (the OG *image* itself
 * comes from the file-based opengraph-image at the app root, applied to all
 * routes automatically).
 */
export function pageMeta(opts: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  const { title, description, path } = opts;
  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    openGraph: {
      title,
      ...(description ? { description } : {}),
      url: path,
      type: "website",
      siteName: "Heart of the Block",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
    },
  };
}
