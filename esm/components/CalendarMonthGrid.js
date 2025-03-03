import _extends from "@babel/runtime/helpers/esm/extends";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import shallowEqual from "enzyme-shallow-equal";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import { addEventListener } from 'consolidated-events';
import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';
import addHours from 'date-fns/addHours';
import startOfDay from 'date-fns/startOfDay';
import setYear from 'date-fns/setYear';
import setMonth from 'date-fns/setMonth';
import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import noflip from '../utils/noflip';
import CalendarMonth from './CalendarMonth';
import isTransitionEndSupported from '../utils/isTransitionEndSupported';
import getTransformStyles from '../utils/getTransformStyles';
import getCalendarMonthWidth from '../utils/getCalendarMonthWidth';
import toISOMonthString from '../utils/toISOMonthString';
import isPrevMonth from '../utils/isPrevMonth';
import isNextMonth from '../utils/isNextMonth';
import isSameMonthAndYear from '../utils/isSameMonthAndYear';
import ModifiersShape from '../shapes/ModifiersShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE, DAY_SIZE } from '../constants';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps(_objectSpread(_objectSpread({}, withStylesPropTypes), {}, {
  enableOutsideDays: PropTypes.bool,
  firstVisibleMonthIndex: PropTypes.number,
  horizontalMonthPadding: nonNegativeInteger,
  initialMonth: PropTypes.object,
  isAnimating: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  modifiers: PropTypes.objectOf(PropTypes.objectOf(ModifiersShape)),
  orientation: ScrollableOrientationShape,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthTransitionEnd: PropTypes.func,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  translationValue: PropTypes.number,
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  daySize: nonNegativeInteger,
  focusedDate: PropTypes.object,
  // indicates focusable day
  isFocused: PropTypes.bool,
  // indicates whether or not to move focus to focusable day
  firstDayOfWeek: DayOfWeekShape,
  setMonthTitleHeight: PropTypes.func,
  isRTL: PropTypes.bool,
  transitionDuration: nonNegativeInteger,
  verticalBorderSpacing: nonNegativeInteger,
  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string,
  locale: PropTypes.string
})) : {};
var defaultProps = {
  enableOutsideDays: false,
  firstVisibleMonthIndex: 0,
  horizontalMonthPadding: 13,
  initialMonth: addHours(startOfDay(new Date()), 12),
  isAnimating: false,
  numberOfMonths: 1,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  onDayClick: function onDayClick() {},
  onDayMouseEnter: function onDayMouseEnter() {},
  onDayMouseLeave: function onDayMouseLeave() {},
  onMonthChange: function onMonthChange() {},
  onYearChange: function onYearChange() {},
  onMonthTransitionEnd: function onMonthTransitionEnd() {},
  renderMonthText: null,
  renderCalendarDay: undefined,
  renderDayContents: null,
  translationValue: null,
  renderMonthElement: null,
  daySize: DAY_SIZE,
  focusedDate: null,
  isFocused: false,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,
  isRTL: false,
  transitionDuration: 200,
  verticalBorderSpacing: undefined,
  // i18n
  monthFormat: 'MMMM yyyy',
  // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  locale: null
};

function getMonths(initialMonth, numberOfMonths, withoutTransitionMonths) {
  var month = new Date(initialMonth);
  if (!withoutTransitionMonths) month = subMonths(month, 1);
  var months = [];

  for (var i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    months.push(month);
    month = addMonths(month, 1);
  }

  return months;
}
/** @extends React.Component */


var CalendarMonthGrid = /*#__PURE__*/function (_ref) {
  _inheritsLoose(CalendarMonthGrid, _ref);

  var _proto = CalendarMonthGrid.prototype;

  _proto[!React.PureComponent && "shouldComponentUpdate"] = function (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };

  function CalendarMonthGrid(props) {
    var _this;

    _this = _ref.call(this, props) || this;
    var withoutTransitionMonths = props.orientation === VERTICAL_SCROLLABLE;
    _this.state = {
      months: getMonths(props.initialMonth, props.numberOfMonths, withoutTransitionMonths)
    };
    _this.isTransitionEndSupported = isTransitionEndSupported();
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_assertThisInitialized(_this));
    _this.setContainerRef = _this.setContainerRef.bind(_assertThisInitialized(_this));
    _this.onMonthSelect = _this.onMonthSelect.bind(_assertThisInitialized(_this));
    _this.onYearSelect = _this.onYearSelect.bind(_assertThisInitialized(_this));
    return _this;
  }

  _proto.componentDidMount = function componentDidMount() {
    this.removeEventListener = addEventListener(this.container, 'transitionend', this.onTransitionEnd);
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    var initialMonth = nextProps.initialMonth,
        numberOfMonths = nextProps.numberOfMonths,
        orientation = nextProps.orientation;
    var months = this.state.months;
    var _this$props = this.props,
        prevInitialMonth = _this$props.initialMonth,
        prevNumberOfMonths = _this$props.numberOfMonths;
    var hasMonthChanged = !isSameMonthAndYear(prevInitialMonth, initialMonth);
    var hasNumberOfMonthsChanged = prevNumberOfMonths !== numberOfMonths;
    var newMonths = months;

    if (hasMonthChanged && !hasNumberOfMonthsChanged) {
      if (isNextMonth(prevInitialMonth, initialMonth)) {
        newMonths = months.slice(1);
        newMonths.push(addMonths(months[months.length - 1], 1));
      } else if (isPrevMonth(prevInitialMonth, initialMonth)) {
        newMonths = months.slice(0, months.length - 1);
        newMonths.unshift(subMonths(months[0], 1));
      } else {
        var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
        newMonths = getMonths(initialMonth, numberOfMonths, withoutTransitionMonths);
      }
    }

    if (hasNumberOfMonthsChanged) {
      var _withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;

      newMonths = getMonths(initialMonth, numberOfMonths, _withoutTransitionMonths);
    }

    this.setState({
      months: newMonths
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this$props2 = this.props,
        isAnimating = _this$props2.isAnimating,
        transitionDuration = _this$props2.transitionDuration,
        onMonthTransitionEnd = _this$props2.onMonthTransitionEnd; // For IE9, immediately call onMonthTransitionEnd instead of
    // waiting for the animation to complete. Similarly, if transitionDuration
    // is set to 0, also immediately invoke the onMonthTransitionEnd callback

    if ((!this.isTransitionEndSupported || !transitionDuration) && isAnimating) {
      onMonthTransitionEnd();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.removeEventListener) this.removeEventListener();
  };

  _proto.onTransitionEnd = function onTransitionEnd() {
    var onMonthTransitionEnd = this.props.onMonthTransitionEnd;
    onMonthTransitionEnd();
  };

  _proto.onMonthSelect = function onMonthSelect(currentMonth, newMonthVal) {
    var newMonth = new Date(currentMonth);
    var _this$props3 = this.props,
        onMonthChange = _this$props3.onMonthChange,
        orientation = _this$props3.orientation;
    var months = this.state.months;
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var initialMonthSubtraction = months.indexOf(currentMonth);

    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }

    newMonth = subMonths(setMonth(newMonth, newMonthVal), initialMonthSubtraction);
    onMonthChange(newMonth);
  };

  _proto.onYearSelect = function onYearSelect(currentMonth, newYearVal) {
    var newMonth = new Date(currentMonth);
    var _this$props4 = this.props,
        onYearChange = _this$props4.onYearChange,
        orientation = _this$props4.orientation;
    var months = this.state.months;
    var withoutTransitionMonths = orientation === VERTICAL_SCROLLABLE;
    var initialMonthSubtraction = months.indexOf(currentMonth);

    if (!withoutTransitionMonths) {
      initialMonthSubtraction -= 1;
    }

    newMonth = subMonths(setYear(newMonth, newYearVal), initialMonthSubtraction);
    onYearChange(newMonth);
  };

  _proto.setContainerRef = function setContainerRef(ref) {
    this.container = ref;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props5 = this.props,
        enableOutsideDays = _this$props5.enableOutsideDays,
        firstVisibleMonthIndex = _this$props5.firstVisibleMonthIndex,
        horizontalMonthPadding = _this$props5.horizontalMonthPadding,
        isAnimating = _this$props5.isAnimating,
        modifiers = _this$props5.modifiers,
        numberOfMonths = _this$props5.numberOfMonths,
        monthFormat = _this$props5.monthFormat,
        orientation = _this$props5.orientation,
        translationValue = _this$props5.translationValue,
        daySize = _this$props5.daySize,
        onDayMouseEnter = _this$props5.onDayMouseEnter,
        onDayMouseLeave = _this$props5.onDayMouseLeave,
        onDayClick = _this$props5.onDayClick,
        renderMonthText = _this$props5.renderMonthText,
        renderCalendarDay = _this$props5.renderCalendarDay,
        renderDayContents = _this$props5.renderDayContents,
        renderMonthElement = _this$props5.renderMonthElement,
        onMonthTransitionEnd = _this$props5.onMonthTransitionEnd,
        firstDayOfWeek = _this$props5.firstDayOfWeek,
        focusedDate = _this$props5.focusedDate,
        isFocused = _this$props5.isFocused,
        isRTL = _this$props5.isRTL,
        styles = _this$props5.styles,
        phrases = _this$props5.phrases,
        dayAriaLabelFormat = _this$props5.dayAriaLabelFormat,
        transitionDuration = _this$props5.transitionDuration,
        verticalBorderSpacing = _this$props5.verticalBorderSpacing,
        setMonthTitleHeight = _this$props5.setMonthTitleHeight,
        locale = _this$props5.locale;
    var months = this.state.months;
    var isVertical = orientation === VERTICAL_ORIENTATION;
    var isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;
    var isHorizontal = orientation === HORIZONTAL_ORIENTATION;
    var calendarMonthWidth = getCalendarMonthWidth(daySize, horizontalMonthPadding);
    var width = isVertical || isVerticalScrollable ? calendarMonthWidth : (numberOfMonths + 2) * calendarMonthWidth;
    var transformType = isVertical || isVerticalScrollable ? 'translateY' : 'translateX';
    var transformValue = "".concat(transformType, "(").concat(translationValue, "px)");
    return /*#__PURE__*/React.createElement("div", _extends({}, css(styles.CalendarMonthGrid, isHorizontal && styles.CalendarMonthGrid__horizontal, isVertical && styles.CalendarMonthGrid__vertical, isVerticalScrollable && styles.CalendarMonthGrid__vertical_scrollable, isAnimating && styles.CalendarMonthGrid__animating, isAnimating && transitionDuration && {
      transition: "transform ".concat(transitionDuration, "ms ease-in-out")
    }, _objectSpread(_objectSpread({}, getTransformStyles(transformValue)), {}, {
      width: width
    })), {
      ref: this.setContainerRef,
      onTransitionEnd: onMonthTransitionEnd
    }), months.map(function (month, i) {
      var isVisible = i >= firstVisibleMonthIndex && i < firstVisibleMonthIndex + numberOfMonths;
      var hideForAnimation = i === 0 && !isVisible;
      var showForAnimation = i === 0 && isAnimating && isVisible;
      var monthString = toISOMonthString(month);
      return /*#__PURE__*/React.createElement("div", _extends({
        key: monthString
      }, css(isHorizontal && styles.CalendarMonthGrid_month__horizontal, hideForAnimation && styles.CalendarMonthGrid_month__hideForAnimation, showForAnimation && !isVertical && !isRTL && {
        position: 'absolute',
        left: -calendarMonthWidth
      }, showForAnimation && !isVertical && isRTL && {
        position: 'absolute',
        right: 0
      }, showForAnimation && isVertical && {
        position: 'absolute',
        top: -translationValue
      }, !isVisible && !isAnimating && styles.CalendarMonthGrid_month__hidden)), /*#__PURE__*/React.createElement(CalendarMonth, {
        month: month,
        isVisible: isVisible,
        enableOutsideDays: enableOutsideDays,
        modifiers: modifiers[monthString],
        monthFormat: monthFormat,
        orientation: orientation,
        onDayMouseEnter: onDayMouseEnter,
        onDayMouseLeave: onDayMouseLeave,
        onDayClick: onDayClick,
        onMonthSelect: _this2.onMonthSelect,
        onYearSelect: _this2.onYearSelect,
        renderMonthText: renderMonthText,
        renderCalendarDay: renderCalendarDay,
        renderDayContents: renderDayContents,
        renderMonthElement: renderMonthElement,
        firstDayOfWeek: firstDayOfWeek,
        daySize: daySize,
        focusedDate: isVisible ? focusedDate : null,
        isFocused: isFocused,
        phrases: phrases,
        setMonthTitleHeight: setMonthTitleHeight,
        dayAriaLabelFormat: dayAriaLabelFormat,
        verticalBorderSpacing: verticalBorderSpacing,
        horizontalMonthPadding: horizontalMonthPadding,
        locale: locale
      }));
    }));
  };

  return CalendarMonthGrid;
}(React.PureComponent || React.Component);

CalendarMonthGrid.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
CalendarMonthGrid.defaultProps = defaultProps;
export default withStyles(function (_ref2) {
  var _ref2$reactDates = _ref2.reactDates,
      color = _ref2$reactDates.color,
      spacing = _ref2$reactDates.spacing,
      zIndex = _ref2$reactDates.zIndex;
  return {
    CalendarMonthGrid: {
      background: color.background,
      textAlign: noflip('left'),
      zIndex: zIndex
    },
    CalendarMonthGrid__animating: {
      zIndex: zIndex + 1
    },
    CalendarMonthGrid__horizontal: {
      position: 'absolute',
      left: noflip(spacing.dayPickerHorizontalPadding)
    },
    CalendarMonthGrid__vertical: {
      margin: '0 auto'
    },
    CalendarMonthGrid__vertical_scrollable: {
      margin: '0 auto'
    },
    CalendarMonthGrid_month__horizontal: {
      display: 'inline-block',
      verticalAlign: 'top',
      minHeight: '100%'
    },
    CalendarMonthGrid_month__hideForAnimation: {
      position: 'absolute',
      zIndex: zIndex - 1,
      opacity: 0,
      pointerEvents: 'none'
    },
    CalendarMonthGrid_month__hidden: {
      visibility: 'hidden'
    }
  };
}, {
  pureComponent: typeof React.PureComponent !== 'undefined'
})(CalendarMonthGrid);