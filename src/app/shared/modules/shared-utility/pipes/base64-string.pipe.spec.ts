import { Base64StringPipe } from './base64-string.pipe';

describe('Base64StringPipe', () => {
  it('create an instance', () => {
    const pipe = new Base64StringPipe();
    expect(pipe).toBeTruthy();
  });
});
