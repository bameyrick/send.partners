import { APIErrorCode, APIErrorCodeTranslation, User } from '@common';
import { AuthState } from './auth.reducer';
import {
  selectInitialRefreshCompleted,
  selectAuthorizing,
  selectAuthErrorCode,
  selectAuthUser,
  selectAuthenticated,
  selectResendEmailTime,
} from './auth.selectors';

describe(`AuthSelectors`, () => {
  let state: AuthState | undefined;

  beforeEach(() => {
    state = undefined;
  });

  describe(`selectInitialRefreshCompleted`, () => {
    it(`should return the initialRefreshCompleted`, () => {
      state = {
        initialRefreshCompleted: false,
        authorizing: false,
      };

      const result = selectInitialRefreshCompleted.projector(state);

      expect(result).toBe(false);

      state = {
        initialRefreshCompleted: true,
        authorizing: false,
      };

      const result2 = selectInitialRefreshCompleted.projector(state);

      expect(result2).toBe(true);
    });
  });

  describe(`selectAuthorizing`, () => {
    it(`should return the authorizing`, () => {
      state = {
        initialRefreshCompleted: false,
        authorizing: false,
      };

      const result = selectAuthorizing.projector(state);

      expect(result).toBe(false);

      state = {
        initialRefreshCompleted: false,
        authorizing: true,
      };

      const result2 = selectAuthorizing.projector(state);

      expect(result2).toBe(true);
    });
  });

  describe(`selectAuthErrorCode`, () => {
    it(`should return the authErrorCode`, () => {
      state = {
        initialRefreshCompleted: false,
        authorizing: false,
      };

      const result = selectAuthErrorCode.projector(state);

      expect(result).toBeUndefined();

      const errorCode = APIErrorCode.EmailVerificationInvalidOrExpired;

      state = {
        initialRefreshCompleted: false,
        authorizing: false,
        errorCode,
      };

      const result2 = selectAuthErrorCode.projector(state);

      expect(result2).toBe(APIErrorCodeTranslation[errorCode]);
    });
  });

  describe(`selectAuthUser`, () => {
    it(`should return the authUser`, () => {
      state = {
        initialRefreshCompleted: false,
        authorizing: false,
      };

      const result = selectAuthUser.projector(state);

      expect(result).toBeUndefined();

      const user: User = {
        id: '1',
        email: '',
        email_verified: false,
        language: 'en',
        role: 'user',
      };

      state = {
        initialRefreshCompleted: false,
        authorizing: false,
        user,
      };

      const result2 = selectAuthUser.projector(state);

      expect(result2).toBe(user);
    });
  });

  describe(`selectAuthenticated`, () => {
    it(`should return the authenticated`, () => {
      const result = selectAuthenticated.projector(undefined);

      expect(result).toBe(false);

      const user: User = {
        id: '1',
        email: '',
        email_verified: false,
        language: 'en',
        role: 'user',
      };

      const result2 = selectAuthenticated.projector(user);

      expect(result2).toBe(true);
    });
  });

  describe(`selectResendEmailTime`, () => {
    it(`should return the resendEmailTime`, () => {
      state = {
        initialRefreshCompleted: false,
        authorizing: false,
      };

      const result = selectResendEmailTime.projector(state);

      expect(result).toBeUndefined();

      const retryEnables = new Date();

      state = {
        initialRefreshCompleted: false,
        authorizing: false,
        retryEnables,
      };

      const result2 = selectResendEmailTime.projector(state);

      expect(result2).toBe(retryEnables);
    });
  });
});
