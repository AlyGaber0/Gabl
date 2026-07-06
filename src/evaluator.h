#ifndef EVALUATOR_H
#define EVALUATOR_H
#include "environment.h"
#include "parser.h"

long eval(ASTNode *node, Environment *env);

#endif
