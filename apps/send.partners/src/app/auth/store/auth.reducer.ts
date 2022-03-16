import { createReducer } from '@ngrx/store';
import { JwtTokens } from '@send.partners/common';

export const AUTH_FEATURE_KEY = 'auth';

export const AUTH_TOKEN_STORAGE_KEY = 'auth-token';

export interface AuthState {
  tokens: JwtTokens | null;
}

const storedTokens = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const authReducer = createReducer<AuthState>({
  tokens: storedTokens ? JSON.parse(storedTokens) : null,
});
