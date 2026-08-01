import type { Metadata } from "next";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Examples — Gabl",
};

type Example = {
  title: string;
  description: string;
  code: string;
  output: string;
};

const EXAMPLES: Example[] = [
  {
    title: "Factorial",
    description:
      "Computes the factorial of a number using tail recursion. factorial(0) returns 1 as the base case; all other inputs multiply n by factorial(n - 1).",
    code: `fn factorial(n) {
  if(n == 0) {
    return 1
  }
  return n * factorial(n - 1)
}

print(factorial(0))
print(factorial(5))
print(factorial(10))`,
    output: `1
120
3628800`,
  },
  {
    title: "Fibonacci",
    description:
      "Computes the nth Fibonacci number using classic double recursion. Demonstrates that Gabl functions can call themselves multiple times within a single return expression.",
    code: `fn fib(n) {
  if(n == 0) {
    return 0
  }
  if(n == 1) {
    return 1
  }
  return fib(n - 1) + fib(n - 2)
}

print(fib(0))
print(fib(1))
print(fib(10))
print(fib(15))`,
    output: `0
1
55
610`,
  },
  {
    title: "Prime Checker",
    description:
      "Tests whether a number is prime using a while loop and a helper function. The helper iterates from 2 up to n - 1, checking for any divisor. Demonstrates combining loops with function calls.",
    code: `fn isPrime(n) {
  if(n < 2) {
    return 0
  }
  i = 2
  while(i < n) {
    if(n / i * i == n) {
      return 0
    }
    i = i + 1
  }
  return 1
}

print(isPrime(1))
print(isPrime(2))
print(isPrime(7))
print(isPrime(9))
print(isPrime(13))`,
    output: `0
1
1
0
1`,
  },
  {
    title: "Countdown",
    description:
      "Counts down from a given number to zero using a while loop. Simple demonstration of mutable variables and loop termination in Gabl.",
    code: `n = 5
while(n > 0) {
  print(n)
  n = n - 1
}
print(0)`,
    output: `5
4
3
2
1
0`,
  },
  {
    title: "Array Sum",
    description:
      "Iterates over an array by index with a while loop, accumulating a running total. The length is passed explicitly because Gabl has no built in way to query an array's length yet.",
    code: `fn sum(arr, n) {
  total = 0
  i = 0
  while(i < n) {
    total = total + arr[i]
    i = i + 1
  }
  return total
}

print(sum([1, 2, 3, 4, 5], 5))`,
    output: `15`,
  },
  {
    title: "Array Maximum",
    description:
      "Finds the largest element in an array. Demonstrates comparison inside a loop and conditional assignment, seeding the result with the first element and replacing it whenever a larger one turns up.",
    code: `fn max(arr, n) {
  best = arr[0]
  i = 1
  while(i < n) {
    if(arr[i] > best) {
      best = arr[i]
    }
    i = i + 1
  }
  return best
}

print(max([3, 17, 8, 42, 5], 5))`,
    output: `42`,
  },
  {
    title: "String Building",
    description:
      "Repeats a string a given number of times by concatenating it onto an accumulator in a loop. Demonstrates string concatenation and returning a string from a function.",
    code: `fn repeat(word, times) {
  out = ""
  i = 0
  while(i < times) {
    out = out + word
    i = i + 1
  }
  return out
}

print(repeat("ab", 3))
print(repeat("gabl", 1))`,
    output: `ababab
gabl`,
  },
];

export default function ExamplesPage() {
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
        Examples
      </h1>
      <p
        style={{
          color: "#8b949e",
          margin: "0 0 3.5rem",
          fontSize: "0.95rem",
        }}
      >
        Complete Gabl programs demonstrating the core features of the language.
      </p>

      {EXAMPLES.map(({ title, description, code, output }) => (
        <section
          key={title}
          style={{
            marginBottom: "4rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid #30363d",
          }}
        >
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "#e6edf3",
              margin: "0 0 0.5rem",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              color: "#8b949e",
              fontSize: "0.875rem",
              lineHeight: 1.7,
              margin: "0 0 1.25rem",
            }}
          >
            {description}
          </p>

          <CodeBlock>{code}</CodeBlock>

          <div style={{ marginTop: "1rem" }}>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#8b949e",
                margin: "0 0 0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontWeight: 600,
              }}
            >
              Output
            </p>
            <div
              style={{
                background: "#0d1117",
                border: "1px solid #30363d",
                borderRadius: "6px",
                padding: "1rem 1.5rem",
                fontFamily:
                  "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace",
                fontSize: "0.875rem",
                color: "#8b949e",
                whiteSpace: "pre",
              }}
            >
              {output}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
