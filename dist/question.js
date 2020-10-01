'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fortawesomeReactFontawesome = require('@fortawesome/react-fontawesome');

var React = require('react');
var _ = require('lodash').noConflict();

var InputTypes = require('./inputTypes');

var Question = (function (_React$Component) {
  _inherits(Question, _React$Component);

  function Question(props) {
    _classCallCheck(this, Question);

    _get(Object.getPrototypeOf(Question.prototype), 'constructor', this).call(this, props);
    var displayConfirmationNeed = this.props.displayConfirmationNeed;
    if (displayConfirmationNeed && this.props.value !== undefined && this.props.value !== '') {
      displayConfirmationNeed = false;
    }
    this.state = {
      displayConfirmationNeed: displayConfirmationNeed
    };
  }

  _createClass(Question, [{
    key: 'handleInputChange',
    value: function handleInputChange(questionId, value, progress) {
      this.props.onAnswerChange(questionId, value, this.props.validations, this.props.validateOn, progress);
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(questionId, value) {
      this.props.onQuestionBlur(questionId, value, this.props.validations, this.props.validateOn);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var Input = InputTypes[this.props.input.type];
      if (!Input) {
        throw new Error('Winterfell: Input Type "' + this.props.input.type + '" not defined as Winterfell Input Type');
      }

      /*
       * Conditional Questions
       *
       * Go through the inputs options and filter them down
       * to options where the value matches the current questions
       * value. If we have conditional questions on a given option,
       * then render this component with the props for the conditional
       * question.
       */
      var conditionalItems = [];
      var conditionalAnswers = {};
      var mappingConditionalAnswers = {};
      if (typeof this.props.input.options !== 'undefined') {
        this.props.input.options.filter(function (option) {
          return _this.props.value instanceof Array ? _this.props.value.indexOf(option.value) > -1 : _this.props.value == option.value;
        }).filter(function (option) {
          return typeof option.conditionalQuestions !== 'undefined' && option.conditionalQuestions.length > 0;
        }).forEach(function (option) {
          return [].forEach.bind(option.conditionalQuestions, function (conditionalQuestion) {
            if (conditionalQuestion.questionSetId !== 'undefined') {
              var QuestionSet;
              if (_this._reactInternalFiber._debugOwner !== undefined) {
                QuestionSet = _this._reactInternalFiber._debugOwner.elementType;
              } else {
                // @Todo need to change as dynamic .return.return.return
                QuestionSet = _this._reactInternalFiber['return']['return']['return'].elementType;
              }
              conditionalItems.push(React.createElement(QuestionSet, { key: conditionalQuestion.questionSetId,
                id: conditionalQuestion.questionSetId,
                name: conditionalQuestion.name,
                questionSetHeader: conditionalQuestion.questionSetHeader,
                questionSetText: conditionalQuestion.questionSetText,
                questionSetHtml: conditionalQuestion.questionSetHtml,
                questions: conditionalQuestion.questions,
                questionSetClass: conditionalQuestion.questionSetClass,
                classes: _this.props.classes,
                questionAnswers: _this.props.questionAnswers,
                renderError: _this.props.renderError,
                renderRequiredAsterisk: _this.props.renderRequiredAsterisk,
                validationErrors: _this.props.validationErrors,
                onAnswerChange: _this.props.onAnswerChange,
                onQuestionBlur: _this.props.onQuestionBlur,
                onKeyDown: _this.props.onKeyDown }));
            } else {
              conditionalItems.push(React.createElement(Question, { key: conditionalQuestion.questionId,
                questionSetId: _this.props.questionSetId,
                questionContainerClass: conditionalQuestion.questionContainerClass,
                questionId: conditionalQuestion.questionId,
                question: conditionalQuestion.question,
                text: conditionalQuestion.text,
                postText: conditionalQuestion.postText,
                validateOn: conditionalQuestion.validateOn,
                validations: conditionalQuestion.validations,
                value: _this.props.questionAnswers[conditionalQuestion.questionId],
                input: conditionalQuestion.input,
                displayConfirmationNeed: conditionalQuestion.displayConfirmationNeed,
                classes: _this.props.classes,
                renderError: _this.props.renderError,
                questionAnswers: _this.props.questionAnswers,
                validationErrors: _this.props.validationErrors,
                onAnswerChange: _this.props.onAnswerChange,
                onQuestionBlur: _this.props.onQuestionBlur,
                onKeyDown: _this.props.onKeyDown }));
            }
          })();
        });
        this.props.input.options.filter(function (option) {
          return typeof option.conditions !== 'undefined' && option.conditions.length > 0;
        }).forEach(function (option) {
          return [].forEach.bind(option.conditions, function (condition) {
            conditionalAnswers[condition.questionId] = _this.props.questionAnswers[condition.questionId];
          })();
        });
        this.props.input.options.filter(function (option) {
          return typeof option.mappingConditions !== 'undefined' && option.mappingConditions.length > 0;
        }).forEach(function (option) {
          return [].forEach.bind(option.mappingConditions, function (condition) {
            Object.keys(condition).forEach(function (questionId) {
              mappingConditionalAnswers[questionId] = _this.props.questionAnswers[questionId];
            });
          })();
        });
      }

      // Get the current value. If none is set, then use
      // the default if given.
      var value = typeof this.props.value !== 'undefined' ? this.props.value : typeof this.props.input['default'] !== 'undefined' ? this.props.input['default'] : undefined;

      // Retrieve the validation errors for the
      // current question and map them in to
      // error-message blocks.
      var validationErrors = typeof this.props.validationErrors[this.props.questionId] !== 'undefined' ? this.props.validationErrors[this.props.questionId].map(function (error) {
        return typeof _this.props.renderError === 'function' ? _this.props.renderError(error, _this.props.questionId) : React.createElement(
          'div',
          { key: _this.props.questionId + 'Error' + error.type,
            className: _this.props.classes.errorMessage },
          error.message
        );
      }) : [];

      var validationInputErrors = typeof this.props.validationErrors[this.props.questionId] !== 'undefined' ? this.props.validationErrors[this.props.questionId].map(function (error) {
        return typeof _this.props.renderError === 'function' ? _this.props.renderError(error, _this.props.questionId) : ' error';
      }) : '';

      var labelId = this.props.questionId + '-label';

      var checked = this.props.input.type === 'checkboxInput' && typeof this.props.input['default'] !== 'undefined' && this.props.input['default'] === this.props.value ? true : false;

      var disconfirmation = this.state.displayConfirmationNeed ? 'd-none' : '';

      function createMarkup(questionSetHtml) {
        return { __html: questionSetHtml };
      }

      return React.createElement(
        'div',
        { className: this.props.classes.question + ' ' + this.props.questionContainerClass + ' ' + validationInputErrors + ' ' + disconfirmation + ' ', id: 'out-' + this.props.questionId },
        !!this.props.question ? React.createElement(
          'label',
          { className: this.props.classes.label,
            id: labelId,
            htmlFor: this.props.questionId },
          this.props.question,
          typeof this.props.renderRequiredAsterisk !== 'undefined' && this.props.input.required ? this.props.renderRequiredAsterisk() : undefined,
          !!this.props.text ? React.createElement('small', { className: this.props.classes.questionText, dangerouslySetInnerHTML: createMarkup(this.props.text) }) : undefined
        ) : undefined,
        React.createElement(Input, _extends({ name: this.props.questionId,
          id: this.props.questionId,
          labelId: labelId,
          value: value,
          defaultChecked: checked,
          questionInputClass: this.props.input.questionInputClass,
          text: this.props.input.text,
          options: this.props.input.options,
          conditionalAnswers: conditionalAnswers,
          mappingConditionalAnswers: mappingConditionalAnswers,
          placeholder: this.props.input.placeholder,
          required: this.props.input.required,
          classes: this.props.classes,
          questionAnswers: this.props.questionAnswers,
          onChange: this.handleInputChange.bind(this, this.props.questionId),
          onBlur: this.handleInputBlur.bind(this, this.props.questionId),
          onKeyDown: this.props.onKeyDown
        }, typeof this.props.input.props === 'object' ? this.props.input.props : {})),
        validationErrors,
        !!this.props.postText ? React.createElement(
          'p',
          { className: this.props.classes.questionPostText },
          this.props.postText
        ) : undefined,
        conditionalItems
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof this.props.input['default'] === 'undefined' || this.props.input.type === 'checkboxInput' && typeof this.props.questionAnswers[this.props.questionId] === 'undefined') {
        return;
      }

      this.handleInputChange.call(this, this.props.questionId, this.props.input['default']);
    }
  }]);

  return Question;
})(React.Component);

;

Question.defaultProps = {
  questionSetId: undefined,
  questionId: undefined,
  questionContainerClass: '',
  question: '',
  validateOn: 'blur',
  validations: [],
  text: undefined,
  postText: undefined,
  value: undefined,
  input: {
    'default': undefined,
    type: 'textInput',
    limit: undefined,
    placeholder: undefined,
    questionInputClass: ''
  },
  classes: {},
  questionAnswers: {},
  validationErrors: {},
  onAnswerChange: function onAnswerChange() {},
  onQuestionBlur: function onQuestionBlur() {},
  onKeyDown: function onKeyDown() {},
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  displayConfirmationNeed: false
};

module.exports = Question;