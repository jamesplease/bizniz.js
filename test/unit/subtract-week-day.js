import _ from 'lodash';
import bizniz from '../../src/bizniz';
import generateDate from '../helpers/generate-date';
import isSameDay from '../helpers/is-same-day';

var start, calculated;

describe('Subtracting / adding negative weekdays', () => {
  describe('starting at Sunday', () => {
    beforeEach(() => {
      start = generateDate('2015-04-05');
    });

    _.each(fixtures.subtract.sunday, (solution, addition) => {
      it('when subtracting, should calculate the correct number of workdays between every two dates; ' + addition + '.', () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });

      it('when adding negative, should calculate the correct number of workdays between every two dates; ' + addition + '.', () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Monday', () => {
    beforeEach(() => {
      start = generateDate('2015-04-06');
    });

    _.each(fixtures.subtract.monday, (solution, addition) => {
      it('when subtracting, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });

      it('when adding negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Tuesday', () => {
    beforeEach(() => {
      start = generateDate('2015-04-07');
    });

    _.each(fixtures.subtract.tuesday, (solution, addition) => {
      it('when subtracting, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });

      it('when adding negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Wednesday', () => {
    beforeEach(() => {
      start = generateDate('2015-04-08');
    });

    _.each(fixtures.subtract.wednesday, (solution, addition) => {
      it('when subtracting, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });

      it('when adding negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Thursday', () => {
    beforeEach(() => {
      start = generateDate('2015-04-09');
    });

    _.each(fixtures.subtract.thursday, (solution, addition) => {
      it('when subtracting, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });

      it('when adding negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Friday', () => {
    beforeEach(() => {
      start = generateDate('2015-04-10');
    });

    _.each(fixtures.subtract.friday, (solution, addition) => {
      it('when subtracting, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });

      it('when adding negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Saturday', () => {
    beforeEach(() => {
      start = generateDate('2015-04-11');
    });

    _.each(fixtures.subtract.saturday, (solution, addition) => {
      it('when subtracting, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });

      it('when adding negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });
});
