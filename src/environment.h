#ifndef ENVIRONMENT_H
#define ENVIRONMENT_H
#include "parser.h"

#define ARRAY_CAPACITY 64

typedef enum
{
    TYPE_NUMBER,
    TYPE_STRING,
    TYPE_ARRAY
} ResultType;

typedef struct ArrayStruct
{
    struct Result *elements;
    int count;
} ArrayStruct;
typedef struct Result
{
    ResultType type;
    union
    {
        long num_result;
        char string_result[ARRAY_CAPACITY];
        ArrayStruct arr;

    } type_data;
} Result;
typedef struct Entry
{
    char name[64];
    Result value;
} Entry;

typedef struct Environment
{
    Entry arr[256];
    int entries;
    struct Environment *parent;
    int return_flag;
} Environment;

void env_set(Environment *env, char name[], Result value);
Result env_get(Environment *env, char name[]);
Environment *env_create(Environment *parent);
ArrayStruct *array_create();

#endif