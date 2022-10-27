import { sanitizeSearchValue } from './sanitize-search-value';

describe(`sanitizeSearchValue`, () => {
  it(`should return an empty string if the value is null`, () => {
    expect(sanitizeSearchValue(null)).toBe('');
  });

  it(`should return an empty string if the value is undefined`, () => {
    expect(sanitizeSearchValue(undefined)).toBe('');
  });

  it(`should return an empty string if the value is an empty string`, () => {
    expect(sanitizeSearchValue('')).toBe('');
  });

  it(`should return an empty string if the value is a string of whitespace`, () => {
    expect(sanitizeSearchValue(' ')).toBe('');
  });

  it(`should return an empty string if the value is a string of multiple whitespace characters`, () => {
    expect(sanitizeSearchValue('  ')).toBe('');
  });

  it(`should return a lowercase string with multiple whitespace removed`, () => {
    expect(sanitizeSearchValue('  Test  query ')).toBe('test query');
  });
});
