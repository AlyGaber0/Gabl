#ifndef LEXER_H
#define LEXER_H

typedef enum
{
    TOKEN_NUMBER,        // numbers
    TOKEN_PLUS,          // +
    TOKEN_MINUS,         // -
    TOKEN_STAR,          // *
    TOKEN_SLASH,         // /
    TOKEN_EQUALS,        // =
    TOKEN_EQUALS_EQUALS, // ==
    TOKEN_BANG_EQUALS,   // !=
    TOKEN_GREATER,       // >
    TOKEN_LESS,          // <
    TOKEN_STRING,        // string literals
    TOKEN_NAME,          // variable names
    TOKEN_PRINT,         // the word print
    TOKEN_IF,            // the word if
    TOKEN_ELSE,          // the word else
    TOKEN_FUNCTION,      // the word function
    TOKEN_RETURN,        // the word return
    TOKEN_LPAREN,        // (
    TOKEN_RPAREN,        // )
    TOKEN_EOF,           // end of input
    TOKEN_LBRACE,        // for {
    TOKEN_RBRACE,        // for }
    TOKEN_TRUE,
    TOKEN_FALSE,
    TOKEN_FN,
    TOKEN_WHILE,
    TOKEN_FOR,
    TOKEN_SLASH_SLASH,
    TOKEN_COMMA
} TokenType;

typedef struct
{
    TokenType type;
    char value[64];
} Token;

typedef struct
{
    char *string;
    int pos;
    int len;
} Lexer;

Lexer lexer_init(char *source);
Token next_token(Lexer *lexer);
Token *tokenize(Lexer *lexer);

#endif
