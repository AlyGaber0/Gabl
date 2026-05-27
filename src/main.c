#include "lexer.h"
#include "parser.h"
#include "evaluator.h"
#include "environment.h"
#include <stdio.h>
#include <stdlib.h>
int main(void)
{
    char *source =
        "y = 0\n"
        "x = y + (5 * 3)\n"
        "print x\n"
        "if x > 20 then\n"
        "print y\n"
        "else\n"
        "print x\n"
        "end";
    Lexer lexer = lexer_init(source);
    Token *tokens = tokenize(&lexer);

    int pos = 0;
    ASTNode *program = parse_program(tokens, &pos);

    Environment env;
    env.entries = 0;

    ASTNode *current = program;
    while (current != NULL)
    {
        eval(current, &env);
        current = current->next;
    }

    free(tokens);
    return 0;
}