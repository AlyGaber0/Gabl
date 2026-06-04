#ifndef PARSER_H
#define PARSER_H
#include "lexer.h"

typedef enum
{
    NODE_NUMBER,
    NODE_BINOP,
    NODE_NAME,
    NODE_IF,
    NODE_ASSIGN,
    NODE_PRINT,
    NODE_FUNCTION_DEF,
    NODE_FUNCTION_CALL,
    NODE_RETURN,
    NODE_BLOCK
} NodeType;

typedef struct ASTNode
{
    NodeType type;
    union
    {
        int num_value;
        char op;
        char name[64];
    } data;
    struct ASTNode *left;
    struct ASTNode *right;
    struct ASTNode *next;
    struct ASTNode *else_body;
    char params[8][64];
    int param_count;
} ASTNode;

ASTNode *ast_init(NodeType nodetype);
ASTNode *parse_program(Token *tokens, int *pos);
ASTNode *parse_statement(Token *tokens, int *pos);
ASTNode *parse_expression(Token *tokens, int *pos);

#endif