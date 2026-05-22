typedef enum {
TOKEN_NUMBER,  // numbers like 5 or 42
TOKEN_PLUS,  // +
TOKEN_MINUS,  // -
TOKEN_STAR,  // *
TOKEN_SLASH,  // /
TOKEN_EQUALS,  // =
TOKEN_EQUALS_EQUALS,  // ==
TOKEN_BANG_EQUALS,  // !=
TOKEN_GREATER,  // >
TOKEN_LESS, // <
TOKEN_NAME,  // variable names like x or y
TOKEN_PRINT,  // the word print
TOKEN_IF,  // the word if
TOKEN_ELSE,  // the word else
TOKEN_END,  // the word end
TOKEN_THEN,  // the word then
TOKEN_FUNCTION,  // the word function
TOKEN_RETURN,  // the word return
TOKEN_LPAREN,  // (
TOKEN_RPAREN,  // )
TOKEN_EOF  // end of input
} TokenType;

typedef struct {
    TokenType type;
    char value[64];
} Token;

