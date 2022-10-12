import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { APIErrorCode, AppPath, getRouterLinkForAppPath, User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jest-marbles';
import { Observable } from 'rxjs';

import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { AuthEffects } from './auth.effects';

describe(`AuthEffects`, () => {
  let effects: AuthEffects;
  let actions$ = new Observable<Action>();
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: createMock<AuthService>() },
        { provide: Router, useValue: { navigateByUrl: jest.fn() } },
      ],
    }).compileComponents();

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    jest.spyOn(router, 'navigateByUrl');
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe(`refreshToken$`, () => {
    it(`should return a cold observable refreshTokenSuccess`, () => {
      const user = createMock<User>({ id: 'id' });
      const action = AuthActions.refreshToken();
      const completion = AuthActions.refreshTokenSuccess({ user });

      jest.spyOn(authService, 'refreshTokens').mockImplementation(() => cold('-b', { b: user }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.refreshToken$).toBeObservable(expected);
    });

    it(`should dispatch refreshTokenFailed if refreshTokens fails`, () => {
      const action = AuthActions.refreshToken();
      const completion = AuthActions.refreshTokenFailed();

      jest.spyOn(authService, 'refreshTokens').mockImplementation(() => cold('-#', {}, { error: { message: 'error' } }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.refreshToken$).toBeObservable(expected);
    });
  });

  describe(`signup$`, () => {
    it(`should return a cold observable signUpSuccess`, () => {
      const user = createMock<User>({ id: 'id' });
      const action = AuthActions.signUp({ credentials: { email: 'email', password: 'password', language: 'en' } });
      const completion = AuthActions.signUpSuccess({ user });

      jest.spyOn(authService, 'signUp').mockImplementation(() => cold('-b', { b: user }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.signup$).toBeObservable(expected);
    });

    it(`should dispatch signUpFailed if signUp fails`, () => {
      const action = AuthActions.signUp({ credentials: { email: 'email', password: 'password', language: 'en' } });
      const completion = AuthActions.signUpFailed({ errorCode: APIErrorCode.UserAlreadyExists });

      jest.spyOn(authService, 'signUp').mockImplementation(() => cold('-#', {}, { error: { message: APIErrorCode.UserAlreadyExists } }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.signup$).toBeObservable(expected);
    });
  });

  describe(`login$`, () => {
    it(`should return a cold observable loginSuccess`, () => {
      const user = createMock<User>({ id: 'id' });
      const action = AuthActions.login({ credentials: { email: 'email', password: 'password' } });
      const completion = AuthActions.loginSuccess({ user });

      jest.spyOn(authService, 'login').mockImplementation(() => cold('-b', { b: user }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.login$).toBeObservable(expected);
    });

    it(`should dispatch loginFailed if login fails`, () => {
      const action = AuthActions.login({ credentials: { email: 'email', password: 'password' } });
      const completion = AuthActions.loginFailed({ errorCode: APIErrorCode.InvalidCredentials });

      jest.spyOn(authService, 'login').mockImplementation(() => cold('-#', {}, { error: { message: APIErrorCode.InvalidCredentials } }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe(`logout$`, () => {
    it(`should return a cold observable logoutSuccess`, () => {
      const action = AuthActions.logout();
      const completion = AuthActions.logoutSuccess();

      jest.spyOn(authService, 'logout').mockImplementation(() => cold('-b', { b: {} }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.logout$).toBeObservable(expected);
    });

    it(`should dispatch logoutFailed if logout fails`, () => {
      const action = AuthActions.logout();
      const completion = AuthActions.logoutFailed();

      jest.spyOn(authService, 'logout').mockImplementation(() => cold('-#', {}, { error: { message: 'error' } }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.logout$).toBeObservable(expected);
    });
  });

  describe(`logoutSuccess$`, () => {
    it(`should redirect to the root`, () => {
      const action = AuthActions.logoutSuccess();

      actions$ = hot('-a', { a: action });

      effects.logoutSuccess$.subscribe(() => expect(router.navigateByUrl).toBeCalledWith(getRouterLinkForAppPath(AppPath.Root)));
    });
  });

  describe(`verifyEmail$`, () => {
    it(`should return a cold observable verifyEmailSuccess`, () => {
      const action = AuthActions.verifyEmail({ code: 'code' });
      const completion = AuthActions.verifyEmailSuccess({ user: createMock<User>() });

      jest.spyOn(authService, 'verifyEmail').mockImplementation(() => cold('-b', { b: {} }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.verifyEmail$).toBeObservable(expected);
    });

    it(`should dispatch verifyEmailFailed if verifyEmail fails`, () => {
      const action = AuthActions.verifyEmail({ code: 'code' });
      const completion = AuthActions.verifyEmailFailed({ errorCode: APIErrorCode.EmailVerificationInvalidOrExpired });

      jest
        .spyOn(authService, 'verifyEmail')
        .mockImplementation(() => cold('-#', {}, { error: { message: APIErrorCode.EmailVerificationInvalidOrExpired } }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.verifyEmail$).toBeObservable(expected);
    });
  });

  describe(`resendEmailVerification$`, () => {
    it(`should return a cold observable resendEmailVerificationSuccess`, () => {
      const retryEnables = new Date();

      const action = AuthActions.resendEmailVerification();
      const completion = AuthActions.resendEmailVerificationSuccess({ retryEnables });

      jest.spyOn(authService, 'resendVerificationEmail').mockImplementation(() => cold('-b', { b: retryEnables }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.resendEmailVerification$).toBeObservable(expected);
    });

    it(`should dispatch resendEmailVerificationFailed if resendEmailVerification fails`, () => {
      const retryEnables = new Date();

      const action = AuthActions.resendEmailVerification();
      const completion = AuthActions.resendEmailVerificationFailed({ retryEnables });

      jest
        .spyOn(authService, 'resendVerificationEmail')
        .mockImplementation(() => cold('-#', {}, { error: { error: retryEnables.getTime() } }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.resendEmailVerification$).toBeObservable(expected);
    });
  });

  describe(`updateProfile$`, () => {
    it(`should return a cold observable updateProfileSuccess`, () => {
      const action = AuthActions.updateProfile({ user: createMock<User>() });
      const completion = AuthActions.updateProfileSuccess({ user: createMock<User>() });

      jest.spyOn(authService, 'updateProfile').mockImplementation(() => cold('-b', { b: {} }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.updateProfile$).toBeObservable(expected);
    });

    it(`should dispatch updateProfileFailed if updateProfile fails`, () => {
      const action = AuthActions.updateProfile({ user: createMock<User>() });
      const completion = AuthActions.updateProfileFailed({ errorCode: APIErrorCode.InvalidCredentials });

      jest
        .spyOn(authService, 'updateProfile')
        .mockImplementation(() => cold('-#', {}, { error: { message: APIErrorCode.InvalidCredentials } }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.updateProfile$).toBeObservable(expected);
    });
  });

  describe(`requestPasswordReset$`, () => {
    it(`should return a cold observable requestPasswordResetSuccess`, () => {
      const action = AuthActions.requestPasswordReset({ email: 'email' });
      const completion = AuthActions.requestPasswordResetSuccess({ email: 'email' });

      jest.spyOn(authService, 'requestPasswordReset').mockImplementation(() => cold('-b', { b: {} }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.requestPasswordReset$).toBeObservable(expected);
    });
    it(`should dispatch requestPasswordResetFailed if requestPasswordReset fails`, () => {
      const action = AuthActions.requestPasswordReset({ email: 'email' });
      const completion = AuthActions.requestPasswordResetFailed({ errorCode: APIErrorCode.InvalidCredentials });

      jest
        .spyOn(authService, 'requestPasswordReset')
        .mockImplementation(() => cold('-#', {}, { error: { message: APIErrorCode.InvalidCredentials } }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.requestPasswordReset$).toBeObservable(expected);
    });
  });

  describe(`requestPasswordResetSuccess$`, () => {
    it(`should redirect to the password reset success page`, () => {
      const email = 'email';
      const action = AuthActions.requestPasswordResetSuccess({ email });

      actions$ = hot('-a', { a: action });

      effects.requestPasswordResetSuccess$.subscribe(() =>
        expect(router.navigateByUrl).toBeCalledWith(`${getRouterLinkForAppPath(AppPath.RequestPasswordResetSuccess)}?email=${email}`)
      );
    });
  });

  describe(`resetPassword$`, () => {
    it(`should return a cold observable resetPasswordSuccess`, () => {
      const credentials = { password: 'password', code: 'code' };

      const action = AuthActions.resetPassword({ credentials });
      const completion = AuthActions.resetPasswordSuccess();

      jest.spyOn(authService, 'resetPassword').mockImplementation(() => cold('-b', { b: {} }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.resetPassword$).toBeObservable(expected);
    });

    it(`should dispatch resetPasswordFailed if resetPassword fails`, () => {
      const credentials = { password: 'password', code: 'code' };

      const action = AuthActions.resetPassword({ credentials });
      const completion = AuthActions.resetPasswordFailed({ errorCode: APIErrorCode.InvalidCredentials });

      jest
        .spyOn(authService, 'resetPassword')
        .mockImplementation(() => cold('-#', {}, { error: { message: APIErrorCode.InvalidCredentials } }));
      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.resetPassword$).toBeObservable(expected);
    });
  });

  describe(`resetPasswordSuccess$`, () => {
    it(`should redirect to the password reset success page`, () => {
      const action = AuthActions.resetPasswordSuccess();

      actions$ = hot('-a', { a: action });

      effects.resetPasswordSuccess$.subscribe(() =>
        expect(router.navigateByUrl).toBeCalledWith(getRouterLinkForAppPath(AppPath.ResetPasswordSuccess))
      );
    });
  });
});
