import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let pipe: ReversePipe;

  beforeEach(() => {
    pipe = new ReversePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe(`transform`, () => {
    it(`should return undefined if the value is undefined`, () => {
      expect(pipe.transform(undefined)).toBeUndefined();
    });

    it(`should reverse the values of the provided array`, () => {
      expect(pipe.transform([1, 2, 3])).toEqual([3, 2, 1]);
    });
  });
});
