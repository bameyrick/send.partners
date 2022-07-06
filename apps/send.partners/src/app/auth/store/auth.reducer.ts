import { createReducer, on } from '@ngrx/store';
import { APIErrorCode, JwtTokens, User } from '@send.partners/common';
import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export const AUTH_TOKEN_STORAGE_KEY = 'auth-token';

export interface AuthState {
  initialRefreshCompleted: boolean;
  authorizing: boolean;
  tokens: JwtTokens | null;
  errorCode?: APIErrorCode;
  profile?: User;
  retryEnables?: Date;
}

const storedTokens = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const authReducer = createReducer<AuthState>(
  {
    initialRefreshCompleted: false,
    authorizing: false,
    tokens: storedTokens ? JSON.parse(storedTokens) : null,
  },

  on(AuthActions.storeTokens, (state, { tokens }) => ({ ...state, tokens })),

  on(AuthActions.refreshTokenFailed, state => ({ ...state, tokens: null, initialRefreshCompleted: true })),

  on(AuthActions.signUp, state => onAuth(state)),

  on(AuthActions.signUpFailed, (state, { errorCode }) => onAuthFailed(state, errorCode)),

  on(AuthActions.signUpSuccess, (state, { tokens }) => onAuthSuccess(state, tokens)),

  on(AuthActions.login, state => onAuth(state)),

  on(AuthActions.loginFailed, (state, { errorCode }) => onAuthFailed(state, errorCode)),

  on(AuthActions.loginSuccess, (state, { tokens }) => onAuthSuccess(state, tokens)),

  on(AuthActions.getProfileSuccess, (state, { profile }) => ({ ...state, profile, initialRefreshCompleted: true })),

  on(AuthActions.verifyEmail, state => onAuth(state)),

  on(AuthActions.verifyEmailSuccess, (state, { profile }) => ({ ...state, profile, authorizing: false, retryEnables: undefined })),

  on(AuthActions.verifyEmailFailed, (state, { errorCode }) => onAuthFailed(state, errorCode)),

  on(AuthActions.resendEmailVerificationSuccess, AuthActions.resendEmailVerificationFailed, (state, { retryEnables }) => ({
    ...state,
    retryEnables,
  })),

  on(AuthActions.resendEmailVerificationFailed, (state, { retryEnables }) => ({ ...state, retryEnables })),

  on(AuthActions.resetAuthError, state => ({ ...state, errorCode: undefined })),

  on(AuthActions.updateProfile, state => onAuth(state)),

  on(AuthActions.updateProfileSuccess, (state, { profile }) => ({ ...state, profile, authorizing: false })),

  on(AuthActions.updateProfileFailed, (state, { errorCode }) => onAuthFailed(state, errorCode))
);

function onAuth(state: AuthState): AuthState {
  return { ...state, authorizing: true };
}

function onAuthFailed(state: AuthState, errorCode: APIErrorCode): AuthState {
  return { ...state, authorizing: false, errorCode };
}

function onAuthSuccess(state: AuthState, tokens: JwtTokens): AuthState {
  return { ...state, tokens, authorizing: false, errorCode: undefined };
}
