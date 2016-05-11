import bizniz from '../../src/bizniz';

describe('dateIsBefore()', () => {
  it('should return false for the same day', () => {
    // May 7th, 2016
    const startDate = new Date(2016, 4, 7);
    // May 7th, 2016
    const endDate = new Date(2016, 4, 7);
    expect(bizniz.dateIsBefore(startDate, endDate)).to.be.false;
  });

  it('should return true for the day before', () => {
    // May 7th, 2016
    const startDate = new Date(2016, 4, 7);
    // May 8th, 2016
    const endDate = new Date(2016, 4, 8);
    expect(bizniz.dateIsBefore(startDate, endDate)).to.be.true;
  });

  it('should return false for the day after', () => {
    // May 8th, 2016
    const startDate = new Date(2016, 4, 8);
    // May 7th, 2016
    const endDate = new Date(2016, 4, 7);
    expect(bizniz.dateIsBefore(startDate, endDate)).to.be.false;
  });
});
