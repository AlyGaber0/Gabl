"use client";

import Link from "next/link";

const GITHUB_URL = "https://github.com/AlyGaber0/Gabl";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/examples", label: "Examples" },
  { href: "/download", label: "Download" },
];

export default function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#0d1117",
        borderBottom: "1px solid #30363d",
      }}
    >
      <nav
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#e6edf3",
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          Gabl
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                color: "#8b949e",
                fontSize: "0.875rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#e6edf3")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#8b949e")
              }
            >
              {label}
            </Link>
          ))}

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            style={{
              display: "flex",
              alignItems: "center",
              color: "#8b949e",
              marginLeft: "0.5rem",
              padding: "0.375rem",
              borderRadius: "4px",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#e6edf3")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#8b949e")
            }
          >
            <GitHubIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
