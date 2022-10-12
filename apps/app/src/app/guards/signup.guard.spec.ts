import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AppPath, getRouterLinkForAppPath, User } from '@common';
import { AuthState, selectAuthenticated, selectInitialRefreshCompleted, selectProfile } from '@common-ui';
import { createMock } from '@golevelup/ts-jest';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppTestingModule } from '../app-testing.module';

import { SignUpGuard } from './signup.guard';

describe(`SignupGuard`, () => {
  let guard: SignUpGuard;
  let mockStore: MockStore;
  let mockAuthenticatedSelector: MemoizedSelector<AuthState, boolean>;
  let router: Router;
  let activatedRouteSnapshotMock: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
      providers: [
        SignUpGuard,
        provideMockStore(),
        {
          provide: Router,
          useValue: createMock<Router>({
            parseUrl: (url: string) => url,
          }),
        },
      ],
    });

    guard = TestBed.inject(SignUpGuard);
    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    mockAuthenticatedSelector = mockStore.overrideSelector(selectAuthenticated, true);
    activatedRouteSnapshotMock = createMock<ActivatedRouteSnapshot>();

    mockStore.overrideSelector(selectInitialRefreshCompleted, true);

    jest.spyOn(router, 'parseUrl');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe(`canActivate`, () => {
    it(`should call signUpCompleted`, () => {
      const spy = jest.spyOn(guard as any, 'signUpCompleted');

      mockStore.overrideSelector(selectProfile, undefined);

      guard.canActivate(activatedRouteSnapshotMock, createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.Signup) }));

      expect(spy).toHaveBeenCalledWith(activatedRouteSnapshotMock);
    });
  });

  describe(`canActivateChild`, () => {
    describe(`if the user is not authenticated`, () => {
      beforeEach(() => {
        mockAuthenticatedSelector.setResult(false);
      });

      it(`should return the signup path if the current url contains the signup path but is not the signup path `, async () => {
        expect(
          await guard.canActivateChild(
            activatedRouteSnapshotMock,
            createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.SignupName) })
          )
        ).toEqual(AppPath.Signup);
      });

      it(`should return true if the current url is the signup path`, async () => {
        expect(
          await guard.canActivateChild(
            activatedRouteSnapshotMock,
            createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.Signup) })
          )
        ).toBe(true);
      });

      it(`should return true if the current url does not contain the signup path`, async () => {
        expect(
          await guard.canActivateChild(
            activatedRouteSnapshotMock,
            createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.Login) })
          )
        ).toBe(true);
      });
    });

    describe(`if the user is authenticated`, () => {
      beforeEach(() => {
        mockAuthenticatedSelector.setResult(true);
      });

      it(`should allow the user to visit urls for uncompleted steps `, async () => {
        mockStore.overrideSelector(selectProfile, undefined);

        expect(
          await guard.canActivateChild(
            activatedRouteSnapshotMock,
            createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.SignupVerify) })
          )
        ).toEqual(true);

        mockStore.overrideSelector(selectProfile, { emailVerified: true } as User);

        expect(
          await guard.canActivateChild(
            activatedRouteSnapshotMock,
            createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.SignupName) })
          )
        ).toEqual(true);

        mockStore.overrideSelector(selectProfile, { emailVerified: true, name: 'Test' } as User);

        expect(
          await guard.canActivateChild(
            activatedRouteSnapshotMock,
            createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.SignupLocation) })
          )
        ).toEqual(true);
      });

      it(`should redirect to the first uncompleted signup step`, async () => {
        mockStore.overrideSelector(selectProfile, undefined);

        expect(
          await guard.canActivateChild(
            activatedRouteSnapshotMock,
            createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.Signup) })
          )
        ).toEqual(AppPath.SignupVerify);

        mockStore.overrideSelector(selectProfile, { emailVerified: true } as User);

        expect(
          await guard.canActivateChild(
            activatedRouteSnapshotMock,
            createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.Signup) })
          )
        ).toEqual(AppPath.SignupName);

        mockStore.overrideSelector(selectProfile, { emailVerified: true, name: 'Test' } as User);

        expect(
          await guard.canActivateChild(
            activatedRouteSnapshotMock,
            createMock<RouterStateSnapshot>({ url: getRouterLinkForAppPath(AppPath.Root) })
          )
        ).toEqual(AppPath.SignupLocation);
      });
    });
  });
});
