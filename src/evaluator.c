#include "evaluator.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int eval(ASTNode *node, Environment *env)
{
    if (node == NULL)
        return 0;
    switch (node->type)
    {
    case NODE_NUMBER:
        return node->data.num_value;
    case NODE_NAME:
        return env_get(env, node->data.name);
    case NODE_BINOP:
    {
        int left = eval(node->left, env);
        int right = eval(node->right, env);
        switch (node->data.op)
        {
        case '+':
            return left + right;
        case '-':
            return left - right;
        case '*':
            return left * right;
        case '/':
            return left / right;
        case '>':
            return left > right;
        case '<':
            return left < right;
        case '=':
            return left == right;
        case '!':
            return left != right;
        }
        break;
    }
    case NODE_ASSIGN:
    {
        int value = eval(node->right, env);
        env_set(env, node->data.name, value);
        return value;
    }
    case NODE_PRINT:
    {
        int value = eval(node->left, env);
        printf("%d\n", value);
        return 0;
    }
    case NODE_IF:
    {
        int condition = eval(node->left, env);
        if (condition)
        {
            ASTNode *statemnt = node->right;
            while (statemnt != NULL)
            {
                eval(statemnt, env);
                statemnt = statemnt->next;
            }
        }
        else if (node->else_body != NULL)
        {
            ASTNode *statemnt = node->else_body;
            while (statemnt != NULL)
            {
                eval(statemnt, env);
                statemnt = statemnt->next;
            }
        }
        return 0;
    }
    default:
        return 0;
    }
    return 0;
}