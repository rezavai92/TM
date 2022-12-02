import { IsDefaultDatePipe } from './is-default-date.pipe';

describe('IsDefaultDatePipe', () => {
  it('create an instance', () => {
    const pipe = new IsDefaultDatePipe();
    expect(pipe).toBeTruthy();
  });
});
