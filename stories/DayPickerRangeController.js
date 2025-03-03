import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import getDay from 'date-fns/getDay';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';

import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';
import getMonths from '../src/utils/getMonths';

import CloseButton from '../src/components/CloseButton';
import KeyboardShortcutRow from '../src/components/KeyboardShortcutRow';

import { NAV_POSITION_BOTTOM, VERTICAL_ORIENTATION, VERTICAL_SCROLLABLE } from '../src/constants';

import DayPickerRangeControllerWrapper from '../examples/DayPickerRangeControllerWrapper';

const dayPickerRangeControllerInfo = `The ${monospace('DayPickerRangeController')} component is a
  fully controlled version of the ${monospace('DayPicker')} that has built-in rules for selecting a
  date range. Unlike the ${monospace('DayPicker')}, which requires the consumer to explicitly define
  ${monospace('onDayMouseEnter')}, ${monospace('onDayMouseLeave')}, and ${monospace('onDayClick')}
  handlers, the consumer needs simply to maintain the ${monospace('focusedInput')},
  ${monospace('startDate')}, and ${monospace('endDate')} values in state and then pass these down as
  props along with ${monospace('onFocusChange')} and ${monospace('onDatesChange')} callbacks that
  update them appropriately. You can see an example of this implementation <a href=
  "https://github.com/airbnb/react-dates/blob/master/examples/DayPickerRangeControllerWrapper.jsx">
  here</a>. <br/><br/>
  Note that the ${monospace('focusedInput')} prop may be ${monospace('null')}, but if this is the
  case, dates are not selectable. As a result, in the example wrapper, we always force
  ${monospace('focusedInput')} to be truthy in the ${monospace('onFocusChange')} method. <br/><br/>
  The ${monospace('DayPickerRangeController')} is particularly useful if you are interested in the
  ${monospace('DateRangePicker')} functionality and calendar presentation, but would like to
  implement your own inputs.`;

const TestPrevIcon = () => (
  <div
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      left: '22px',
      padding: '3px',
      position: 'absolute',
      top: '20px',
    }}
    tabIndex="0"
  >
    Prev
  </div>
);

const TestNextIcon = () => (
  <div
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
      position: 'absolute',
      right: '22px',
      top: '20px',
    }}
    tabIndex="0"
  >
    Next
  </div>
);

const TestBottomPrevIcon = () => (
  <div
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
      margin: '-10px 22px 30px',
    }}
    tabIndex="0"
  >
    Prev
  </div>
);

const TestBottomNextIcon = () => (
  <div
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
      margin: '-10px 22px 30px',
    }}
    tabIndex="0"
  >
    Next
  </div>
);

const TestCustomInfoPanel = () => (
  <div
    style={{
      padding: '10px 21px',
      borderTop: '1px solid #dce0e0',
      color: '#484848',
    }}
  >
    &#x2755; Some useful info here
  </div>
);

function renderNavPrevButton(buttonProps) {
  const {
    ariaLabel,
    disabled,
    onClick,
    onKeyUp,
    onMouseUp,
  } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{ position: 'absolute', top: 23, left: 22 }}
      type="button"
    >
      &lsaquo; Prev
    </button>
  );
}

function renderNavNextButton(buttonProps) {
  const {
    ariaLabel,
    disabled,
    onClick,
    onKeyUp,
    onMouseUp,
  } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{ position: 'absolute', top: 23, right: 22 }}
      type="button"
    >
      Next
    </button>
  );
}

function renderNavPrevButtonForVerticalScrollable(buttonProps) {
  const {
    ariaLabel,
    disabled,
    onClick,
    onKeyUp,
    onMouseUp,
  } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{ width: '100%', textAlign: 'center' }}
      type="button"
    >
      Prev
    </button>
  );
}

function renderNavNextButtonForVerticalScrollable(buttonProps) {
  const {
    ariaLabel,
    disabled,
    onClick,
    onKeyUp,
    onMouseUp,
  } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{ width: '100%', textAlign: 'center' }}
      type="button"
    >
      Next &rsaquo;
    </button>
  );
}

function renderKeyboardShortcutsButton(buttonProps) {
  const { ref, onClick, ariaLabel } = buttonProps;

  const buttonStyle = {
    backgroundColor: '#914669',
    border: 0,
    borderRadius: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',
    padding: 0,
    cursor: 'pointer',
    width: 26,
    height: 26,
    position: 'absolute',
    bottom: 0,
    right: 0,
  };

  const spanStyle = {
    color: 'white',
    position: 'absolute',
    bottom: 5,
    right: 9,
  };

  return (
    <button
      ref={ref}
      style={buttonStyle}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseUp={(e) => {
        e.currentTarget.blur();
      }}
    >
      <span style={spanStyle}>?</span>
    </button>
  );
}

function renderKeyboardShortcutsPanel(panelProps) {
  const {
    closeButtonAriaLabel,
    keyboardShortcuts,
    onCloseButtonClick,
    onKeyDown,
    title,
  } = panelProps;

  const PANEL_PAddING_PX = 50;

  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 2,
    }}
    >
      <div style={{
        backgroundColor: '#000000',
        opacity: 0.5,
        width: '100%',
        height: '100%',
      }}
      />
      <div style={{
        backgroundColor: '#ffffff',
        padding: PANEL_PAddING_PX,
        width: '50%',
        height: '50%',
        position: 'absolute',
        top: '25%',
        left: '25%',
      }}
      >
        <button
          aria-label={closeButtonAriaLabel}
          onClick={onCloseButtonClick}
          onKeyDown={onKeyDown}
          style={{
            height: 25,
            width: 25,
            position: 'absolute',
            top: PANEL_PAddING_PX,
            right: PANEL_PAddING_PX,
          }}
          type="button"
        >
          <CloseButton />
        </button>
        <div style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 16,
        }}
        >
          {title}
        </div>
        {keyboardShortcuts.map(({ action: keyboardShortcutAction, label, unicode }) => (
          <KeyboardShortcutRow
            action={keyboardShortcutAction}
            key={label}
            label={label}
            unicode={unicode}
          />
        ))}
      </div>
    </div>
  );
}

const datesList = [
  new Date(),
  addDays(new Date(), 1),
  addDays(new Date(), 3),
  addDays(new Date(), 9),
  addDays(new Date(), 10),
  addDays(new Date(), 11),
  addDays(new Date(), 13),
];

storiesOf('DayPickerRangeController', module)
  .addDecorator(InfoPanelDecorator(dayPickerRangeControllerInfo))
  .add('default', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
    />
  )))
  .add('with 7 days range selection', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      startDateOffset={(day) => subDays(day, 3)}
      endDateOffset={(day) => subDays(day, 3)}
    />
  )))
  .add('with 45 days range selection', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      startDateOffset={(day) => subDays(day, 22)}
      endDateOffset={(day) => addDays(day, 22)}
    />
  )))
  .add('with 4 days after today range selection', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      endDateOffset={(day) => day.add(4, 'days')}
    />
  )))
  .add('with current week range selection', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      startDateOffset={(day) => startOfWeek(day)}
      endDateOffset={(day) => endOfWeek(day)}
    />
  )))
  .add('with custom inputs', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      showInputs
    />
  )))
  .add('non-english locale', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      monthFormat="yyyy[年]MMMM"
      locale="zh-CN"
    />
  )))
  .add('single month', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      numberOfMonths={1}
    />
  )))
  .add('single month, custom caption', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={1}
      renderMonthElement={({ month, onMonthSelect, onYearSelect }) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <select
              value={getMonth(month)}
              onChange={(e) => { onMonthSelect(month, e.target.value); }}
            >
              {getMonths().map((label, value) => (
                <option key={label} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={getYear(month)}
              onChange={(e) => { onYearSelect(month, e.target.value); }}
            >
              <option value={getYear(new Date()) - 1}>Last year</option>
              <option value={getYear(new Date())}>{getYear(new Date())}</option>
              <option value={getYear(new Date()) + 1}>Next year</option>
            </select>
          </div>
        </div>
      )}
    />
  )))
  .add('3 months', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      numberOfMonths={3}
    />
  )))
  .add('vertical', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      orientation={VERTICAL_ORIENTATION}
    />
  )))
  .add('vertical scrollable', withInfo()(() => (
    <div style={{ height: 500 }}>
      <DayPickerRangeControllerWrapper
        onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
        orientation={VERTICAL_SCROLLABLE}
        numberOfMonths={6}
        verticalHeight={800}
      />
    </div>
  )))
  .add('vertical scrollable with custom month nav', withInfo()(() => (
    <div style={{ height: 500 }}>
      <DayPickerRangeControllerWrapper
        onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
        orientation={VERTICAL_SCROLLABLE}
        numberOfMonths={3}
        verticalHeight={300}
        navNext={(
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                bottom: 20,
                left: 50,
                fontSize: 24,
                border: '1px solid gray',
                width: 200,
                padding: 10,
              }}
            >
              Show More Months
            </span>
          </div>
        )}
        navPrev={(
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                top: 20,
                left: 50,
                fontSize: 24,
                border: '1px solid gray',
                width: 200,
                padding: 10,
              }}
            >
              Show More Months
            </span>
          </div>
        )}
      />
    </div>
  )))
  .add('vertical scrollable with custom rendered month navigation', withInfo()(() => (
    <div style={{ height: 500 }}>
      <DayPickerRangeControllerWrapper
        onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
        orientation={VERTICAL_SCROLLABLE}
        numberOfMonths={3}
        verticalHeight={300}
        renderNavPrevButton={renderNavPrevButtonForVerticalScrollable}
        renderNavNextButton={renderNavNextButtonForVerticalScrollable}
      />
    </div>
  )))
  .add('with custom month navigation icons', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  )))
  .add('with month navigation positioned at the bottom', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      navPosition={NAV_POSITION_BOTTOM}
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
    />
  )))
  .add('with custom month navigation positioned at the bottom', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      navPosition={NAV_POSITION_BOTTOM}
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      navPrev={<TestBottomPrevIcon />}
      navNext={<TestBottomNextIcon />}
      dayPickerNavigationInlineStyles={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    />
  )))
  .add('with custom month navigation buttons', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      renderNavPrevButton={renderNavPrevButton}
      renderNavNextButton={renderNavNextButton}
    />
  )))
  .add('with custom month navigation and blocked navigation (minDate and maxDate)', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      minDate={subMonths(startOfMonth(new Date()), 2)}
      maxDate={addMonths(endOfMonth(new Date()), 2)}
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  )))
  .add('with outside days enabled', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      numberOfMonths={1}
      enableOutsideDays
    />
  )))
  .add('with month specified on open', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      initialVisibleMonth={() => addMonths(new Date(), 10)}
    />
  )))
  .add('with minimum nights set', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      minimumNights={3}
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      initialStartDate={addDays(new Date(), 3)}
      autoFocusEndDate
    />
  )))
  .add('allows single day range', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      minimumNights={0}
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      initialStartDate={addDays(new Date(), 3)}
      autoFocusEndDate
    />
  )))
  .add('allows all days, including past days', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      isOutsideRange={() => false}
    />
  )))
  .add('allows next two weeks only', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      isOutsideRange={(day) => !isInclusivelyAfterDay(day, new Date())
        || isInclusivelyAfterDay(day, addWeeks(new Date(), 2))}
    />
  )))
  .add('with some blocked dates', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      isDayBlocked={(day1) => datesList.some((day2) => isSameDay(day1, day2))}
    />
  )))
  .add('with some highlighted dates', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      isDayHighlighted={(day1) => datesList.some((day2) => isSameDay(day1, day2))}
    />
  )))
  .add('blocks fridays', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      isDayBlocked={(day) => getDay(day) === 5}
    />
  )))
  .add('with navigation blocked (minDate and maxDate)', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      minDate={subMonths(startOfMonth(new Date()), 2)}
      maxDate={addMonths(endOfMonth(new Date()), 2)}
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
    />
  )))
  .add('with custom daily details', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      renderDayContents={(day) => format(day, 'ddd')}
    />
  )))
  .add('with info panel', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  )))
  .add('with no animation', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      transitionDuration={0}
    />
  )))
  .add('with vertical spacing applied', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      verticalBorderSpacing={16}
    />
  )))
  .add('with custom horizontal month spacing applied', withInfo()(() => (
    <div style={{ height: 500 }}>
      <DayPickerRangeControllerWrapper
        onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
        orientation={VERTICAL_SCROLLABLE}
        numberOfMonths={6}
        verticalHeight={800}
        horizontalMonthPadding={0}
      />
    </div>
  )))
  .add('with no nav buttons', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      noNavButtons
    />
  )))
  .add('with no nav prev button', withInfo()(() => (
    <div style={{ height: 500 }}>
      <DayPickerRangeControllerWrapper
        onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
        orientation={VERTICAL_SCROLLABLE}
        numberOfMonths={6}
        verticalHeight={800}
        noNavPrevButton
      />
    </div>
  )))
  .add('with no nav next button', withInfo()(() => (
    <div style={{ height: 500 }}>
      <DayPickerRangeControllerWrapper
        onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
        orientation={VERTICAL_SCROLLABLE}
        numberOfMonths={6}
        verticalHeight={800}
        noNavNextButton
      />
    </div>
  )))
  .add('with minimum nights for the hovered date', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      getMinNightsForHoverDate={() => 2}
    />
  )))
  .add('with minimum nights for the hovered date and some blocked dates', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      getMinNightsForHoverDate={() => 2}
      isDayBlocked={(day1) => datesList.some((day2) => isSameDay(day1, day2))}
    />
  )))
  .add('with custom keyboard shortcuts button', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      renderKeyboardShortcutsButton={renderKeyboardShortcutsButton}
    />
  )))
  .add('with custom keyboard shortcuts panel', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      renderKeyboardShortcutsPanel={renderKeyboardShortcutsPanel}
    />
  )))
  .add('with minimum nights set and daysViolatingMinNightsCanBeClicked set to true', withInfo()(() => (
    <DayPickerRangeControllerWrapper
      daysViolatingMinNightsCanBeClicked
      minimumNights={3}
      onOutsideClick={action('DayPickerRangeController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerRangeController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerRangeController::onNextMonthClick')}
      initialStartDate={addDays(new Date(), 3)}
      autoFocusEndDate
    />
  )));
