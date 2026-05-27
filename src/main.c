#include "lexer.h"
#include "parser.h"
#include <stdio.h>

void print_ast(ASTNode *node)
{
    if (node == NULL)
        return;
    switch (node->type)
    {
    case NODE_NUMBER:
        printf("NUMBER(%d)\n", node->data.num_value);
        break;
    case NODE_NAME:
        printf("NAME(%s)\n", node->data.name);
        break;
    case NODE_BINOP:
        printf("BINOP(%c)\n", node->data.op);
        break;
    case NODE_ASSIGN:
        printf("ASSIGN(%s)\n", node->data.name);
        break;
    case NODE_PRINT:
        printf("PRINT\n");
        break;
    default:
        printf("OTHER\n");
        break;
    }
    print_ast(node->left);
    print_ast(node->right);
    print_ast(node->next);
}
int main(void)
{
    Lexer lexer = lexer_init("x = 10 + (5*2)");
    Token *tokens = tokenize(&lexer);
    int pos = 0;
    ASTNode *tree = parse_program(tokens, &pos);
    print_ast(tree);
    return 0;
}