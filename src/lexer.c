#include "lexer.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

Lexer lexer_init(char *source)
{
    Lexer lexer;
    lexer.string = source;
    lexer.pos = 0;
    lexer.len = strlen(source);
    return lexer;
}

char peek(Lexer *lexer){
    if(lexer->pos >= lexer->len) return '\0';
    return lexer->string[lexer->pos];
}

char advance(Lexer *lexer){
    char c = peek(lexer);
    lexer->pos += 1;
    return c;
}

void skip_whitespace(Lexer *lexer){
    while(isspace())
}