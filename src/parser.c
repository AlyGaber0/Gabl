#include "parser.h"
#include <stdio.h>
#include <stdlib.h>

ASTNode *ast_init(NodeType nodetype)
{
    ASTNode *node = malloc(sizeof(ASTNode));
    node->type = nodetype;
    node->left = NULL;
    node->right = NULL;
    node->next = NULL;
    return node;
}

ASTNode *parse_primary(Token *tokens, int *pos)
{
    Token token = tokens[*pos];
    if (token.type == TOKEN_NUMBER)
    {
        ASTNode *node = ast_init(NODE_NUMBER);
        node->data.num_value = atoi(token.value);
        (*pos)++;
        return node;
    }
    if (token.type == TOKEN_NAME)
    {
        ASTNode *node = ast_init(NODE_NAME);
        strcpy(node->data.name, token.value);
        (*pos)++;
        return node;
    }
}

ASTNode *parse_multiplication(Token *tokens, int *pos)
{
    ASTNode *left_node = parse_primary(tokens, pos);
    while (tokens[*pos].type == TOKEN_STAR || tokens[*pos].type == TOKEN_SLASH)
    {
        Token token = tokens[*pos];
        (*pos)++;
        ASTNode *right_node = parse_primary(tokens, pos);
        ASTNode *binop = ast_init(NODE_BINOP);
        binop->data.op = token.value[0];
        binop->left = left_node;
        binop->right = right_node;
        left_node = binop;
    }
    return left_node;
}

ASTNode *parse_addition(Token *tokens, int *pos)
{
    ASTNode *left_node = parse_multiplication(tokens, pos);
    while (tokens[*pos].type == TOKEN_PLUS || tokens[*pos].type == TOKEN_MINUS)
    {
        Token token = tokens[*pos];
        (*pos)++;
        ASTNode *right_node = parse_multiplication(tokens, pos);
        ASTNode *binop = ast_init(NODE_BINOP);
        binop->data.op = token.value[0];
        binop->left = left_node;
        binop->right = right_node;
        left_node = binop;
    }
    return left_node;
}

ASTNode *parse_comparison(Token *tokens, int *pos)
{
    ASTNode *left_node = parse_addition(tokens, pos);
    while (tokens[*pos].type == TOKEN_GREATER || tokens[*pos].type == TOKEN_LESS || tokens[*pos].type == TOKEN_EQUALS_EQUALS || tokens[*pos].type == TOKEN_BANG_EQUALS)
    {
        Token token = tokens[*pos];
        (*pos)++;
        ASTNode *right_node = parse_addition(tokens, pos);
        ASTNode *binop = ast_init(NODE_BINOP);
        binop->data.op = token.value[0];
        binop->left = left_node;
        binop->right = right_node;
        left_node = binop;
    }
    return left_node;
}

ASTNode *parse_expression(Token *tokens, int *pos)
{
    return parse_comparison(tokens, pos);
}

ASTNode *parse_statement(Token *tokens, int *pos){
    
}