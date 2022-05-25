import { createReducer, on } from '@ngrx/store';
import { APIErrorCode, FullUser, JwtTokens } from '@send.partners/common';
import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export const AUTH_TOKEN_STORAGE_KEY = 'auth-token';

export interface AuthState {
  authorizing: boolean;
  tokens: JwtTokens | null;
  errorCode?: APIErrorCode;
  profile?: FullUser;
}

const storedTokens = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const authReducer = createReducer<AuthState>(
  {
    authorizing: false,
    tokens: storedTokens ? JSON.parse(storedTokens) : null,
  },

  on(AuthActions.storeTokens, (state, { tokens }) => ({ ...state, tokens })),

  on(AuthActions.refreshTokenFailed, state => ({ ...state, tokens: null })),

  on(AuthActions.signUp, state => ({ ...state, authorizing: true })),

  on(AuthActions.signUpFailed, (state, { errorCode }) => ({ ...state, authorizing: false, errorCode })),

  on(AuthActions.signUpSuccess, (state, { tokens }) => ({ ...state, tokens, authorizing: false, errorCode: undefined })),

  on(AuthActions.getProfileSuccess, (state, { profile }) => ({ ...state, profile }))
);
