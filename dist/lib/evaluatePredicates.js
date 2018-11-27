'use strict';

var PREDICATE_TYPES = {
  EXISTS: 'EXISTS',
  DOES_NOT_EXIST: 'DOES_NOT_EXIST',
  EQUALS: 'EQUALS',
  NOT_EQUALS: 'NOT_EQUALS',
  GREATER_THAN: 'GREATER_THAN',
  LESS_THAN: 'LESS_THAN',
  LESS_THAN_OR_EQUALS: 'LESS_THAN_OR_EQUALS',
  GREATER_THAN_OR_EQUALS: 'GREATER_THAN_OR_EQUALS'
};

module.exports = function evaluatePredicates(predicates, questionAnswers) {
  if (predicates === undefined) predicates = [];

  var combinePredicates = function combinePredicates(predicatessMet, predicate) {
    return predicatessMet && evaluatePredicate(predicate, questionAnswers);
  };
  return predicates.reduce(combinePredicates, true);
};

function evaluatePredicate(predicate, questionAnswers) {
  var answer = questionAnswers[predicate.questionId];
  switch (predicate.type) {
    case PREDICATE_TYPES.DOES_NOT_EXIST:
      return typeof answer === 'undefined';
    case PREDICATE_TYPES.EQUALS:
      return answer === predicate.value;
    case PREDICATE_TYPES.EXISTS:
      return typeof answer !== 'undefined';
    case PREDICATE_TYPES.GREATER_THAN:
      return answer > predicate.value;
    case PREDICATE_TYPES.GREATER_THAN_OR_EQUALS:
      return answer >= predicate.value;
    case PREDICATE_TYPES.LESS_THAN:
      return answer < predicate.value;
    case PREDICATE_TYPES.LESS_THAN_OR_EQUALS:
      return answer <= predicate.value;
    case PREDICATE_TYPES.NOT_EQUALS:
      return answer !== predicate.value;
    default:
      return answer === predicate.value;
  }
}