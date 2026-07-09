#ifndef EVALUATOR_H
#define EVALUATOR_H
#include "environment.h"
#include "parser.h"

Result eval(ASTNode *node, Environment *env);

#endif
