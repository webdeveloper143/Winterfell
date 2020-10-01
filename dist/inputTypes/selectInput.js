'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var _ = require('lodash').noConflict();

var SelectInput = (function (_React$Component) {
  _inherits(SelectInput, _React$Component);

  function SelectInput(props) {
    _classCallCheck(this, SelectInput);

    _get(Object.getPrototypeOf(SelectInput.prototype), 'constructor', this).call(this, props);

    this.state = {
      value: this.props.value
    };
  }

  _createClass(SelectInput, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({
        value: e.target.value
      }, this.props.onChange.bind(null, e.target.value));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (_.isEqual(this.props.conditionalAnswers, nextProps.conditionalAnswers) === false) {
        this.setState({ value: '' }, this.props.onChange.bind(null, ''));
      }
      if (_.isEqual(this.props.mappingConditionalAnswers, nextProps.mappingConditionalAnswers) === false) {
        this.setState({ value: '' }, this.props.onChange.bind(null, ''));
      }
      if (this.props.value !== nextProps.value) {
        this.setState({ value: nextProps.value }, this.props.onChange.bind(null, nextProps.value));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var options = this.props.options.map(function (opt) {
        var isSatisfied = 1;
        if (opt.mappingConditions !== undefined) {
          isSatisfied = 0;
          opt.mappingConditions.forEach(function (condition) {
            var conditionCount = 0;
            var conditionSuccessCount = 0;
            Object.keys(condition).forEach(function (questionId) {
              conditionCount += 1;
              if (_this.props.mappingConditionalAnswers[questionId] !== undefined) {
                if (Array.isArray(condition[questionId]) && Array.isArray(_this.props.mappingConditionalAnswers[questionId]) && _.intersection(condition[questionId], _this.props.mappingConditionalAnswers[questionId]).length > 0) {
                  conditionSuccessCount += 1;
                } else if (Array.isArray(condition[questionId]) && condition[questionId].indexOf(_this.props.mappingConditionalAnswers[questionId]) > -1) {
                  conditionSuccessCount += 1;
                } else if (!Array.isArray(condition[questionId]) && condition[questionId] === _this.props.mappingConditionalAnswers[questionId]) {
                  conditionSuccessCount += 1;
                }
              }
            });
            if (conditionCount === conditionSuccessCount) {
              isSatisfied++;
            }
          });
        }
        if (isSatisfied) {
          if (typeof opt.conditions !== 'undefined' && opt.conditions.length > 0) {
            var _ret = (function () {
              var c = 0;
              opt.conditions.forEach(function (condition) {
                if (Array.isArray(condition.value) && condition.value.indexOf(_this.props.conditionalAnswers[condition.questionId]) > -1 || _this.props.conditionalAnswers[condition.questionId] === condition.value) {
                  c++;
                }
              });
              if (opt.conditions.length == c) {
                return {
                  v: React.createElement(
                    'option',
                    { key: opt.value,
                      value: opt.value },
                    opt.text
                  )
                };
              }
            })();

            if (typeof _ret === 'object') return _ret.v;
          } else {
            return React.createElement(
              'option',
              { key: opt.value,
                value: opt.value },
              opt.text
            );
          }
        }
      });

      return React.createElement(
        'select',
        { name: this.props.name,
          id: this.props.id,
          className: this.props.classes.select + this.props.questionInputClass,
          value: this.state.value,
          ref: 'select',
          required: this.props.required ? 'required' : undefined,
          onChange: this.handleChange.bind(this),
          onBlur: this.props.onBlur.bind(null, this.state.value) },
        options
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      /*
       * Selects automatically pick the first item, so
       * make sure we set it.
       */
      this.handleChange({
        target: {
          value: this.refs.select.value
        }
      });
    }
  }]);

  return SelectInput;
})(React.Component);

;

SelectInput.defaultProps = {
  classes: {},
  name: '',
  id: '',
  value: '',
  options: [],
  onChange: function onChange() {},
  onBlur: function onBlur() {}
};

module.exports = SelectInput;