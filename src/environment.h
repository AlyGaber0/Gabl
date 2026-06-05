#ifndef ENVIRONMENT_H
#define ENVIRONMENT_H
#include "parser.h"

typedef struct Entry
{
    char name[64];
    long value;
} Entry;

typedef struct Environment
{
    Entry arr[256];
    int entries;
    struct Environment *parent;
} Environment;

void env_set(Environment *env, char name[], long value);
long env_get(Environment *env, char name[]);
Environment *env_create(Environment *parent);

#endif