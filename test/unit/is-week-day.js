import bizniz from '../../src/bizniz';

describe('isWeekDay()', () => {
  it('should return false for Saturday', () => {
    const date = new Date(2016, 4, 7);
    expect(bizniz.isWeekDay(date)).to.be.false;
  });

  it('should return false for Sunday', () => {
    const date = new Date(2016, 4, 8);
    expect(bizniz.isWeekDay(date)).to.be.false;
  });

  it('should return true for Monday', () => {
    const date = new Date(2016, 4, 9);
    expect(bizniz.isWeekDay(date)).to.be.true;
  });

  it('should return true for Tuesday', () => {
    const date = new Date(2016, 4, 10);
    expect(bizniz.isWeekDay(date)).to.be.true;
  });

  it('should return true for Wednesday', () => {
    const date = new Date(2016, 4, 11);
    expect(bizniz.isWeekDay(date)).to.be.true;
  });

  it('should return true for Thursday', () => {
    const date = new Date(2016, 4, 12);
    expect(bizniz.isWeekDay(date)).to.be.true;
  });

  it('should return true for Friday', () => {
    const date = new Date(2016, 4, 13);
    expect(bizniz.isWeekDay(date)).to.be.true;
  });
});
