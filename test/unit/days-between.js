import bizniz from '../../src/bizniz';

describe('daysBetween()', () => {
  it('should return 0 for the same day', () => {
    // May 7th, 2016
    const startDate = new Date(2016, 4, 7);
    // May 7th, 2016
    const endDate = new Date(2016, 4, 7);
    expect(bizniz.daysBetween(startDate, endDate)).to.equal(0);
  });

  it('should return 1 for the day after', () => {
    // May 7th, 2016
    const startDate = new Date(2016, 4, 7);
    // May 8th, 2016
    const endDate = new Date(2016, 4, 8);
    expect(bizniz.daysBetween(startDate, endDate)).to.equal(1);
  });

  it('should return -1 for the day before', () => {
    // May 8th, 2016
    const startDate = new Date(2016, 4, 8);
    // May 7th, 2016
    const endDate = new Date(2016, 4, 7);
    expect(bizniz.daysBetween(startDate, endDate)).to.equal(-1);
  });

  it('should return 29 for a 29 day difference', () => {
    // May 1th, 2016
    const startDate = new Date(2016, 4, 1);
    // May 30th, 2016
    const endDate = new Date(2016, 4, 30);
    expect(bizniz.daysBetween(startDate, endDate)).to.equal(29);
  });
});
