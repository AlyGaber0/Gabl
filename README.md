# Gabl

Gabl is a fully interpreted programming language I wrote in C from scratch. That means a hand written lexer, a recursive descent parser, an AST evaluator, and a scoped environment with parent-chain variable lookup; no libraries, no generators, no shortcuts.

[Full documentation, language reference, and examples at the project site.](https://alygaber0.github.io/Gabl)

## How it works

Source text goes through three stages. The lexer scans it character by character and produces a flat stream of typed tokens. The parser consumes that stream and builds an abstract syntax tree using recursive descent, where operator precedence falls out of the function call structure rather than any lookup table. The evaluator then walks that tree recursively, executing each node against a scoped environment that resolves variables by following a parent pointer chain up through enclosing scopes.

## Why I made the decisions I did

**Recursive descent over a parser generator.** Each grammar rule is just a function, and the call stack itself builds the parse tree. It is more code than using a tool, but every line of it is readable and maps directly to the language grammar. I wanted to understand what a parser actually does, and writing it by hand is the only way to do that.

**Scope as a linked list of environment frames.** Every function call creates a new environment struct with a parent pointer back to the enclosing scope. Variable lookup walks that chain until it finds a match or hits NULL. It handles nested functions, recursion, and shadowing cleanly in about 50 lines of C, and it mirrors how real runtimes manage call frames.

**Tagged unions for AST nodes.** C has no sum types, so each node carries a type enum and a union of possible payloads. Designing that layout before writing the evaluator forced me to enumerate every syntactic shape the language can take upfront, which made the evaluator itself surprisingly straightforward to write.

**Per-frame return flags instead of a global.** Return propagation uses a flag on each environment frame rather than a single global. A global flag bleeds across function boundaries, a return inside a nested call would signal the caller to return before finishing its own expression. Moving the flag into the frame ties its lifetime to the call it belongs to.

## Bugs that actually taught me something

**The global return_flag.** I knew early on that returns were not propagating correctly between function calls and that recursive functions were not receiving base case return values. The moment it clicked was when I tested a function that called another function inside a return expression and added to the result. The outer function was reading the inner function's return flag as its own signal to exit early, before it ever finished the rest of the expression. Moving the flag into each environment frame so no call can touch another's was the fix, and it completely changed how I think about interpreter state.

**The uninitialized root environment.** This one I had no idea about until I had gone through every other possibility. The program was segfaulting on undefined variable lookups and I could not find why. When I went to add a return_flag field to the environment struct and initialize it properly on every new frame, I realized I had never properly initialized the root environment in main.c at all. I was setting entries to 0 but leaving the parent pointer pointing at whatever garbage happened to be in that stack memory. env_get was walking up the chain, hitting that garbage address, and crashing. Explicit NULL initialization fixed it immediately. It is the kind of bug that only exists in C and that you only really understand by hitting it yourself.

## Building and running

```
make
./gabl yourfile.gabl
```

To clean up the binary:

```
make clean
```

Full language reference, examples, and installation walkthrough at the [project site](https://alygaber0.github.io/Gabl).

---

Built by Aly Gaber, McGill University
