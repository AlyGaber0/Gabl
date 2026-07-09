#include "lexer.h"
#include "parser.h"
#include "evaluator.h"
#include "environment.h"
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    if (argc < 2)
    {
        fprintf(stderr, "Usage: gabl <file.gabl>\n");
        return 1;
    }
    FILE *file = fopen(argv[1], "r");
    if (file == NULL)
    {
        fprintf(stderr, "Error: could not open file %s\n", argv[1]);
        return 1;
    }

    char source[4096];
    int i = 0;
    int c;
    while ((c = fgetc(file)) != EOF)
    {
        source[i++] = c;
    }
    source[i] = '\0';
    fclose(file);

    Lexer lexer = lexer_init(source);
    Token *tokens = tokenize(&lexer);

    int pos = 0;
    ASTNode *program = parse_program(tokens, &pos);

    Environment env;
    env.entries = 0;
    env.parent = NULL;
    env.return_flag = 0;
    return_value_init();

    ASTNode *current = program;
    while (current != NULL)
    {
        eval(current, &env);
        current = current->next;
    }

    free(tokens);
    return 0;
}