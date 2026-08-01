"use client";

import { useState } from "react";

type Props = {
  children: string;
  className?: string;
};

export default function CodeBlock({ children, className }: Props) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const code = children.trim();

  const copy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // clipboard is unavailable on insecure origins
      });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "#0d1117",
        border: "1px solid #30363d",
        borderRadius: "6px",
        overflow: "hidden",
      }}
      className={className}
    >
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.3rem 0.55rem",
          background: "#161b22",
          border: `1px solid ${copied ? "#3fb950" : "#30363d"}`,
          borderRadius: "5px",
          color: copied ? "#3fb950" : "#8b949e",
          fontSize: "0.7rem",
          fontWeight: 500,
          cursor: "pointer",
          opacity: hovered || copied ? 1 : 0,
          transition: "opacity 0.15s ease, color 0.15s ease",
        }}
      >
        {copied ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13.5 4.5l-7 7-4-4" />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="5.5" y="5.5" width="8" height="9" rx="1.5" />
            <path d="M10.5 5.5v-2a1.5 1.5 0 00-1.5-1.5H4a1.5 1.5 0 00-1.5 1.5V10a1.5 1.5 0 001.5 1.5h1.5" />
          </svg>
        )}
        {copied ? "Copied" : "Copy"}
      </button>

      <pre
        style={{
          margin: 0,
          padding: "1.25rem 1.5rem",
          overflowX: "auto",
          fontSize: "0.875rem",
          lineHeight: "1.7",
          fontFamily:
            "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
          color: "#e6edf3",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
