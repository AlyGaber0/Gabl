#include "evaluator.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>


static long return_value = 0;

// static uint8_t func_depth = 0;

// int max_depth()
// {
//     return 0;
// }

// int track_depth(Environment *env, ASTNode *node, int *prev_depth)
// {
//     int curr_func_depth;

//     // depth decrement
//     ASTNode *stmnt = eval(node->right, env);
//     if (stmnt == NULL)
//     {
//         // make sure return flag is 0

//         curr_func_depth = prev_depth--;
//     }

//     // depth increment

//     return curr_func_depth;
// }

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
            ASTNode *stmnt = node->right;
            while (stmnt != NULL)
            {
                long val = eval(stmnt, env);
                if (env->return_flag)
                    return return_value;
                stmnt = stmnt->next;
            }
        }
        else if (node->else_body != NULL)
        {
            ASTNode *stmnt = node->else_body;
            while (stmnt != NULL)
            {
                long val = eval(stmnt, env);
                if (env->return_flag)
                    return return_value;
                stmnt = stmnt->next;
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
            if (new_env->return_flag)
                break;
            result = eval(stmnt, new_env);
            stmnt = stmnt->next;
        }
        long final_result = new_env->return_flag ? return_value : result;
        return final_result;
    }
    case NODE_RETURN:
    {
        env->return_flag = 1;
        return_value = eval(node->left, env);
        return return_value;
    }
    case NODE_WHILE:
    {
        long condition = eval(node->left, env);
        while (condition)
        {
            ASTNode *stmnt = node->right;
            while (stmnt != NULL)
            {
                long val = eval(stmnt, env);
                if (env->return_flag)
                    return return_value;
                stmnt = stmnt->next;
            }
            condition = eval(node->left, env);
        }
        return 0;
    }
    default:
        return 0;
    }
    return 0;
}