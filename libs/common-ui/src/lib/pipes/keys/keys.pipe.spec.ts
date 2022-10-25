import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
  let pipe: KeysPipe;

  beforeEach(() => {
    pipe = new KeysPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it(`should return undefined if the value is undefined`, () => {
      expect(pipe.transform(undefined)).toBeUndefined();
    });

    it(`should return the keys of an object`, () => {
      expect(pipe.transform({ a: 1, b: 2 })).toEqual(['a', 'b']);
    });
  });
});
