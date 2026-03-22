import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Enterprise First — AI assets & media intelligence";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(145deg, #09090b 0%, #18181b 45%, #052e16 100%)",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#fafafa",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#fafafa",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#fafafa",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
            letterSpacing: -0.02,
            maxWidth: 900,
          }}
        >
          AI assets.{" "}
          <span style={{ color: "#22c55e" }}>Enterprise results.</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#a1a1aa",
            fontFamily: "monospace",
          }}
        >
          enterprisefirst.ai · Stockholm
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
