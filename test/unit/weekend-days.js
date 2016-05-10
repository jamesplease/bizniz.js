import _ from 'lodash';
import bizniz from '../../src/bizniz';
import generateDate from '../helpers/generate-date';

var start, endMoment, weekendDays;

describe('Weekend day count', () => {
  describe('starting at Sunday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-01');
    });

    _.each(fixtures.sunday, (fixture, description) => {
      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(start, endMoment);
        expect(weekendDays).to.equal(fixture.weekendDays);
      });

      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(endMoment, start);
        expect(weekendDays).to.equal(-fixture.weekendDays);
      });
    });
  });

  describe('starting at Monday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-02');
    });

    _.each(fixtures.monday, (fixture, description) => {
      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(start, endMoment);
        expect(weekendDays).to.equal(fixture.weekendDays);
      });

      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(endMoment, start);
        expect(weekendDays).to.equal(-fixture.weekendDays);
      });
    });
  });

  describe('starting at Tuesday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-03');
    });

    _.each(fixtures.tuesday, (fixture, description) => {
      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(start, endMoment);
        expect(weekendDays).to.equal(fixture.weekendDays);
      });

      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(endMoment, start);
        expect(weekendDays).to.equal(-fixture.weekendDays);
      });
    });
  });

  describe('starting at Wednesday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-04');
    });

    _.each(fixtures.wednesday, (fixture, description) => {
      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(start, endMoment);
        expect(weekendDays).to.equal(fixture.weekendDays);
      });

      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(endMoment, start);
        expect(weekendDays).to.equal(-fixture.weekendDays);
      });
    });
  });

  describe('starting at Thursday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-05');
    });

    _.each(fixtures.thursday, (fixture, description) => {
      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(start, endMoment);
        expect(weekendDays).to.equal(fixture.weekendDays);
      });

      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(endMoment, start);
        expect(weekendDays).to.equal(-fixture.weekendDays);
      });
    });
  });

  describe('starting at Friday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-06');
    });

    _.each(fixtures.friday, (fixture, description) => {
      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(start, endMoment);
        expect(weekendDays).to.equal(fixture.weekendDays);
      });

      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(endMoment, start);
        expect(weekendDays).to.equal(-fixture.weekendDays);
      });
    });
  });

  describe('starting at Saturday', () => {
    beforeEach(() => {
      start = generateDate('2015-03-07');
    });

    _.each(fixtures.saturday, (fixture, description) => {
      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(start, endMoment);
        expect(weekendDays).to.equal(fixture.weekendDays);
      });

      it('should calculate the correct number of workdays between every two dates; ' + description, () => {
        endMoment = generateDate(start);
        endMoment = bizniz.addDays(endMoment, fixture.duration);
        weekendDays = bizniz.weekendDaysBetween(endMoment, start);
        expect(weekendDays).to.equal(-fixture.weekendDays);
      });
    });
  });
});
