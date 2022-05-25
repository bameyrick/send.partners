import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectAuthTokens = createSelector(selectAuthState, state => state.tokens);

export const selectAuthorizing = createSelector(selectAuthState, state => state.authorizing);

export const selectAuthErrorCode = createSelector(selectAuthState, state => state.errorCode);
