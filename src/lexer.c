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

char peek(Lexer *lexer)
{
    if (lexer->pos >= lexer->len)
        return '\0';
    return lexer->string[lexer->pos];
}

char advance(Lexer *lexer)
{
    char c = peek(lexer);
    lexer->pos += 1;
    return c;
}

void skip_whitespace(Lexer *lexer)
{
    while (isspace(peek(lexer)))
    {
        advance(lexer);
    }
}

Token read_number(Lexer *lexer)
{
    Token token;
    char buf[64];
    int i = 0;
    while (isdigit(peek(lexer)))
    {
        buf[i] = advance(lexer);
        i++;
    }
    buf[i] = '\0';
    strcpy(token.value, buf);
    token.type = TOKEN_NUMBER;
    return token;
}

Token read_name(Lexer *lexer)
{
    Token token;
    char buf[64];
    int i = 0;
    while (isalnum(peek(lexer)))
    {
        buf[i] = advance(lexer);
        i++;
    }
    buf[i] = '\0';
    strcpy(token.value, buf);
    if (strcmp(buf, "print") == 0)
        token.type = TOKEN_PRINT;
    else if (strcmp(buf, "if") == 0)
        token.type = TOKEN_IF;
    else if (strcmp(buf, "else") == 0)
        token.type = TOKEN_ELSE;
    else if (strcmp(buf, "end") == 0)
        token.type = TOKEN_END;
    else if (strcmp(buf, "then") == 0)
        token.type = TOKEN_THEN;
    else if (strcmp(buf, "function") == 0)
        token.type = TOKEN_FUNCTION;
    else if (strcmp(buf, "return") == 0)
        token.type = TOKEN_RETURN;
    else
        token.type = TOKEN_NAME;
    return token;
}

Token next_token(Lexer *lexer)
{
    skip_whitespace(lexer);
    char c = peek(lexer);
    Token token;

    if (c == '\0')
    {
        token.type = TOKEN_EOF;
        strcpy(token.value, "EOF");
        return token;
    }

    if (isdigit(c))
    {
        return read_number(lexer);
    }
    if (isalpha(c))
    {
        return read_name(lexer);
    }

    advance(lexer);

    switch (c)
    {
    case '+':
        token.type = TOKEN_PLUS;
        strcpy(token.value, "+");
        break;
    case '-':
        token.type = TOKEN_MINUS;
        strcpy(token.value, "-");
        break;
    case '*':
        token.type = TOKEN_STAR;
        strcpy(token.value, "*");
        break;
    case '/':
        token.type = TOKEN_SLASH;
        strcpy(token.value, "/");
        break;
    case '(':
        token.type = TOKEN_LPAREN;
        strcpy(token.value, "(");
        break;
    case ')':
        token.type = TOKEN_RPAREN;
        strcpy(token.value, ")");
        break;
    case '=':
        if (peek(lexer) == '=')
        {
            advance(lexer);
            token.type = TOKEN_EQUALS_EQUALS;
            strcpy(token.value, "==");
        }
        else
        {
            token.type = TOKEN_EQUALS;
            strcpy(token.value, "=");
        }
        break;
    case '!':
        if (peek(lexer) == '=')
        {
            advance(lexer);
            token.type = TOKEN_BANG_EQUALS;
            strcpy(token.value, "!=");
        }
        break;
    case '>':
        token.type = TOKEN_GREATER;
        strcpy(token.value, ">");
        break;
    case '<':
        token.type = TOKEN_LESS;
        strcpy(token.value, "<");
        break;
    }

    return token;
}

Token *tokenize(Lexer *lexer)
{
    Token *arr = malloc(sizeof(Token) * 256);
    for (int i = 0; i < 256; i++)
    {
        Token token = next_token(lexer);
        if (token.type == TOKEN_EOF)
        {
            arr[i] = token;
            break;
        }
        arr[i] = token;
    }
    return arr;
}