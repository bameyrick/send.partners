import { getRouterLinkForAppPath } from './get-router-link-for-app-path';

describe(`getRouterLinkForAppPath`, () => {
  it(`should return the path prefixed with a /`, () => {
    expect(getRouterLinkForAppPath('test')).toBe('/test');
  });

  it(`replace params with provided params`, () => {
    expect(getRouterLinkForAppPath('test/:param', { param: 'value' })).toBe('/test/value');
  });

  it(`should throw an error if the param provided does not exist in the path`, () => {
    expect(() => getRouterLinkForAppPath('test/:param', { param2: 'value' })).toThrowError(
      `Paramater "param2" does not exist in the path "test/:param"`
    );
  });
});
