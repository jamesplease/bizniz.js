const WEEKEND_DAYS = [0, 6];

const bizniz = {
  isWeekDay(date) {
    return WEEKEND_DAYS.indexOf(date.getDay()) === -1;
  },

  isWeekendDay(date) {
    return !this.isWeekDay(date);
  }
};

export default bizniz;
