import type { MetadataRoute } from "next";

/** PWA manifest — makes Heart of the Block installable on phones (SPEC: PWA,
 *  no native app needed). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Heart of the Block",
    short_name: "HOTB",
    description:
      "Brooklyn heart health, the way you live — real tools, real food, real places near you.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fbf6ee",
    theme_color: "#c23a22",
    categories: ["health", "lifestyle", "food"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
