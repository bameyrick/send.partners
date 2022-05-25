export enum APIErrorCode {
  InvalidCSRFToken = 'invalid csrf token',
  UserAlreadyExists = 'user already exists',
  PasswordDoesNotMeetRequirements = 'password does not meet requirements',
}

export const APIErrorCodeTranslation: Record<APIErrorCode, string> = {
  [APIErrorCode.InvalidCSRFToken]: 'Forbidden',
  [APIErrorCode.UserAlreadyExists]: 'An account with the provided email already exists',
  [APIErrorCode.PasswordDoesNotMeetRequirements]: 'Password does not meet requirements',
};
