import { APIErrorCode } from '@common';
import { AuthActions } from './auth.actions';
import { authReducer, initialState } from './auth.reducer';

describe(`AuthReducer`, () => {
  it(`should return the initial state`, () => {
    const result = authReducer(undefined, { type: 'UNKNOWN' });

    expect(result).toEqual(initialState);
  });

  describe(`on AuthActions.refreshTokenSuccess`, () => {
    it(`should set the user`, () => {
      const user = { id: '1', email: 'email', email_verified: false, language: 'en' };

      const result = authReducer(initialState, AuthActions.refreshTokenSuccess({ user }));

      expect(result).toEqual({ ...initialState, errorCode: undefined, initialRefreshCompleted: true, user });
    });
  });

  describe(`on AuthActions.refreshTokenFailed`, () => {
    it(`should set the errorCode`, () => {
      const result = authReducer(initialState, AuthActions.refreshTokenFailed());

      expect(result).toEqual({ ...initialState, initialRefreshCompleted: true, tokens: null });
    });
  });

  describe(`on AuthActions.signUp`, () => {
    it(`should set the authorizing flag`, () => {
      const result = authReducer(
        initialState,
        AuthActions.signUp({ credentials: { email: 'email', password: 'password', language: 'en' } })
      );

      expect(result).toEqual({ ...initialState, authorizing: true });
    });
  });

  describe(`on AuthActions.signUpFailed`, () => {
    it(`should set the errorCode`, () => {
      const errorCode = APIErrorCode.UserAlreadyExists;

      const result = authReducer(initialState, AuthActions.signUpFailed({ errorCode }));

      expect(result).toEqual({ ...initialState, errorCode, authorizing: false });
    });
  });

  describe(`on AuthActions.signUpSuccess`, () => {
    it(`should set the user`, () => {
      const user = { id: '1', email: 'email', email_verified: false, language: 'en' };

      const result = authReducer(initialState, AuthActions.signUpSuccess({ user }));

      expect(result).toEqual({ ...initialState, errorCode: undefined, authorizing: false, initialRefreshCompleted: true, user });
    });
  });

  describe(`on AuthActions.login`, () => {
    it(`should set the authorizing flag`, () => {
      const result = authReducer(initialState, AuthActions.login({ credentials: { email: 'email', password: 'password' } }));

      expect(result).toEqual({ ...initialState, authorizing: true });
    });
  });

  describe(`on AuthActions.loginFailed`, () => {
    it(`should set the errorCode`, () => {
      const errorCode = APIErrorCode.InvalidCredentials;

      const result = authReducer(initialState, AuthActions.loginFailed({ errorCode }));

      expect(result).toEqual({ ...initialState, errorCode, authorizing: false });
    });
  });

  describe(`on AuthActions.loginSuccess`, () => {
    it(`should set the user`, () => {
      const user = { id: '1', email: 'email', email_verified: false, language: 'en' };

      const result = authReducer(initialState, AuthActions.loginSuccess({ user }));

      expect(result).toEqual({ ...initialState, errorCode: undefined, authorizing: false, initialRefreshCompleted: true, user });
    });
  });

  describe(`on AuthActions.verifyEmail`, () => {
    it(`should set the authorizing flag`, () => {
      const result = authReducer(initialState, AuthActions.verifyEmail({ code: 'code' }));

      expect(result).toEqual({ ...initialState, authorizing: true });
    });
  });

  describe(`on AuthActions.verifyEmailSuccess`, () => {
    it(`should set the user`, () => {
      const user = { id: '1', email: 'email', email_verified: false, language: 'en' };

      const result = authReducer(initialState, AuthActions.verifyEmailSuccess({ user }));

      expect(result).toEqual({
        ...initialState,
        errorCode: undefined,
        authorizing: false,
        initialRefreshCompleted: false,
        retryEnables: undefined,
        user,
      });
    });
  });

  describe(`on AuthActions.verifyEmailFailed`, () => {
    it(`should set the errorCode`, () => {
      const errorCode = APIErrorCode.EmailVerificationInvalidOrExpired;

      const result = authReducer(initialState, AuthActions.verifyEmailFailed({ errorCode }));

      expect(result).toEqual({ ...initialState, errorCode, authorizing: false });
    });
  });

  describe(`on AuthAtions.resendVerificationEmailSuccess`, () => {
    it(`should set the retryEnables flag`, () => {
      const retryEnables = new Date();

      const result = authReducer(initialState, AuthActions.resendEmailVerificationSuccess({ retryEnables }));

      expect(result).toEqual({ ...initialState, retryEnables });
    });
  });

  describe(`on AuthActions.resendVerificationEmailFailed`, () => {
    it(`should set the retryEnables flag`, () => {
      const retryEnables = new Date();

      const result = authReducer(initialState, AuthActions.resendEmailVerificationFailed({ retryEnables }));

      expect(result).toEqual({ ...initialState, retryEnables });
    });
  });

  describe(`on AuthActions.resetAuthError`, () => {
    it(`should set the errorCode to undefined`, () => {
      const result = authReducer(initialState, AuthActions.resetAuthError());

      expect(result).toEqual({ ...initialState, errorCode: undefined });
    });
  });

  describe(`on AuthActions.logoutSuccess`, () => {
    it(`should set the user to undefined`, () => {
      const result = authReducer(initialState, AuthActions.logoutSuccess());

      expect(result).toEqual({ ...initialState, user: undefined });
    });
  });

  describe(`on AuthActions.updateProfile`, () => {
    it(`should set the authorizing flag`, () => {
      const result = authReducer(
        initialState,
        AuthActions.updateProfile({ user: { id: '1', email: 'email', language: 'en', email_verified: true } })
      );

      expect(result).toEqual({ ...initialState, authorizing: true });
    });
  });

  describe(`on AuthActions.updateProfileSuccess`, () => {
    it(`should set the user`, () => {
      const user = { id: '1', email: 'email', language: 'en', email_verified: true };

      const result = authReducer(initialState, AuthActions.updateProfileSuccess({ user }));

      expect(result).toEqual({ ...initialState, errorCode: undefined, authorizing: false, user });
    });
  });

  describe(`on AuthActions.updateProfileFailed`, () => {
    it(`should set the errorCode`, () => {
      const errorCode = APIErrorCode.InvalidCredentials;

      const result = authReducer(initialState, AuthActions.updateProfileFailed({ errorCode }));

      expect(result).toEqual({ ...initialState, errorCode, authorizing: false });
    });
  });

  describe(`on AuthActions.requestPasswordResetFailed`, () => {
    it(`should set the errorCode`, () => {
      const result = authReducer(initialState, AuthActions.requestPasswordResetFailed({ errorCode: APIErrorCode.InvalidCredentials }));

      expect(result).toEqual({ ...initialState, errorCode: APIErrorCode.InvalidCredentials });
    });
  });

  describe(`on AuthActions.resetPasswordFailed`, () => {
    it(`should set the errorCode`, () => {
      const result = authReducer(initialState, AuthActions.resetPasswordFailed({ errorCode: APIErrorCode.InvalidCredentials }));

      expect(result).toEqual({ ...initialState, errorCode: APIErrorCode.InvalidCredentials });
    });
  });
});
