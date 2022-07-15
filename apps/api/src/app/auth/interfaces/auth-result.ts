import { JwtTokens, User } from '@send.partners/common';

export interface AuthResult {
  user: User;
  tokens: JwtTokens;
}
