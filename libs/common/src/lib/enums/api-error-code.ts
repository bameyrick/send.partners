export enum APIErrorCode {
  EmailVerificationInvalidOrExpired = 'email-verification-code-invalid-or-expired',
  InvalidCredentials = 'invalid-credentials',
  InvalidCSRFToken = 'invalid-csrf-token',
  PasswordDoesNotMeetRequirements = 'password-does-not-meet-requirements',
  UserAlreadyExists = 'user-already-exists',
  WaitToResendVerificationEmail = 'wait-to-resend-verification-email',
}

export const APIErrorCodeTranslation: Record<APIErrorCode, string> = {
  [APIErrorCode.EmailVerificationInvalidOrExpired]: 'Email verification code invalid or expired',
  [APIErrorCode.InvalidCredentials]: 'Email or password incorrect',
  [APIErrorCode.InvalidCSRFToken]: 'Forbidden',
  [APIErrorCode.PasswordDoesNotMeetRequirements]: 'Password does not meet requirements',
  [APIErrorCode.UserAlreadyExists]: 'An account with the provided email already exists',
  [APIErrorCode.WaitToResendVerificationEmail]: 'Wait to resend verification email',
};
