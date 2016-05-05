import bizniz from '../../src/bizniz';

describe('isWeekendDay()', () => {
  it('should return true for Saturday', () => {
    // May 7th, 2016-04
    const date = new Date(2016, 4, 7);
    expect(bizniz.isWeekendDay(date)).to.be.true;
  });

  it('should return true for Sunday', () => {
    const date = new Date(2016, 4, 8);
    expect(bizniz.isWeekendDay(date)).to.be.true;
  });

  it('should return false for Monday', () => {
    // May 7th, 2016-04
    const date = new Date(2016, 4, 9);
    expect(bizniz.isWeekendDay(date)).to.be.false;
  });

  it('should return false for Tuesday', () => {
    const date = new Date(2016, 4, 10);
    expect(bizniz.isWeekendDay(date)).to.be.false;
  });

  it('should return false for Wednesday', () => {
    const date = new Date(2016, 4, 11);
    expect(bizniz.isWeekendDay(date)).to.be.false;
  });

  it('should return false for Thursday', () => {
    const date = new Date(2016, 4, 12);
    expect(bizniz.isWeekendDay(date)).to.be.false;
  });

  it('should return false for Friday', () => {
    const date = new Date(2016, 4, 13);
    expect(bizniz.isWeekendDay(date)).to.be.false;
  });
});
