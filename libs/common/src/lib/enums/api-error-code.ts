export enum APIErrorCode {
  EmailVerificationInvalidOrExpired = 'email-verification-code-invalid-or-expired',
  InvalidCredentials = 'invalid-credentials',
  InvalidCSRFToken = 'invalid-csrf-token',
  PasswordDoesNotMeetRequirements = 'password-does-not-meet-requirements',
  UserAlreadyExists = 'user-already-exists',
  WaitToResendVerificationEmail = 'wait-to-resend-verification-email',
  PasswordResetInvalidOrExpired = 'password-reset-invalid-or-expired',
}

export const APIErrorCodeTranslation: Record<APIErrorCode, string> = {
  [APIErrorCode.EmailVerificationInvalidOrExpired]: `common.api_error_code.${APIErrorCode.EmailVerificationInvalidOrExpired}`,
  [APIErrorCode.InvalidCredentials]: `common.api_error_code.${APIErrorCode.InvalidCredentials}`,
  [APIErrorCode.InvalidCSRFToken]: `common.api_error_code.${APIErrorCode.InvalidCSRFToken}`,
  [APIErrorCode.PasswordDoesNotMeetRequirements]: `common.api_error_code.${APIErrorCode.PasswordDoesNotMeetRequirements}`,
  [APIErrorCode.UserAlreadyExists]: `common.api_error_code.${APIErrorCode.UserAlreadyExists}`,
  [APIErrorCode.WaitToResendVerificationEmail]: `common.api_error_code.${APIErrorCode.WaitToResendVerificationEmail}`,
  [APIErrorCode.PasswordResetInvalidOrExpired]: `common.api_error_code.${APIErrorCode.PasswordResetInvalidOrExpired}`,
};
