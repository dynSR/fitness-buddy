import { NumberToArrayPipe } from './number-to-array.pipe';

describe('ToArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
