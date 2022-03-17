import { createAction, props } from '@ngrx/store';
import { JwtTokens, LoginCredentials } from '@send.partners/common';

const login = createAction('[AUTH] Login', props<{ credentials: LoginCredentials }>());

const loginSuccess = createAction('[AUTH] Login success', props<{ tokens: JwtTokens }>());

const loginFailed = createAction('[AUTH] Login failed');

const logout = createAction('[AUTH] Logout');

const logoutSuccess = createAction('[AUTH] Logout success');

const logoutFailed = createAction('[AUTH] Logout failed');

const refreshToken = createAction('[AUTH] Refresh Token');

const refreshTokenSuccess = createAction('[AUTH] Refresh Token success', props<{ tokens: JwtTokens }>());

const refreshTokenFailed = createAction('[AUTH] Refresh Token failed');

export const AuthActions = {
  login,
  loginSuccess,
  loginFailed,
  logout,
  logoutSuccess,
  logoutFailed,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailed,
};
