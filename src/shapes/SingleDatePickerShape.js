import PropTypes from "prop-types";
import { mutuallyExclusiveProps, nonNegativeInteger } from "airbnb-prop-types";

import { SingleDatePickerPhrases } from "../defaultPhrases";
import getPhrasePropTypes from "../utils/getPhrasePropTypes";

import IconPositionShape from "./IconPositionShape";
import OrientationShape from "./OrientationShape";
import anchorDirectionShape from "./AnchorDirectionShape";
import openDirectionShape from "./OpenDirectionShape";
import DayOfWeekShape from "./DayOfWeekShape";
import CalendarInfoPositionShape from "./CalendarInfoPositionShape";
import NavPositionShape from "./NavPositionShape";

export default {
  // required props for a functional interactive SingleDatePicker
  date: PropTypes.object,
  onDateChange: PropTypes.func,

  focused: PropTypes.bool,
  onFocusChange: PropTypes.func.isRequired,

  // input related props
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  screenReaderInputMessage: PropTypes.string,
  showClearDate: PropTypes.bool,
  customCloseIcon: PropTypes.node,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,
  keepFocusOnInput: PropTypes.bool,

  // calendar presentation and interaction related props
  renderMonthText: mutuallyExclusiveProps(
    PropTypes.func,
    "renderMonthText",
    "renderMonthElement"
  ),
  renderMonthElement: mutuallyExclusiveProps(
    PropTypes.func,
    "renderMonthText",
    "renderMonthElement"
  ),
  renderWeekHeaderElement: PropTypes.func,
  orientation: OrientationShape,
  anchorDirection: anchorDirectionShape,
  openDirection: openDirectionShape,
  horizontalMargin: PropTypes.number,
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  appendToBody: PropTypes.bool,
  disableScroll: PropTypes.bool,
  initialVisibleMonth: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  numberOfMonths: PropTypes.number,
  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDate: PropTypes.bool,
  renderCalendarInfo: PropTypes.func,
  calendarInfoPosition: CalendarInfoPositionShape,
  hideKeyboardShortcutsPanel: PropTypes.bool,
  daySize: nonNegativeInteger,
  isRTL: PropTypes.bool,
  verticalHeight: nonNegativeInteger,
  transitionDuration: nonNegativeInteger,
  horizontalMonthPadding: nonNegativeInteger,

  // navigation related props
  dayPickerNavigationInlineStyles: PropTypes.object,
  navPosition: NavPositionShape,
  navPrev: PropTypes.node,
  navNext: PropTypes.node,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onClose: PropTypes.func,
  renderNavPrevButton: PropTypes.func,
  renderNavNextButton: PropTypes.func,

  // day presentation and interaction related props
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  enableOutsideDays: PropTypes.bool,
  isDayBlocked: PropTypes.func,
  isOutsideRange: PropTypes.func,
  isDayHighlighted: PropTypes.func,

  // internationalization props
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  monthFormat: PropTypes.string,
  weekDayFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(SingleDatePickerPhrases)),
  locale: PropTypes.string,
  dayAriaLabelFormat: PropTypes.string,
};
