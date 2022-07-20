import { JwtTokens, User } from '@common';

export interface AuthResult {
  user: User;
  tokens: JwtTokens;
}
