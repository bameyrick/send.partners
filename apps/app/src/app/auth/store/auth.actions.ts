import { createAction, props } from '@ngrx/store';
import { APIErrorCode, JwtTokens, LoginCredentials, SignUpCredentials, User } from '@app/common';

const signUp = createAction('[AUTH] Sign up', props<{ credentials: SignUpCredentials }>());

const signUpSuccess = createAction('[AUTH] Sign up success', props<{ user: User }>());

const signUpFailed = createAction('[AUTH] Sign up failed', props<{ errorCode: APIErrorCode }>());

const login = createAction('[AUTH] Login', props<{ credentials: LoginCredentials }>());

const loginSuccess = createAction('[AUTH] Login success', props<{ user: User }>());

const loginFailed = createAction('[AUTH] Login failed', props<{ errorCode: APIErrorCode }>());

const logout = createAction('[AUTH] Logout');

const logoutSuccess = createAction('[AUTH] Logout success');

const logoutFailed = createAction('[AUTH] Logout failed');

const refreshToken = createAction('[AUTH] Refresh Token');

const refreshTokenSuccess = createAction('[AUTH] Refresh Token success', props<{ user: User }>());

const refreshTokenFailed = createAction('[AUTH] Refresh Token failed');

const verifyEmail = createAction('[AUTH] Verify email', props<{ code: string }>());

const verifyEmailSuccess = createAction('[AUTH] Verify email success', props<{ user: User }>());

const verifyEmailFailed = createAction('[AUTH] Verify email failed', props<{ errorCode: APIErrorCode }>());

const resendEmailVerification = createAction('[AUTH] Resend verification email');

const resendEmailVerificationSuccess = createAction('[AUTH] Resend verification success', props<{ retryEnables: Date }>());

const resendEmailVerificationFailed = createAction('[AUTH] Resend verification failed', props<{ retryEnables: Date }>());

const resetAuthError = createAction('[AUTH] Reset auth error');

const updateProfile = createAction('[AUTH] Update profile', props<{ user: User }>());

const updateProfileSuccess = createAction('[AUTH] Update profile success', props<{ user: User }>());

const updateProfileFailed = createAction('[AUTH] Update profile failed', props<{ errorCode: APIErrorCode }>());

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
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailed,
  resendEmailVerification,
  resendEmailVerificationSuccess,
  resendEmailVerificationFailed,
  resetAuthError,
  updateProfile,
  updateProfileSuccess,
  updateProfileFailed,
};
