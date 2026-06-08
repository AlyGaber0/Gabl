# Gabl
Gabl is a fully interpreted programming language written in C from empty files, including a hand-written lexer, recursive descent parser, AST evaluator, and scoped environment with parent-chain variable lookup.
The language supports integer arithmetic, variables, if/else conditionals, while loops, and first-class recursive functions. Every component of the interpreter was designed and implemented from scratch.
```
fn fib(n) {
if(n == 0) {
return 0
}
if(n == 1) {
return 1
}
return fib(n - 1) + fib(n - 2)
}
print(fib(10))
```
For full documentation, language reference, example programs, and installation instructions, visit the project site.
> Site coming soon

Built by Aly Gaber, McGill University
