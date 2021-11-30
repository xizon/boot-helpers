import math from '../src/_public/math';

describe('math', () => {

  it('evaluate', () => {
    expect( parseInt(math.evaluate('100/3')) ).toBe(33);
  });
  
  it('getRandomFloat', () => {
    expect( math.getRandomFloat(1, 10) ).toBeGreaterThan(1);
    expect( math.getRandomFloat(1, 10) ).toBeLessThan(10);
  });

  it('getDegree', () => {
    expect( Math.round( math.getDegree(3.1415926) ) ).toBe(180);
  });

  it('getRadian', () => {
    console.log(math.getRadian(180).toFixed(2));
    expect( Number( math.getRadian(180).toFixed(2) ) ).toBe(3.14);
  });

});
