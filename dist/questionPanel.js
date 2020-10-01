'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fortawesomeReactFontawesome = require('@fortawesome/react-fontawesome');

var React = require('react');
var _ = require('lodash').noConflict();
var KeyCodez = require('keycodez');

var Validation = require('./lib/validation');
var ErrorMessages = require('./lib/errors');

var Button = require('./button');
var QuestionSet = require('./questionSet');
var evaluatePredicates = require('./lib/evaluatePredicates');

var QuestionSetWrapper = (function (_React$Component) {
  _inherits(QuestionSetWrapper, _React$Component);

  function QuestionSetWrapper() {
    _classCallCheck(this, QuestionSetWrapper);

    _get(Object.getPrototypeOf(QuestionSetWrapper.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(QuestionSetWrapper, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var questionSetWrapper = this.props.questionSetWrapper;
      var questionSet = this.props.questionSet;
      var questionSetId = this.props.questionSetId;
      var addMoreQuestionSets = this.props.addMoreQuestionSets;
      var questionAnswers = this.props.questionAnswers;
      var showAddMore = false,
          showRemoveMore = false;
      var addMoreName = '',
          addMoreButton = '',
          addMoreButtonClass = '',
          removeMoreButton = '',
          removeMoreButtonClass = '',
          removeQuestionSetIndex = '';
      var removeQuestionSets = Array(),
          originalQuestionSets = Array();
      if (addMoreQuestionSets) {
        addMoreQuestionSets.forEach(function (addMoreQuestionSet) {
          originalQuestionSets = addMoreQuestionSet.questionSets;
          var lastQuestionSet = addMoreQuestionSet.questionSets[addMoreQuestionSet.questionSets.length - 1];
          var removeQuestionSetIds = Array();
          if (questionAnswers[addMoreQuestionSet.addMoreName] > 1) {
            for (var i = 1; i <= questionAnswers[addMoreQuestionSet.addMoreName]; i++) {
              if (i > 1) {
                removeQuestionSetIds.push(lastQuestionSet + '_' + i);
                var tmpRemoveQuestionSet = Array();
                addMoreQuestionSet.questionSets.forEach(function (questionSet) {
                  tmpRemoveQuestionSet.push(questionSet + '_' + i);
                });
                removeQuestionSets.push(tmpRemoveQuestionSet);
              } else {
                removeQuestionSetIds.push(lastQuestionSet);
                removeQuestionSets.push(addMoreQuestionSet.questionSets);
              }
            }
          }
          if (questionAnswers[addMoreQuestionSet.addMoreName] > 1) {
            lastQuestionSet = lastQuestionSet + '_' + questionAnswers[addMoreQuestionSet.addMoreName];
          }
          addMoreName = addMoreQuestionSet.addMoreName;
          if (lastQuestionSet === questionSetId) {
            showAddMore = true;
            addMoreButton = addMoreQuestionSet.addMoreButton;
            addMoreButtonClass = addMoreQuestionSet.addMoreButtonClass;
          }
          removeQuestionSetIndex = _.indexOf(removeQuestionSetIds, questionSetId);
          if (removeQuestionSetIndex !== -1) {
            showRemoveMore = true;
            removeMoreButton = addMoreQuestionSet.removeMoreButton;
            removeMoreButtonClass = addMoreQuestionSet.removeMoreButtonClass;
          }
        });
      }
      if (questionSetWrapper) {
        var element = questionSetWrapper.element ? questionSetWrapper.element : 'div';
        var children = React.createElement(QuestionSetWrapper, { questionSetWrapper: questionSetWrapper.children, questionSet: questionSet });
        return React.createElement(element, { className: questionSetWrapper.className }, children);
      } else {
        return React.createElement(
          React.Fragment,
          null,
          questionSet,
          (showAddMore || showRemoveMore) && React.createElement(
            'div',
            { className: 'd-flex justify-content-end' },
            showAddMore && React.createElement(
              'a',
              { href: 'javascript:;', className: addMoreButtonClass, onClick: function () {
                  return _this.props.onAddMore(addMoreName);
                } },
              React.createElement(_fortawesomeReactFontawesome.FontAwesomeIcon, { icon: 'plus', className: 'fa-fw' }),
              ' ',
              addMoreButton
            ),
            showRemoveMore && React.createElement(
              'a',
              { href: 'javascript:;', className: removeMoreButtonClass, onClick: function () {
                  return _this.props.onRemoveMore(addMoreName, originalQuestionSets, removeQuestionSetIndex, removeQuestionSets[removeQuestionSetIndex]);
                } },
              React.createElement(_fortawesomeReactFontawesome.FontAwesomeIcon, { icon: 'minus', className: 'fa-fw' }),
              ' ',
              removeMoreButton
            )
          )
        );
      }
    }
  }]);

  return QuestionSetWrapper;
})(React.Component);

;

var QuestionPanel = (function (_React$Component2) {
  _inherits(QuestionPanel, _React$Component2);

  function QuestionPanel(props) {
    _classCallCheck(this, QuestionPanel);

    _get(Object.getPrototypeOf(QuestionPanel.prototype), 'constructor', this).call(this, props);

    this.state = {
      validationErrors: this.props.validationErrors
    };
  }

  _createClass(QuestionPanel, [{
    key: 'handleAnswerValidate',
    value: function handleAnswerValidate(questionId, questionAnswer, validations) {
      var _this2 = this;

      if (typeof validations === 'undefined' || validations.length === 0) {
        return;
      }

      /*
       * Run the question through its validations and
       * show any error messages if invalid.
       */
      var questionValidationErrors = [];
      validations.forEach(function (validation) {
        if (Validation.validateAnswer(questionAnswer, validation, _this2.props.questionAnswers)) {
          return;
        }
        if (questionValidationErrors.length === 0) {
          questionValidationErrors.push({
            type: validation.type,
            message: ErrorMessages.getErrorMessage(validation)
          });
        }
      });

      var validationErrors = _.chain(this.state.validationErrors).set(questionId, questionValidationErrors).value();

      this.setState({
        validationErrors: validationErrors
      }, function () {
        return _this2.handleValidationErrors(false);
      });
    }
  }, {
    key: 'handleMainButtonClick',
    value: function handleMainButtonClick() {
      var _this3 = this;

      var action = this.props.action['default'];
      var conditions = this.props.action.conditions || [];

      /*
       * We need to get all the question sets for this panel.
       * Collate a list of the question set IDs required
       * and run through the schema to grab the question sets.
       */
      var questionSetIds = this.props.questionSets.map(function (qS) {
        return qS.questionSetId;
      });
      var questionSets = _.chain(this.props.schema.questionSets).filter(function (qS) {
        return questionSetIds.indexOf(qS.questionSetId) > -1;
      }).value();

      /*
       * Get any incorrect fields that need error messages.
       */
      var invalidQuestions = Validation.getQuestionPanelInvalidQuestions(questionSets, this.props.questionAnswers);

      /*
       * If the panel isn't valid...
       */
      if (Object.keys(invalidQuestions).length > 0) {
        var validationErrors = _.mapValues(invalidQuestions, function (validations) {
          var i = 0;
          return validations.map(function (validation) {
            i++;
            if (i > 1) {
              return false; // skip
            } else {
                return {
                  type: validation.type,
                  message: ErrorMessages.getErrorMessage(validation)
                };
              }
          });
        });

        this.setState({
          validationErrors: validationErrors
        }, function () {
          return _this3.handleValidationErrors(true);
        });
        return;
      }

      /*
       * Panel is valid. So what do we do next?
       * Check our conditions and act upon them, or the default.
       */
      conditions.forEach(function (condition) {
        var conditionMet = Array.isArray(condition.predicates) ? _this3.handleEvaluatePredicate(condition.predicates) : _this3.props.questionAnswers[condition.questionId] === condition.value;

        action = conditionMet ? {
          action: condition.action,
          target: condition.target,
          panel: condition.panel
        } : action;
      });

      /*
       * Decide which action to take depending on
       * the action decided upon.
       */
      switch (action.action) {

        case 'GOTO':
          this.props.onSwitchPanel(action.target);
          break;

        case 'SUBMIT':
          this.props.onSubmit(action.target);
          break;

        case 'SUBMIT-GOTO':
          this.props.onSubmit(action.target);
          this.props.onSwitchPanel(action.panel);
          break;
      }
    }
  }, {
    key: 'handleValidationErrors',
    value: function handleValidationErrors(isActionAttempt) {
      var onValidationErrors = this.props.onValidationErrors;
      if (typeof onValidationErrors === 'function') {
        onValidationErrors(this.state.validationErrors, isActionAttempt);
      }
    }
  }, {
    key: 'handleEvaluatePredicate',
    value: function handleEvaluatePredicate(predicates) {
      return evaluatePredicates(predicates, this.props.questionAnswers);
    }
  }, {
    key: 'handleBackButtonClick',
    value: function handleBackButtonClick() {
      if (this.props.panelHistory.length == 0) {
        return;
      }

      this.props.onPanelBack();
    }
  }, {
    key: 'handleAnswerChange',
    value: function handleAnswerChange(questionId, questionAnswer, validations, validateOn, progress) {
      this.props.onAnswerChange(questionId, questionAnswer, progress);

      this.setState({
        validationErrors: _.chain(this.state.validationErrors).set(questionId, []).value()
      });

      if (validateOn === 'change') {
        this.handleAnswerValidate(questionId, questionAnswer, validations);
      }
    }
  }, {
    key: 'handleQuestionBlur',
    value: function handleQuestionBlur(questionId, questionAnswer, validations, validateOn) {
      if (validateOn === 'blur') {
        this.handleAnswerValidate(questionId, questionAnswer, validations);
      }
    }
  }, {
    key: 'handleInputKeyDown',
    value: function handleInputKeyDown(e) {
      if (KeyCodez[e.keyCode] === 'enter') {
        e.preventDefault();
        this.handleMainButtonClick.call(this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var questionSets = this.props.questionSets.map(function (questionSetMeta) {
        var questionSet = _.find(_this4.props.schema.questionSets, {
          questionSetId: questionSetMeta.questionSetId
        });

        if (!questionSet) {
          return undefined;
        }

        var questionSetComponent = React.createElement(QuestionSet, { key: questionSet.questionSetId,
          id: questionSet.questionSetId,
          name: questionSet.name,
          questionSetHeader: questionSet.questionSetHeader,
          questionSetText: questionSet.questionSetText,
          questionSetHtml: questionSet.questionSetHtml,
          questions: questionSet.questions,
          classes: _this4.props.classes,
          questionSetClass: questionSet.questionSetClass,
          questionAnswers: _this4.props.questionAnswers,
          renderError: _this4.props.renderError,
          renderRequiredAsterisk: _this4.props.renderRequiredAsterisk,
          validationErrors: _this4.state.validationErrors,
          onAnswerChange: _this4.handleAnswerChange.bind(_this4),
          onQuestionBlur: _this4.handleQuestionBlur.bind(_this4),
          onKeyDown: _this4.handleInputKeyDown.bind(_this4) });

        return React.createElement(QuestionSetWrapper, { questionSetWrapper: questionSet.questionSetWrapper, questionSet: questionSetComponent, addMoreQuestionSets: _this4.props.addMoreQuestionSets, onAddMore: _this4.props.onAddMore, onRemoveMore: _this4.props.onRemoveMore, questionSetId: questionSet.questionSetId, questionAnswers: _this4.props.questionAnswers });
      });

      function createMarkup(panelHtml) {
        return { __html: panelHtml };
      }

      return React.createElement(
        'div',
        { className: this.props.classes.questionPanel },
        typeof this.props.panelHeader !== 'undefined' || typeof this.props.panelText !== 'undefined' || typeof this.props.panelHtml !== 'undefined' ? React.createElement(
          'div',
          { className: this.props.classes.questionPanelHeaderContainer },
          typeof this.props.panelHeader !== 'undefined' ? React.createElement(
            'h2',
            { className: this.props.classes.questionPanelHeaderText },
            React.createElement(
              'b',
              null,
              this.props.panelHeader
            )
          ) : undefined,
          typeof this.props.panelText !== 'undefined' ? React.createElement(
            'p',
            { className: this.props.classes.questionPanelText },
            this.props.panelText
          ) : undefined,
          typeof this.props.panelHtml !== 'undefined' ? React.createElement('div', { dangerouslySetInnerHTML: createMarkup(this.props.panelHtml) }) : undefined
        ) : undefined,
        React.createElement(
          'div',
          { className: this.props.classes.questionSets + this.props.questionPanelClass },
          questionSets
        ),
        React.createElement(
          'div',
          { className: this.props.classes.buttonBar },
          this.props.panelHistory.length > 1 && !this.props.backButton.disabled ? React.createElement(Button, { text: this.props.backButton.text || 'Back', condition: this.props.button.condition, questionAnswers: this.props.questionAnswers,
            onClick: this.handleBackButtonClick.bind(this),
            className: this.props.classes.backButton }) : undefined,
          !this.props.button.disabled ? React.createElement(Button, { text: this.props.button.text, condition: this.props.button.condition, questionAnswers: this.props.questionAnswers,
            onClick: this.handleMainButtonClick.bind(this),
            className: this.props.classes.controlButton }) : undefined
        )
      );
    }
  }]);

  return QuestionPanel;
})(React.Component);

;

QuestionPanel.defaultProps = {
  validationErrors: {},
  schema: {},
  classes: {},
  panelId: undefined,
  questionPanelClass: '',
  panelIndex: undefined,
  panelHeader: undefined,
  panelText: undefined,
  panelHtml: undefined,
  action: {
    'default': {},
    conditions: []
  },
  button: {
    text: 'Submit',
    condition: {
      field: '',
      text: '',
      value: ''
    }
  },
  backButton: {
    text: 'Back'
  },
  questionSets: [],
  addMoreQuestionSets: [],
  questionAnswers: {},
  renderError: undefined,
  renderRequiredAsterisk: undefined,
  onAnswerChange: function onAnswerChange() {},
  onSwitchPanel: function onSwitchPanel() {},
  onPanelBack: function onPanelBack() {},
  panelHistory: []
};

module.exports = QuestionPanel;