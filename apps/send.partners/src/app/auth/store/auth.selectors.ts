import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APIErrorCodeTranslation } from '@send.partners/common';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectInitialRefreshCompleted = createSelector(selectAuthState, state => state.initialRefreshCompleted);

export const selectAuthorizing = createSelector(selectAuthState, state => state.authorizing);

export const selectAuthErrorCode = createSelector(selectAuthState, state =>
  state.errorCode ? APIErrorCodeTranslation[state.errorCode] : undefined
);

export const selectProfile = createSelector(selectAuthState, state => state.user);

export const selectAuthenticated = createSelector(selectProfile, profile => !!profile);

export const selectResendEmailTime = createSelector(selectAuthState, state => state.retryEnables);
