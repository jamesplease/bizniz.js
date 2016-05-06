import containedPeriodicValues from 'contained-periodic-values';

const WEEKEND_DAYS = [0, 6];

// `date` - The Date to be coerced to UTC time
// Returns a new `Date` object.
function treatAsUTC(date) {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

// Math.sign polyfill
function determineSign(x) {
  x = +x;
  return x > 0 ? 1 : -1;
}

const bizniz = {
  dateIsBefore(startDate, endDate) {
    return startDate.getTime() < endDate.getTime();
  },

  daysBetween(startDate, endDate) {
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
  },

  addDays(date, days) {
    var result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
  },

  isWeekDay(date) {
    return WEEKEND_DAYS.indexOf(date.getDay()) === -1;
  },

  isWeekendDay(date) {
    return !this.isWeekDay(date);
  },

  weekDaysBetween(startDate, endDate) {
    let start, end;
    let reverse = this.dateIsBefore(startDate, endDate);
    if (reverse) {
      start = endDate;
      end = startDate;
    } else {
      start = startDate;
      end = endDate;
    }

    const startDay = startDate.getDay();
    const totalDays = Math.abs(end.diff(start, 'days'));
    const containedSundays = containedPeriodicValues(startDay, totalDays + startDay, 0, 7);
    const containedSaturdays = containedPeriodicValues(startDay, totalDays + startDay, 6, 7);
    const coefficient = reverse ? -1 : 1;

    return coefficient * (totalDays - (containedSaturdays + containedSundays));
  },

  weekendDaysBetween(startDate, endDate) {
    const totalDaysDiff = this.daysBetween(startDate, endDate);
    const weekDays = this.weekDays(startDate, endDate);

    return totalDaysDiff - weekDays;
  },

  addWeekDays(date, days) {
    if (days === 0 || isNaN(days)) { return new Date(date); }

    var sign = determineSign(days);
    var day = date.getDay();
    var absIncrement = Math.abs(days);

    var days = 0;

    if (day === 0 && sign === -1) {
      days = 1;
    } else if (day === 6 && sign === 1) {
      days = 1;
    }

    // Add padding for weekends.
    var paddedAbsIncrement = absIncrement;
    if (day !== 0 && day !== 6 && sign > 0) {
      paddedAbsIncrement += day;
    } else if (day !== 0 && day !== 6 && sign < 0) {
      paddedAbsIncrement += 6 - day;
    }
    var weekendsInbetween =
      Math.max(Math.floor(paddedAbsIncrement / 5) - 1, 0) +
      (paddedAbsIncrement > 5 && paddedAbsIncrement % 5 > 0 ? 1 : 0);

    // Add the increment and number of weekends.
    days += absIncrement + weekendsInbetween * 2;

    return this.addDays(date, sign * days);
  },

  subtractWeekDays(date, days) {
    return this.addWeekDays(date, -days);
  }
};

export default bizniz;
