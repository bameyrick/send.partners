import { isHTML } from './is-html';

describe(`isHTML`, () => {
  it(`should return false if the string is empty`, () => {
    expect(isHTML(``)).toBe(false);
  });

  it(`should return false if the string does not contain html`, () => {
    expect(isHTML(`test`)).toBe(false);
  });

  it(`should return true if the string contains html`, () => {
    expect(isHTML(`<p>test</p>`)).toBe(true);
  });
});
