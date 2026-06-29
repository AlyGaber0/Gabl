import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Download — Gabl",
};

const STEPS = [
  {
    step: 1,
    title: "Clone the repository",
    code: "git clone https://github.com/AlyGaber0/Gabl.git",
  },
  {
    step: 2,
    title: "Navigate to the source directory",
    code: "cd Gabl/src",
  },
  {
    step: 3,
    title: "Compile with GCC",
    code: "gcc main.c lexer.c parser.c environment.c evaluator.c -o gabl",
  },
  {
    step: 4,
    title: "Create a Gabl source file",
    code: `# hello.gabl
print(42)`,
  },
  {
    step: 5,
    title: "Run it",
    code: "./gabl hello.gabl",
  },
];

const FILES = [
  {
    file: "lexer.c",
    description:
      "Scans source text character by character, classifying each sequence into a typed token (integer, identifier, keyword, operator, etc.).",
  },
  {
    file: "parser.c",
    description:
      "Consumes the token stream and builds an abstract syntax tree using recursive descent, encoding operator precedence and program structure.",
  },
  {
    file: "evaluator.c",
    description:
      "Walks the AST recursively, executing each node and producing a result — handles arithmetic, conditionals, loops, function calls, and return values.",
  },
  {
    file: "environment.c",
    description:
      "Manages variable storage and scope. Each function call gets a new environment linked to its parent, enabling scoped variable lookup up the call chain.",
  },
  {
    file: "main.c",
    description:
      "Entry point. Reads the source file from disk and drives the full pipeline: lexer → parser → evaluator.",
  },
];

export default function DownloadPage() {
  return (
    <div
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "3rem 1.5rem 6rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#e6edf3",
          margin: "0 0 0.5rem",
        }}
      >
        Get Started
      </h1>
      <p
        style={{
          color: "#8b949e",
          fontSize: "0.95rem",
          margin: "0 0 3rem",
        }}
      >
        Gabl requires only GCC. No package manager, no runtime, no dependencies.
      </p>

      {/* Install steps */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#e6edf3",
            margin: "0 0 1.75rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #30363d",
          }}
        >
          Installation
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {STEPS.map(({ step, title, code }) => (
            <div key={step} style={{ display: "flex", gap: "1.25rem" }}>
              <div
                style={{
                  flexShrink: 0,
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#161b22",
                  border: "1px solid #30363d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#58a6ff",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace",
                  marginTop: "2px",
                }}
              >
                {step}
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#e6edf3",
                    margin: "0 0 0.625rem",
                    fontWeight: 500,
                  }}
                >
                  {title}
                </p>
                <CodeBlock>{code}</CodeBlock>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* File structure */}
      <section>
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#e6edf3",
            margin: "0 0 1.25rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid #30363d",
          }}
        >
          Source Files
        </h2>
        <p
          style={{
            color: "#8b949e",
            fontSize: "0.875rem",
            margin: "0 0 1.5rem",
          }}
        >
          All interpreter source lives in <code style={{ color: "#e6edf3", fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace", fontSize: "0.8rem" }}>src/</code>.
          Each file has a single well-defined responsibility.
        </p>
        <div
          style={{
            border: "1px solid #30363d",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {FILES.map(({ file, description }, i) => (
            <div
              key={file}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "1rem",
                padding: "0.875rem 1.25rem",
                borderBottom: i < FILES.length - 1 ? "1px solid #30363d" : "none",
                background: i % 2 === 0 ? "#0d1117" : "#161b22",
              }}
            >
              <code
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace",
                  fontSize: "0.8rem",
                  color: "#58a6ff",
                  alignSelf: "center",
                }}
              >
                {file}
              </code>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#8b949e",
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
