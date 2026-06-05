#include "evaluator.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

long eval(ASTNode *node, Environment *env)
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
        long left = eval(node->left, env);
        long right = eval(node->right, env);
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
        long value = eval(node->right, env);
        env_set(env, node->data.name, value);
        return value;
    }
    case NODE_PRINT:
    {
        long value = eval(node->left, env);
        printf("%ld\n", value);
        return 0;
    }
    case NODE_IF:
    {
        long condition = eval(node->left, env);
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
    case NODE_FUNCTION_DEF:
    {
        env_set(env, node->data.name, (long)node);
        return 0;
    }
    case NODE_FUNCTION_CALL:
    {
        ASTNode *fn = (ASTNode *)env_get(env, node->data.name);
        Environment *new_env = env_create(env);
        ASTNode *arg = node->left;
        int i = 0;
        while (arg != NULL)
        {
            long val = eval(arg, env);
            env_set(new_env, fn->params[i], val);
            arg = arg->next;
            i++;
        }
        ASTNode *stmnt = fn->right;
        long result = 0;
        while (stmnt != NULL)
        {
            result = eval(stmnt, new_env);
            stmnt = stmnt->next;
        }
        return result;
    }
    case NODE_RETURN:
    {
        return eval(node->left, env);
    }
    default:
        return 0;
    }
    return 0;
}