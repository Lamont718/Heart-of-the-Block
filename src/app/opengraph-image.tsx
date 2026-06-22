import { ImageResponse } from "next/og";

export const alt = "Heart of the Block — Brooklyn heart health, the way you live";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Render on first request rather than at build (keeps offline builds clean).
export const dynamic = "force-dynamic";

/** Share/social card shown when the site (or a swap) is shared. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fbf6ee",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="84" height="84" viewBox="0 0 32 32">
            <path
              d="M16 27C16 27 5 20 5 12.6C5 8.9 7.7 6.3 10.8 6.3C12.9 6.3 14.9 7.5 16 9.4C17.1 7.5 19.1 6.3 21.2 6.3C24.3 6.3 27 8.9 27 12.6C27 20 16 27 16 27Z"
              fill="#c23a22"
            />
            <path
              d="M9.5 16.8L11.3 15L13.1 16.8L16 14L18.9 16.8L20.7 15L22.5 16.8V19.4C21.1 21.3 18.7 23.1 16 24.9C13.3 23.1 10.9 21.3 9.5 19.4V16.8Z"
              fill="#e0922f"
            />
          </svg>
          <span style={{ fontSize: 36, fontWeight: 700, color: "#9e2d18" }}>
            Heart of the Block
          </span>
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#211a15",
            lineHeight: 1.05,
            marginTop: 40,
            maxWidth: 900,
          }}
        >
          Heart health, the way you live.
        </div>
        <div style={{ fontSize: 34, color: "#6b5d52", marginTop: 28, maxWidth: 880 }}>
          Real tools, real food, real places near you. Made in Brooklyn, for
          Brooklyn.
        </div>
      </div>
    ),
    { ...size },
  );
}
