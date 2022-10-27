import { Authority } from './authority';
import { hasAuthority } from './has-authority';

describe(`hasAuthority`, () => {
  let consoleLog: typeof console.log;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLog = console.log;
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    console.log = consoleLog;
  });

  it(`should return true if user has the correct role for a given authority`, () => {
    expect(hasAuthority(Authority.CreateAdmin, { role: 'sysadmin' })).toBe(true);
  });

  it(`should return false if user doesn't have the correct role for a given authority`, () => {
    expect(hasAuthority(Authority.CreateAdmin, { role: 'user' })).toBe(false);
  });

  it(`should log a message if user doesn't have the correct role for a given authority and logging is enabled`, () => {
    hasAuthority(Authority.CreateAdmin, { role: 'user' }, true);

    expect(logSpy).toHaveBeenCalledWith(`User does not have the required role to access ${Authority.CreateAdmin}. Allowed roles: sysadmin`);
  });
});
