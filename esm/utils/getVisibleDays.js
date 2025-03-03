import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import isBefore from 'date-fns/isBefore';
import isDate from 'date-fns/isDate';
import toISOMonthString from './toISOMonthString';
import getLocale from './getLocale';
export default function getVisibleDays(month, numberOfMonths, enableOutsideDays, withoutTransitionMonths, locale) {
  if (!isDate(month)) return {};
  var visibleDaysByMonth = {};
  var currentMonth = withoutTransitionMonths ? new Date(month) : subMonths(month, 1);

  for (var i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    var visibleDays = []; // set utc offset to get correct dates in future (when timezone changes)

    var firstOfMonth = startOfMonth(currentMonth);
    var lastOfMonth = endOfMonth(currentMonth);
    var currentDay = new Date(firstOfMonth); // days belonging to the previous month

    var localeData = getLocale(locale);

    if (enableOutsideDays) {
      for (var j = 0; j < localeData.options.weekStartsOn; j += 1) {
        var prevDay = subDays(currentDay, j + 1);
        visibleDays.unshift(prevDay);
      }
    }

    while (isBefore(currentDay, lastOfMonth)) {
      visibleDays.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }

    if (enableOutsideDays) {
      // weekday() returns the index of the day of the week according to the locale
      // this means if the week starts on Monday, weekday() will return 0 for a Monday date, not 1
      if (localeData.options.weekStartsOn !== 0) {
        // days belonging to the next month
        for (var k = localeData.options.weekStartsOn, count = 0; k < 7; k += 1, count += 1) {
          var nextDay = addDays(currentDay, count);
          visibleDays.push(nextDay);
        }
      }
    }

    visibleDaysByMonth[toISOMonthString(currentMonth)] = visibleDays;
    currentMonth = addMonths(currentMonth, 1);
  }

  return visibleDaysByMonth;
}