#ifndef EVALUATOR_H
#define EVALUATOR_H
#include "environment.h"
#include "parser.h"

void return_value_init();
Result eval(ASTNode *node, Environment *env);

#endif
