
#include "lexer.h"
#include <stdio.h>

int main(void)
{

    Lexer lexer = lexer_init("x = 10 + y * 2");
    Token *tokens = tokenize(&lexer);
    int i = 0;
    while (tokens[i].type != TOKEN_EOF)
    {
        printf("%s\n", tokens[i].value);
        i++;
    }
    printf("%s\n", tokens[i].value);

    return 0;
}