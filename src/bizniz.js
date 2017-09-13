import containedPeriodicValues from 'contained-periodic-values';

const DEFAULT_WEEKEND_DAYS = [0, 6];
const DEFAULT_WORK_WEEK_LENGTH = 5;

var weekEndSetting = DEFAULT_WEEKEND_DAYS;
var workWeekLength = DEFAULT_WORK_WEEK_LENGTH;

// The number of milliseconds in one day
const MS_PER_DAY = 24 * 60 * 60 * 1000;

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
  setWeekendDays(weekEndDays) {
    weekEndSetting = [].concat(weekEndDays);
    workWeekLength = 7 - weekEndSetting.length;
    return bizniz;
  },
  dateIsBefore(startDate, endDate) {
    return startDate.getTime() < endDate.getTime();
  },

  daysBetween(startDate, endDate) {
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / MS_PER_DAY;
  },
  daysUntilWeekdays(startDay, direction) {
    //checks how many days until the weekend.
    if (weekEndSetting.indexOf(startDay) === -1) {
      return 0;
    }

    direction = determineSign(direction);
    let date =  new Date();
    let currentDay = date.getDay();
    let distance = startDay - currentDay;
    date.setDate(date.getDate() + distance);
    let daysCount = 0;
    date = this.addDays(date,direction);
    while (this.isWeekendDay(date)) {
      ++daysCount;
      date = this.addDays(date,direction);
    }
    return daysCount;
  },

  addDays(date, days) {
    var result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
  },

  isWeekDay(date) {
    return weekEndSetting.indexOf(date.getDay()) === -1;
  },

  isWeekendDay(date) {
    return !this.isWeekDay(date);
  },

  weekDaysBetween(startDate, endDate) {
    let start, end;
    let reverse = this.dateIsBefore(endDate, startDate);
    if (reverse) {
      start = endDate;
      end = startDate;
    } else {
      start = startDate;
      end = endDate;
    }

    const startDay = start.getDay();
    const totalDays = Math.abs(this.daysBetween(start, end));
    let containedWeekendDays = 0;
    for (let day of weekEndSetting) {
      containedWeekendDays += containedPeriodicValues(startDay, totalDays + startDay, day, 7);
    }
    const coefficient = reverse ? -1 : 1;

    return coefficient * (totalDays - (containedWeekendDays));
  },

  weekendDaysBetween(startDate, endDate) {
    const totalDaysDiff = this.daysBetween(startDate, endDate);
    const weekDays = this.weekDaysBetween(startDate, endDate);

    return totalDaysDiff - weekDays;
  },

  addWeekDays(date, days) {
    if (days === 0 || isNaN(days)) { return new Date(date); }

    var sign = determineSign(days);
    var day = date.getDay();
    var absIncrement = Math.abs(days);

    var days = this.daysUntilWeekdays(day, sign);

    // Add padding for weekends.
    var paddedAbsIncrement = absIncrement;
    if (weekEndSetting.indexOf(day) === -1 && sign > 0) {
      paddedAbsIncrement += day;
    } else if (weekEndSetting.indexOf(day) === -1 && sign < 0) {
      paddedAbsIncrement += 6 - day;
    }
    var weekendsInbetween =
      Math.max(Math.floor(paddedAbsIncrement / workWeekLength) - 1, 0) +
      (paddedAbsIncrement > workWeekLength && paddedAbsIncrement % workWeekLength > 0 ? 1 : 0);

    // Add the increment and number of weekends.
    days += absIncrement + weekendsInbetween * weekEndSetting.length;

    return this.addDays(date, sign * days);
  },

  subtractWeekDays(date, days) {
    return this.addWeekDays(date, -days);
  }
};

export default bizniz;
