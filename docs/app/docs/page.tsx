import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Language Reference — Gabl",
};

type Section = {
  id: string;
  title: string;
  description: string;
  code?: string;
};

const SECTIONS: Section[] = [
  {
    id: "variables",
    title: "Variables",
    description:
      "Variables are declared and assigned using the = operator. Gabl is dynamically typed — a variable holds whatever value you assign to it. That value can be a number, a string, or an array. Variables must be assigned before they are read.",
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
    id: "strings",
    title: "Strings",
    description:
      "String literals are written in double quotes. A string is a value like any other: it can be assigned to a variable, passed to a function, returned from one, and printed. The + operator concatenates two strings, joining them with no separator inserted. The == and != operators compare string contents and return 1 or 0, the same way the numeric comparisons do. Applying any of these operators to one string and one number is a runtime error — Gabl will not coerce between the two.",
    code: `greeting = "hello"
name = "world"
print(greeting + name)

fn shout(word) {
  return word + "!"
}

print(shout("gabl"))

print("abc" == "abc")
print("abc" != "xyz")`,
  },
  {
    id: "arrays",
    title: "Arrays",
    description:
      "An array literal is written as comma separated elements in square brackets. Elements can be numbers, strings, or other arrays, so a single array can mix types and arrays can nest to any depth. arr[0] reads an element and arr[0] = 99 writes one; indices are zero based, and the index can be any expression that evaluates to a number, not just a literal. An empty array is written []. Printing an array prints every element, recursing into nested arrays. Arrays have a fixed capacity of 64 elements, set when the array is created, and cannot grow afterwards. Reading or writing an index that is negative or greater than or equal to the array's length is a runtime error, as is indexing a value that is not an array or using a non-number as an index.",
    code: `nums = [1, 2, 3]
print(nums)
print(nums[0])

nums[1] = 99
print(nums)

words = ["a", "b", "c"]
mixed = [1, "two", 3]
nested = [[1, 2], [3, 4]]

print(words)
print(mixed)
print(nested)`,
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
    id: "for",
    title: "For Loops",
    description:
      "A for loop takes three clauses in parentheses, separated by semicolons: an initialiser that runs once, a condition checked before each pass, and an increment that runs after each pass. The parser desugars it into the initialiser followed by an equivalent while loop, so it is shorthand rather than a separate construct. For loops nest, and pair naturally with arrays when you need to walk an index.",
    code: `for(i = 0; i < 5; i = i + 1) {
  print(i)
}

nums = [10, 20, 30]
for(i = 0; i < 3; i = i + 1) {
  print(nums[i])
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
  {
    id: "limitations",
    title: "Known limitations",
    description:
      "Arrays have a fixed capacity of 64 elements and cannot grow — there is no append operation. Strings have a fixed maximum length of 64 characters, and cannot be indexed. Numbers are integers; there is no floating point. There is no garbage collection and no memory is freed during execution, so every AST node, environment frame, and array allocation lives for the lifetime of the program.",
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
            {code && <CodeBlock>{code}</CodeBlock>}
          </section>
        ))}
      </div>
    </div>
  );
}
