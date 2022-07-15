import { JwtTokens, User } from '@app/common';

export interface AuthResult {
  user: User;
  tokens: JwtTokens;
}
