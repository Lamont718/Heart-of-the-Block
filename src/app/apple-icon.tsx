import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

/** Apple touch icon for "Add to Home Screen". */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf6ee",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path
            d="M16 27C16 27 5 20 5 12.6C5 8.9 7.7 6.3 10.8 6.3C12.9 6.3 14.9 7.5 16 9.4C17.1 7.5 19.1 6.3 21.2 6.3C24.3 6.3 27 8.9 27 12.6C27 20 16 27 16 27Z"
            fill="#c23a22"
          />
          <path
            d="M9.5 16.8L11.3 15L13.1 16.8L16 14L18.9 16.8L20.7 15L22.5 16.8V19.4C21.1 21.3 18.7 23.1 16 24.9C13.3 23.1 10.9 21.3 9.5 19.4V16.8Z"
            fill="#e0922f"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
