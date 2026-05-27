#include "parser.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

ASTNode *parse_expression(Token *tokens, int *pos);

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
    if (token.type == TOKEN_LPAREN)
    {
        (*pos)++;
        ASTNode *expression = parse_expression(tokens, pos);
        (*pos)++;
        return expression;
    }
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
    return NULL;
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

ASTNode *parse_statement(Token *tokens, int *pos)
{
    Token token = tokens[*pos];
    if (token.type == TOKEN_PRINT)
    {
        ASTNode *print = ast_init(NODE_PRINT);
        (*pos)++;
        print->left = parse_expression(tokens, pos);
        return print;
    }
    else if (token.type == TOKEN_NAME && tokens[(*pos + 1)].type == TOKEN_EQUALS)
    {
        ASTNode *assign = ast_init(NODE_ASSIGN);
        strcpy(assign->data.name, token.value);
        (*pos) += 2;
        assign->right = parse_expression(tokens, pos);
        return assign;
    }
    else if (token.type == TOKEN_IF)
    {
        (*pos)++;
        ASTNode *expression = parse_expression(tokens, pos);
        (*pos)++;
        ASTNode *body = parse_statement(tokens, pos);
        ASTNode *current = body;
        while (tokens[*pos].type != TOKEN_END && tokens[*pos].type != TOKEN_ELSE)
        {
            ASTNode *body = parse_statement(tokens, pos);
            current->next = body;
            current = body;
        }
        TokenType stop = tokens[*pos].type;
        (*pos)++;
        ASTNode *else_body = NULL;
        if (stop == TOKEN_ELSE)
        {
            else_body = parse_statement(tokens, pos);
            ASTNode *else_current = else_body;
            while (tokens[*pos].type != TOKEN_END)
            {
                else_body = parse_statement(tokens, pos);
                else_current->next = else_body;
                else_current = else_body;
            }
            (*pos)++;
        }
        ASTNode *if_node = ast_init(NODE_IF);
        if_node->left = expression;
        if_node->right = body;
        if_node->next = else_body;
        return if_node;
    }

    else
    {
        return parse_expression(tokens, pos);
    }
}

ASTNode *parse_program(Token *tokens, int *pos)
{
    ASTNode *initial = parse_statement(tokens, pos);
    ASTNode *current = initial;
    while (tokens[*pos].type != TOKEN_EOF)
    {
        ASTNode *next = parse_statement(tokens, pos);
        current->next = next;
        current = next;
    }
    return initial;
}