import { createAction, props } from '@ngrx/store';
import { APIErrorCode, JwtTokens, LoginCredentials, SignUpCredentials, User } from '@send.partners/common';

const signUp = createAction('[AUTH] Sign up', props<{ credentials: SignUpCredentials }>());

const signUpSuccess = createAction('[AUTH] Sign up success', props<{ tokens: JwtTokens }>());

const signUpFailed = createAction('[AUTH] Sign up failed', props<{ errorCode: APIErrorCode }>());

const login = createAction('[AUTH] Login', props<{ credentials: LoginCredentials }>());

const loginSuccess = createAction('[AUTH] Login success', props<{ tokens: JwtTokens }>());

const loginFailed = createAction('[AUTH] Login failed', props<{ errorCode: APIErrorCode }>());

const logout = createAction('[AUTH] Logout');

const logoutSuccess = createAction('[AUTH] Logout success');

const logoutFailed = createAction('[AUTH] Logout failed');

const refreshToken = createAction('[AUTH] Refresh Token');

const refreshTokenSuccess = createAction('[AUTH] Refresh Token success', props<{ tokens: JwtTokens }>());

const refreshTokenFailed = createAction('[AUTH] Refresh Token failed');

const storeTokens = createAction('[AUTH] Store tokens', props<{ tokens: JwtTokens }>());

const getProfile = createAction('[AUTH] Get profile');

const getProfileSuccess = createAction('[AUTH] Get profile success', props<{ profile: User }>());

const getProfileFailed = createAction('[AUTH] Get profile failed');

const verifyEmail = createAction('[AUTH] Verify email', props<{ code: string }>());

const verifyEmailSuccess = createAction('[AUTH] Verify email success', props<{ profile: User }>());

const verifyEmailFailed = createAction('[AUTH] Verify email failed', props<{ errorCode: APIErrorCode }>());

const resendEmailVerification = createAction('[AUTH] Resend verification email');

const resendEmailVerificationSuccess = createAction('[AUTH] Resend verification success', props<{ retryEnables: Date }>());

const resendEmailVerificationFailed = createAction('[AUTH] Resend verification failed', props<{ retryEnables: Date }>());

export const AuthActions = {
  signUp,
  signUpSuccess,
  signUpFailed,
  login,
  loginSuccess,
  loginFailed,
  logout,
  logoutSuccess,
  logoutFailed,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailed,
  storeTokens,
  getProfile,
  getProfileSuccess,
  getProfileFailed,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailed,
  resendEmailVerification,
  resendEmailVerificationSuccess,
  resendEmailVerificationFailed,
};
