import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { ISO_FORMAT } from '../constants';
export default function toISODateString(date, currentFormat) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (isValid(date)) {
      return format(date, ISO_FORMAT);
    }
  }

  if (typeof date === 'string') {
    if (currentFormat) {
      var newDate = parse(date, currentFormat, new Date());

      if (isValid(newDate)) {
        return format(newDate, ISO_FORMAT);
      }
    } else {
      var _newDate;

      _newDate = parseISO(date);

      if (isValid(_newDate)) {
        return format(_newDate, ISO_FORMAT);
      }

      _newDate = Date.parse(date);

      if (isValid(_newDate)) {
        return format(_newDate, ISO_FORMAT);
      }
    }
  }

  return null;
}