import _ from 'lodash';
import bizniz from '../../src/bizniz';
import generateDate from '../helpers/generate-date';
import isSameDay from '../helpers/is-same-day';

var DATE_FORMAT = 'YYYY-MM-DD';
var start, calculated;

describe('Adding weekdays', () => {
  describe('when the count is not a number', () => {
    beforeEach(() => {
      start = generateDate('2015-03-01');
    });

    it('should return the same moment', () => {
      var clone = generateDate(start);
      calculated = bizniz.addWeekDays(start, {});
      expect(isSameDay(clone, calculated)).to.be.true;
    });
  });

  describe('starting at Sunday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-01');
    });

    _.each(fixtures.add.sunday, (solution, addition) => {
      it('when adding, should calculate the correct number of workdays between every two dates; ' + addition + '.', () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });

    _.each(fixtures.add.sunday, (solution, addition) => {
      it('when subtracting negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Monday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-02');
    });

    _.each(fixtures.add.monday, (solution, addition) => {
      it('when adding, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });

    _.each(fixtures.add.monday, (solution, addition) => {
      it('when subtracting negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Tuesday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-03');
    });

    _.each(fixtures.add.tuesday, (solution, addition) => {
      it('when adding, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });

    _.each(fixtures.add.tuesday, (solution, addition) => {
      it('when subtracting negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Wednesday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-04');
    });

    _.each(fixtures.add.wednesday, (solution, addition) => {
      it('when adding, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });

    _.each(fixtures.add.wednesday, (solution, addition) => {
      it('when subtracting negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Thursday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-05');
    });

    _.each(fixtures.add.thursday, (solution, addition) => {
      it('when adding, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });

    _.each(fixtures.add.thursday, (solution, addition) => {
      it('when subtracting negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Friday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-06');
    });

    _.each(fixtures.add.friday, (solution, addition) => {
      it('when adding, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });

    _.each(fixtures.add.friday, (solution, addition) => {
      it('when subtracting negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });

  describe('starting at Saturday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-07');
    });

    _.each(fixtures.add.saturday, (solution, addition) => {
      it('when adding, should calculate the correct number of workdays between every two dates; ' + addition + '.', () => {
        solution = generateDate(solution);
        calculated = bizniz.addWeekDays(generateDate(start), addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });

    _.each(fixtures.add.saturday, (solution, addition) => {
      it('when subtracting negative, should calculate the correct number of workdays between every two dates; ' + addition, () => {
        solution = generateDate(solution);
        calculated = bizniz.subtractWeekDays(generateDate(start), -addition);
        expect(isSameDay(solution, calculated)).to.be.true;
      });
    });
  });
});
