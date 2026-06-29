import Link from "next/link";

const LEARNED = [
  {
    title: "Memory management",
    body: "Every AST node, token, and environment frame is a malloc call. Getting ownership wrong means segfaults that only show at runtime, which forced me to understand the lifetime of every struct I created.",
  },
  {
    title: "Recursive descent parsing",
    body: "A recursive descent parser is just functions that mirror your grammar rules. The call stack itself builds the parse tree, so operator precedence falls out of the code structure with no table needed.",
  },
  {
    title: "Scope as a linked list",
    body: "Variable scope is a chain of environment structs, each with a parent pointer. When a function returns, you discard its frame. That is how closures work in real runtimes, and I got to implement it from scratch in about 50 lines of C.",
  },
  {
    title: "Tagged unions for AST nodes",
    body: "C has no sum types, so each AST node is a struct with a type enum and a union of payloads. Designing that layout forced me to enumerate every shape a program can take before writing a single line of the evaluator.",
  },
];

const FEATURES = [
  {
    title: "Lexer",
    description:
      "Scans raw source text character by character and produces a stream of labeled tokens that the parser can reason about structurally.",
  },
  {
    title: "Parser",
    description:
      "Uses recursive descent parsing to build an abstract syntax tree that encodes operator precedence and program structure.",
  },
  {
    title: "Evaluator",
    description:
      "Walks the AST recursively and executes each node, using a scoped environment with parent chain lookup for variable resolution.",
  },
];

export default function HomePage() {
  return (
    <div
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "5rem 1.5rem 6rem",
      }}
    >
      {/* Hero */}
      <section style={{ marginBottom: "4rem" }}>
        <h1
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace",
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            fontWeight: 700,
            color: "#e6edf3",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: "0 0 1rem",
          }}
        >
          Gabl
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#8b949e",
            margin: "0 0 2rem",
            maxWidth: "520px",
          }}
        >
          An interpreted programming language written in C from scratch.
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://github.com/AlyGaber0/Gabl"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.25rem",
              border: "1px solid #30363d",
              borderRadius: "6px",
              color: "#e6edf3",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              background: "#161b22",
            }}
          >
            View on GitHub
          </a>
          <Link
            href="/download"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.625rem 1.25rem",
              background: "#58a6ff",
              borderRadius: "6px",
              color: "#0d1117",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Download
          </Link>
        </div>
      </section>

      {/* What I learned */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#e6edf3",
            margin: "0 0 1.25rem",
            letterSpacing: "-0.01em",
          }}
        >
          What I learned building this
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {LEARNED.map(({ title, body }) => (
            <div
              key={title}
              style={{
                background: "#161b22",
                border: "1px solid #30363d",
                borderRadius: "8px",
                padding: "1.25rem 1.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#e6edf3",
                  margin: "0 0 0.5rem",
                  fontWeight: 600,
                  fontFamily:
                    "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace",
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#8b949e",
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture cards */}
      <section>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#e6edf3",
            margin: "0 0 1.25rem",
            letterSpacing: "-0.01em",
          }}
        >
          How it works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {FEATURES.map(({ title, description }) => (
            <div
              key={title}
              style={{
                background: "#161b22",
                border: "1px solid #30363d",
                borderRadius: "8px",
                padding: "1.25rem 1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace",
                  fontSize: "0.8rem",
                  color: "#58a6ff",
                  margin: "0 0 0.5rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#8b949e",
                  margin: 0,
                  lineHeight: 1.65,
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
