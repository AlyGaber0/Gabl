#ifndef ENVIRONMENT_H
#define ENVIRONMENT_H
#include "parser.h"

typedef struct Entry
{
    char name[64];
    int value;
} Entry;

typedef struct Environment
{
    Entry arr[256];
    int entries;
} Environment;

void env_set(Environment *env, char name[], int value);
int env_get(Environment *env, char name[]);

#endif