import { ValuesPipe } from './values.pipe';

describe(`ValuesPipe`, () => {
  let pipe: ValuesPipe;

  beforeEach(() => {
    pipe = new ValuesPipe();
  });

  it(`create an instance`, () => {
    expect(pipe).toBeTruthy();
  });

  describe(`transform`, () => {
    it(`should return undefined if the value is undefined`, () => {
      expect(pipe.transform()).toBeUndefined();
    });

    it(`should return the values of an object`, () => {
      expect(pipe.transform({ a: 1, b: 2 })).toEqual([1, 2]);
    });
  });
});
