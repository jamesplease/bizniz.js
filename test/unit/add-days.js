import bizniz from '../../src/bizniz';
import isSameDay from '../helpers/is-same-day';

describe('addDays()', () => {
  it('should return the same day when adding 0', () => {
    // May 7th, 2016
    const startDate = new Date(2016, 4, 7);
    const endDate = bizniz.addDays(startDate, 0);

    // Ensures that a new Date is returned
    expect(startDate).to.not.equal(endDate);
    expect(isSameDay(startDate, endDate)).to.be.true;
  });

  it('should add 1 day when adding 1', () => {
    // May 7th, 2016
    const startDate = new Date(2016, 4, 7);
    const endDate = bizniz.addDays(startDate, 1);

    // Ensures that a new Date is returned
    expect(startDate).to.not.equal(endDate);

    const diff = bizniz.daysBetween(startDate, endDate);
    expect(diff).to.be.equal(1);
  });

  it('should add -1 day when adding -1', () => {
    // May 7th, 2016
    const startDate = new Date(2016, 4, 7);
    const endDate = bizniz.addDays(startDate, -1);

    // Ensures that a new Date is returned
    expect(startDate).to.not.equal(endDate);

    const diff = bizniz.daysBetween(startDate, endDate);
    expect(diff).to.be.equal(-1);
  });
});
