import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Ícone da tela inicial do iPhone: o símbolo da Nexo sobre cobalto.
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
          background: "#1d3fff",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64">
          <line x1="32" y1="15" x2="17" y2="45" stroke="#2ee88f" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="15" x2="47" y2="45" stroke="#ffc53d" strokeWidth="4" strokeLinecap="round" />
          <line x1="17" y1="45" x2="47" y2="45" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="15" r="7.5" fill="#2ee88f" />
          <circle cx="17" cy="45" r="7.5" fill="#2ee88f" />
          <circle cx="47" cy="45" r="7.5" fill="#ffc53d" />
        </svg>
      </div>
    ),
    size,
  );
}
