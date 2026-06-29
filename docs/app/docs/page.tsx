import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Language Reference — Gabl",
};

type Section = {
  id: string;
  title: string;
  description: string;
  code: string;
};

const SECTIONS: Section[] = [
  {
    id: "variables",
    title: "Variables",
    description:
      "Variables are declared and assigned using the = operator. Gabl is dynamically typed — a variable holds whatever value you assign to it. Variables must be assigned before they are read.",
    code: `x = 10
y = 25
z = x + y
print(z)`,
  },
  {
    id: "arithmetic",
    title: "Arithmetic and Operators",
    description:
      "Gabl supports the standard arithmetic operators: + (addition), - (subtraction), * (multiplication), / (division). Comparison operators == (equal), != (not equal), < (less than), > (greater than) return integer 1 for true and 0 for false.",
    code: `a = 10 + 3
b = 10 - 3
c = 10 * 3
d = 10 / 3

print(a)
print(b)
print(c)
print(d)

print(5 == 5)
print(5 != 3)
print(4 < 9)`,
  },
  {
    id: "conditionals",
    title: "If / Else Conditionals",
    description:
      "Conditional execution uses if and else. The condition is any expression; a non-zero value is truthy. Branches are delimited by curly braces. The else block is optional.",
    code: `x = 7

if(x > 5) {
  print(1)
} else {
  print(0)
}

if(x == 7) {
  print(42)
}`,
  },
  {
    id: "while",
    title: "While Loops",
    description:
      "The while statement repeats its body as long as the condition is non-zero. Use it to build iteration, counting, and search patterns.",
    code: `i = 0
while(i < 5) {
  print(i)
  i = i + 1
}`,
  },
  {
    id: "functions",
    title: "Functions",
    description:
      "Functions are defined with fn, followed by a name, a parenthesised parameter list, and a body in curly braces. A function call passes arguments positionally. Values are returned with return.",
    code: `fn add(a, b) {
  return a + b
}

fn square(n) {
  return n * n
}

print(add(3, 4))
print(square(6))`,
  },
  {
    id: "recursion",
    title: "Recursion",
    description:
      "Gabl functions can call themselves recursively. The environment uses a parent-chain lookup so each call gets its own scope while still resolving outer bindings. Mutual recursion is also supported.",
    code: `fn factorial(n) {
  if(n == 0) {
    return 1
  }
  return n * factorial(n - 1)
}

fn fib(n) {
  if(n == 0) {
    return 0
  }
  if(n == 1) {
    return 1
  }
  return fib(n - 1) + fib(n - 2)
}

print(factorial(6))
print(fib(10))`,
  },
];

const SECTION_LINKS = SECTIONS.map(({ id, title }) => ({ id, title }));

export default function DocsPage() {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "3rem 1.5rem 6rem",
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: "4rem",
        alignItems: "start",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          position: "sticky",
          top: "80px",
          borderRight: "1px solid #30363d",
          paddingRight: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            color: "#8b949e",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 600,
            margin: "0 0 0.75rem",
          }}
        >
          Language Reference
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {SECTION_LINKS.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                style={{
                  display: "block",
                  padding: "0.3rem 0",
                  fontSize: "0.875rem",
                  color: "#8b949e",
                  textDecoration: "none",
                }}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <div>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#e6edf3",
            margin: "0 0 0.5rem",
          }}
        >
          Language Reference
        </h1>
        <p style={{ color: "#8b949e", margin: "0 0 3rem", fontSize: "0.95rem" }}>
          Complete reference for the Gabl programming language.
        </p>

        {SECTIONS.map(({ id, title, description, code }) => (
          <section
            key={id}
            id={id}
            style={{ marginBottom: "3.5rem", scrollMarginTop: "80px" }}
          >
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#e6edf3",
                margin: "0 0 0.75rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid #30363d",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                color: "#8b949e",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                margin: "0 0 1rem",
              }}
            >
              {description}
            </p>
            <CodeBlock>{code}</CodeBlock>
          </section>
        ))}
      </div>
    </div>
  );
}
