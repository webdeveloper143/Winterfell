var React = require('react');
var _     = require('lodash').noConflict();

var Question = require('./question');

class QuestionSet extends React.Component {

  render() {
    var mappingConditionalItems = [];
    var questions = this.props.questions.map(question => {
      if (typeof question.mappingConditions !== 'undefined') {
        let isSatisfied = 0;
        question.mappingConditions.forEach(condition => {
          let conditionCount = 0;
          let conditionSuccessCount = 0;
          Object.keys(condition).forEach(questionId => {
            conditionCount += 1;
            if (this.props.questionAnswers[questionId] !== undefined) { 
              if (
                Array.isArray(condition[questionId]) && Array.isArray(this.props.questionAnswers[questionId]) &&
                _.intersection(condition[questionId], this.props.questionAnswers[questionId]).length > 0
              ) {
                conditionSuccessCount += 1;
              }else if (
                Array.isArray(condition[questionId]) &&
                condition[questionId].indexOf(
                  this.props.questionAnswers[questionId]
                ) > -1
              ) {
                conditionSuccessCount += 1;
              } else if (
                !Array.isArray(condition[questionId]) &&
                condition[questionId] ===
                  this.props.questionAnswers[questionId]
              ) {
                conditionSuccessCount += 1;
              }
            }
          });
          if (conditionCount === conditionSuccessCount) {
            isSatisfied++;
          }
        });
        if (isSatisfied) {
          mappingConditionalItems.push(
            <Question key={question.questionId}
                      questionSetId={this.props.id}
                      questionContainerClass={question.questionContainerClass}
                      questionId={question.questionId}
                      question={question.question}
                      validateOn={question.validateOn}
                      validations={question.validations}
                      text={question.text}
                      postText={question.postText}
                      value={this.props.questionAnswers[question.questionId]}
                      input={question.input}
                      displayConfirmationNeed={question.displayConfirmationNeed}
                      classes={this.props.classes}
                      renderError={this.props.renderError}
                      renderRequiredAsterisk={this.props.renderRequiredAsterisk}
                      questionAnswers={this.props.questionAnswers}
                      validationErrors={this.props.validationErrors}
                      onAnswerChange={this.props.onAnswerChange}
                      onQuestionBlur={this.props.onQuestionBlur}
                      onKeyDown={this.props.onKeyDown} />
          );
        }
        return '';
      } else {
        return (
            <Question key={question.questionId}
                      questionSetId={this.props.id}
                      questionContainerClass={question.questionContainerClass}
                      questionId={question.questionId}
                      question={question.question}
                      validateOn={question.validateOn}
                      validations={question.validations}
                      text={question.text}
                      postText={question.postText}
                      value={this.props.questionAnswers[question.questionId]}
                      input={question.input}
                      displayConfirmationNeed={question.displayConfirmationNeed}
                      classes={this.props.classes}
                      renderError={this.props.renderError}
                      renderRequiredAsterisk={this.props.renderRequiredAsterisk}
                      questionAnswers={this.props.questionAnswers}
                      validationErrors={this.props.validationErrors}
                      onAnswerChange={this.props.onAnswerChange}
                      onQuestionBlur={this.props.onQuestionBlur}
                      onKeyDown={this.props.onKeyDown} />
        );
      }
    });

    function createMarkup(questionSetHtml) {
      return {__html: questionSetHtml};
    }
    return (
      <div className={this.props.classes.questionSet + this.props.questionSetClass}>
        {typeof this.props.questionSetHeader !== 'undefined'
           || typeof this.props.questionSetText !== 'undefined'
           || typeof this.props.questionSetHtml !== 'undefined'
           ? (
               <div className={this.props.classes.questionSetHeaderContainer}>
                {typeof this.props.questionSetHeader !== 'undefined'
                  ? <h4 className={this.props.classes.questionSetHeader}>
                      {this.props.questionSetHeader}
                    </h4>
                  : undefined}
                {typeof this.props.questionSetText !== 'undefined'
                  ? <p className={this.props.classes.questionSetText}>
                      {this.props.questionSetText}
                    </p>
                  : undefined}
                {typeof this.props.questionSetHtml !== 'undefined'
                  ? (
                  <div dangerouslySetInnerHTML={createMarkup(this.props.questionSetHtml)} />
                  )
                : undefined}
               </div>
             )
             : undefined}
        {questions}
        {mappingConditionalItems}
        </div>
    );
  }

};

QuestionSet.defaultProps = {
  id                     : undefined,
  name                   : '',
  questionSetHeader      : undefined,
  questionSetText        : undefined,
  questionSetHtml        : undefined,
  questions              : [],
  questionAnswers        : {},
  classes                : {},
  questionSetClass       : '',
  validationErrors       : {},
  renderError            : undefined,
  renderRequiredAsterisk : undefined,
  onAnswerChange         : () => {},
  onQuestionBlur         : () => {},
  onKeyDown              : () => {}
};

module.exports = QuestionSet;