import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AppPath, Authority, PartialRecord, User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { AppRouteAuthorities } from '../../interfaces';
import { AuthActions, AuthState, selectAuthenticated, selectAuthUser, selectInitialRefreshCompleted } from '../store';
import { APP_ROUTING_TREE, AuthGuard } from './auth.guard';

describe(`AuthGuard`, () => {
  let guard: AuthGuard;
  let mockStore: MockStore;
  let mockAuthenticatedSelector: MemoizedSelector<AuthState, boolean>;
  let consoleWarn: typeof console.error;
  let warnSpy: jest.SpyInstance;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      providers: [
        AuthGuard,
        provideMockStore(),
        {
          provide: APP_ROUTING_TREE,
          useValue: [
            {
              path: AppPath.Root,
            },
            {
              path: AppPath.Login,
            },
            {
              path: AppPath.Users,
              authority: Authority.ManageUsers,
              children: [
                {
                  path: AppPath.CreateUser,
                  authority: Authority.CreateUsers,
                },
              ],
            },
          ],
        },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectInitialRefreshCompleted, true);
    mockAuthenticatedSelector = mockStore.overrideSelector(selectAuthenticated, true);

    consoleWarn = console.warn;

    warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    jest.spyOn(mockStore, 'dispatch');
  });

  afterEach(() => {
    console.warn = consoleWarn;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe(`canActivate`, () => {
    it(`should call isAuthenticated`, async () => {
      const url = 'url';
      const isAuthenticatedSpy = jest.spyOn(guard as any, 'isAuthenticated').mockResolvedValue(true);

      await guard.canActivate(createMock<ActivatedRouteSnapshot>(), createMock<RouterStateSnapshot>({ url }));

      expect(isAuthenticatedSpy).toHaveBeenCalledWith(url);
    });
  });

  describe(`hasAuthorityForRoute`, () => {
    it(`should return false if url does not match a path`, async () => {
      const url = 'url';

      expect(await guard.hasAuthorityForRoute(url)).toBe(false);
      expect(warnSpy).toHaveBeenLastCalledWith(`No route found in AppRoutingTree for url: ${url}`);
    });

    it(`should return true if route has no authorities`, async () => {
      const url = `/${AppPath.Root}`;

      expect(await guard.hasAuthorityForRoute(url)).toBe(true);
    });

    it(`should return false if user does not have authority`, async () => {
      const url = `/${AppPath.Users}`;
      const authority = Authority.ManageUsers;

      mockStore.overrideSelector(selectAuthUser, createMock<User>({ role: 'user' }));

      expect(await guard.hasAuthorityForRoute(url)).toBe(false);
      expect(warnSpy).toHaveBeenLastCalledWith(`User does not have authority to access route "${url}". Required authorities: ${authority}`);
    });

    it(`should return false if user does not have authority`, async () => {
      const url = `/${AppPath.CreateUser}`;

      mockStore.overrideSelector(selectAuthUser, createMock<User>({ role: 'user' }));

      expect(await guard.hasAuthorityForRoute(url)).toBe(false);
      expect(warnSpy).toHaveBeenLastCalledWith(
        `User does not have authority to access route "${url}". Required authorities: ${Authority.ManageUsers}, ${Authority.CreateUsers}`
      );
    });

    it(`should return true if user has authority`, async () => {
      const url = `/${AppPath.CreateUser}`;

      mockStore.overrideSelector(selectAuthUser, createMock<User>({ role: 'sysadmin' }));

      expect(await guard.hasAuthorityForRoute(url)).toBe(true);
    });
  });

  describe(`canActivateChild`, () => {
    it(`should return true if the user is authenticated`, async () => {
      mockAuthenticatedSelector.setResult(true);

      expect(await guard.canActivateChild(createMock<ActivatedRouteSnapshot>(), createMock<RouterStateSnapshot>({ url: '/' }))).toBe(true);
    });

    it(`shouldn't dispatch a logout action if the user is authenticated`, async () => {
      mockAuthenticatedSelector.setResult(true);

      await guard.canActivateChild(createMock<ActivatedRouteSnapshot>(), createMock<RouterStateSnapshot>({ url: '/' }));

      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });

    it(`should return false if the user is not authenticated`, async () => {
      mockAuthenticatedSelector.setResult(false);

      expect(await guard.canActivateChild(createMock<ActivatedRouteSnapshot>(), createMock<RouterStateSnapshot>({ url: '/' }))).toBe(false);
    });

    it(`should dispatch a logout action if the user is not authenticated`, async () => {
      mockAuthenticatedSelector.setResult(false);

      await guard.canActivateChild(createMock<ActivatedRouteSnapshot>(), createMock<RouterStateSnapshot>({ url: '/' }));

      expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    });

    it(`should navigate to the app route if the user is authenticated and the url is the login url`, async () => {
      const navigateSpy = jest.spyOn(router, 'navigate');

      mockAuthenticatedSelector.setResult(true);

      await guard.canActivateChild(createMock<ActivatedRouteSnapshot>(), createMock<RouterStateSnapshot>({ url: `/${AppPath.Login}` }));

      expect(navigateSpy).toHaveBeenCalledWith([AppPath.Root]);
    });

    it(`should return false if the user does not have the required authorities to view that route`, async () => {
      mockStore.overrideSelector(selectAuthUser, createMock<User>({ role: 'user' }));

      expect(
        await guard.canActivateChild(
          createMock<ActivatedRouteSnapshot>(),
          createMock<RouterStateSnapshot>({ url: `/${AppPath.CreateUser}` })
        )
      ).toBe(false);
    });
  });

  describe(`addRouteToDictionary`, () => {
    it(`should throw an error if the route is already in the dictionary`, () => {
      const dictionary = createMock<PartialRecord<AppPath, AppRouteAuthorities>>({ [AppPath.Root]: { authorities: [] } });

      expect(() => (guard as any).addRouteToDictionary(dictionary, { path: AppPath.Root })).toThrowError(
        `Duplicate route found in AppRoutingTree when creating AppRoutingDictionary - "${AppPath.Root}". Routes should be unique for permissions logic to work.`
      );
    });
  });
});
