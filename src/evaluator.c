#include "evaluator.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static Result return_value;
void return_value_init()
{
    return_value.type = TYPE_NUMBER;
    return_value.type_data.num_result = 0;
}

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

Result result_create_numb(long value)
{
    Result local;
    local.type = TYPE_NUMBER;
    local.type_data.num_result = value;
    return local;
}

Result result_create_str(char name[])
{
    Result local;
    local.type = TYPE_STRING;
    strcpy(local.type_data.string_result, name);
    return local;
}

Result eval(ASTNode *node, Environment *env)
{
    if (node == NULL)
        return result_create_numb(0);

    switch (node->type)
    {
    case NODE_NUMBER:
        return result_create_numb(node->data.num_value);
    case NODE_NAME:
        return env_get(env, node->data.name);
    case NODE_STRING:
        return result_create_str(node->data.name);
    case NODE_BINOP:
    {
        Result left = eval(node->left, env);
        Result right = eval(node->right, env);
        switch (node->data.op)
        {
        case '+':
            if (left.type == TYPE_NUMBER && right.type == TYPE_NUMBER)
                return result_create_numb(left.type_data.num_result + right.type_data.num_result);
            else if (left.type == TYPE_STRING && right.type == TYPE_STRING)
            {
                Result local;
                local.type = TYPE_STRING;
                strcpy(local.type_data.string_result, left.type_data.string_result);
                strcat(local.type_data.string_result, right.type_data.string_result);
                return result_create_str(local.type_data.string_result);
            }
            else
            {
                fprintf(stderr, "Error: cannot concatenate string and a number.\n");
                exit(1);
            }
        case '-':
            return result_create_numb(left.type_data.num_result - right.type_data.num_result);
        case '*':
            return result_create_numb(left.type_data.num_result * right.type_data.num_result);
        case '/':
            return result_create_numb(left.type_data.num_result / right.type_data.num_result);
        case '>':
            return result_create_numb(left.type_data.num_result > right.type_data.num_result);
        case '<':
            return result_create_numb(left.type_data.num_result < right.type_data.num_result);
        case '=':
            if (left.type == TYPE_NUMBER && right.type == TYPE_NUMBER)
                return result_create_numb(left.type_data.num_result == right.type_data.num_result);
            else if (left.type == TYPE_STRING && right.type == TYPE_STRING)
                return result_create_numb(strcmp(left.type_data.string_result, right.type_data.string_result) == 0);
            else
            {
                fprintf(stderr, "Error: cannot compare string and a number.\n");
                exit(1);
            }
        case '!':
            if (left.type == TYPE_NUMBER && right.type == TYPE_NUMBER)
                return result_create_numb(left.type_data.num_result != right.type_data.num_result);
            else if (left.type == TYPE_STRING && right.type == TYPE_STRING)
                return result_create_numb(strcmp(left.type_data.string_result, right.type_data.string_result) != 0);
            else
            {
                fprintf(stderr, "Error: cannot compare string and a number.\n");
                exit(1);
            }
        }
        break;
    }
    case NODE_ASSIGN:
    {
        Result value = eval(node->right, env);
        env_set(env, node->data.name, value);
        return value;
    }
    case NODE_PRINT:
    {
        Result value = eval(node->left, env);
        if (value.type == TYPE_NUMBER)
            printf("%ld\n", value.type_data.num_result);
        else
            printf("%s\n", value.type_data.string_result);
        return result_create_numb(0);
    }
    case NODE_IF:
    {
        Result condition = eval(node->left, env);
        if (condition.type_data.num_result)
        {
            ASTNode *stmnt = node->right;
            while (stmnt != NULL)
            {
                Result val = eval(stmnt, env);
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
                Result val = eval(stmnt, env);
                if (env->return_flag)
                    return return_value;
                stmnt = stmnt->next;
            }
        }
        return result_create_numb(0);
    }
    case NODE_FUNCTION_DEF:
    {
        env_set(env, node->data.name, result_create_numb((long)node));
        return result_create_numb(0);
    }
    case NODE_FUNCTION_CALL:
    {
        Result temp = env_get(env, node->data.name);
        long temp2 = temp.type_data.num_result;
        ASTNode *fn = (ASTNode *)temp2;
        Environment *new_env = env_create(env);
        ASTNode *arg = node->left;
        int i = 0;
        while (arg != NULL)
        {
            Result val = eval(arg, env);
            env_set(new_env, fn->params[i], val);
            arg = arg->next;
            i++;
        }

        ASTNode *stmnt = fn->right;
        Result result = result_create_numb(0);
        while (stmnt != NULL)
        {
            if (new_env->return_flag)
                break;
            result = eval(stmnt, new_env);
            stmnt = stmnt->next;
        }
        Result final_result = new_env->return_flag ? return_value : result;
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
        Result condition = eval(node->left, env);
        while (condition.type_data.num_result)
        {
            ASTNode *stmnt = node->right;
            while (stmnt != NULL)
            {
                Result val = eval(stmnt, env);
                if (env->return_flag)
                    return return_value;
                stmnt = stmnt->next;
            }
            condition = eval(node->left, env);
        }
        return result_create_numb(0);
    }
    default:
        return result_create_numb(0);
    }
    return result_create_numb(0);
}