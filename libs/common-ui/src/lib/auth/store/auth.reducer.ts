import { createReducer, on } from '@ngrx/store';
import { APIErrorCode, User } from '@common';
import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  initialRefreshCompleted: boolean;
  authorizing: boolean;
  errorCode?: APIErrorCode;
  user?: User;
  retryEnables?: Date;
}

export const initialState: AuthState = {
  initialRefreshCompleted: false,
  authorizing: false,
};

export const authReducer = createReducer<AuthState>(
  initialState,

  on(AuthActions.refreshTokenSuccess, (state, { user }) => onAuthSuccess(state, user)),

  on(AuthActions.refreshTokenFailed, state => ({ ...state, tokens: null, initialRefreshCompleted: true })),

  on(AuthActions.signUp, state => onAuth(state)),

  on(AuthActions.signUpFailed, (state, { errorCode }) => onAuthFailed(state, errorCode)),

  on(AuthActions.signUpSuccess, (state, { user }) => onAuthSuccess(state, user)),

  on(AuthActions.login, state => onAuth(state)),

  on(AuthActions.loginFailed, (state, { errorCode }) => onAuthFailed(state, errorCode)),

  on(AuthActions.loginSuccess, (state, { user }) => onAuthSuccess(state, user)),

  on(AuthActions.verifyEmail, state => onAuth(state)),

  on(AuthActions.verifyEmailSuccess, (state, { user }) => ({
    ...state,
    user,
    authorizing: false,
    retryEnables: undefined,
  })),

  on(AuthActions.verifyEmailFailed, (state, { errorCode }) => onAuthFailed(state, errorCode)),

  on(AuthActions.resendEmailVerificationSuccess, AuthActions.resendEmailVerificationFailed, (state, { retryEnables }) => ({
    ...state,
    retryEnables,
  })),

  on(AuthActions.resendEmailVerificationFailed, (state, { retryEnables }) => ({ ...state, retryEnables })),

  on(AuthActions.resetAuthError, state => ({ ...state, errorCode: undefined })),

  on(AuthActions.logoutSuccess, state => ({ ...state, user: undefined })),

  on(AuthActions.updateAuthUser, state => onAuth(state)),

  on(AuthActions.updateAuthUserSuccess, (state, { user }) => ({ ...state, user, authorizing: false })),

  on(AuthActions.updateAuthUserFailed, (state, { errorCode }) => onAuthFailed(state, errorCode)),

  on(AuthActions.requestPasswordResetFailed, (state, { errorCode }) => onAuthFailed(state, errorCode)),

  on(AuthActions.resetPasswordFailed, (state, { errorCode }) => onAuthFailed(state, errorCode))
);

function onAuth(state: AuthState): AuthState {
  return { ...state, authorizing: true };
}

function onAuthFailed(state: AuthState, errorCode: APIErrorCode): AuthState {
  return { ...state, authorizing: false, errorCode };
}

function onAuthSuccess(state: AuthState, user: User): AuthState {
  return { ...state, initialRefreshCompleted: true, authorizing: false, errorCode: undefined, user };
}
