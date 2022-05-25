export enum APIErrorCode {
  InvalidCredentials = 'invalid credentials',
  InvalidCSRFToken = 'invalid csrf token',
  PasswordDoesNotMeetRequirements = 'password does not meet requirements',
  UserAlreadyExists = 'user already exists',
}

export const APIErrorCodeTranslation: Record<APIErrorCode, string> = {
  [APIErrorCode.InvalidCredentials]: 'Email or password incorrect',
  [APIErrorCode.InvalidCSRFToken]: 'Forbidden',
  [APIErrorCode.PasswordDoesNotMeetRequirements]: 'Password does not meet requirements',
  [APIErrorCode.UserAlreadyExists]: 'An account with the provided email already exists',
};
