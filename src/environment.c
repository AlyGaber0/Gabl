#include "environment.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void env_set(Environment *env, char name[], int value)
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

int env_get(Environment *env, char name[])
{
    for (int i = 0; i < env->entries; i++)
    {
        if (strcmp(env->arr[i].name, name) == 0)
        {
            return env->arr[i].value;
        }
    }
    return -1;
}
