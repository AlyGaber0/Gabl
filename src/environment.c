#include "environment.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void env_set(Environment *env, char name[], Result value)
{
    for (int i = 0; i < env->entries; i++)
    {
        if (strcmp(env->arr[i].name, name) == 0)
        {
            Entry *data = &env->arr[i];
            data->value = value;
            return;
        }
    }
    Entry *data = &env->arr[env->entries];
    strcpy(data->name, name);
    data->value = value;
    (env->entries)++;
}

Result env_get(Environment *env, char name[])
{
    for (int i = 0; i < env->entries; i++)
    {
        if (strcmp(env->arr[i].name, name) == 0)
        {
            return env->arr[i].value;
        }
    }
    if (env->parent != NULL)
    {
        return env_get(env->parent, name);
    }
    fprintf(stderr, "Error: %s is undefined.\n", name);
    exit(1);
}

Environment *env_create(Environment *parent)
{
    Environment *new_env = malloc(sizeof(Environment));
    memset(new_env, 0, sizeof(Environment));
    new_env->entries = 0;
    new_env->parent = parent;
    return new_env;
}

ArrayStruct *array_create()
{
    ArrayStruct *new_arr = malloc(sizeof(ArrayStruct));
    new_arr->arr = malloc(sizeof(Result) * 64);
    new_arr->count = 0;
    return new_arr;
}