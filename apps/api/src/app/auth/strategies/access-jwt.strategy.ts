import { JwtPayload } from '@common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants, JWT_COOKIE_KEY, JWT_STRATEGY_KEY } from '../constants';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([request => request.cookies[JWT_COOKIE_KEY]?.access_token]),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.access_token_secret,
    });
  }

  public validate(payload?: JwtPayload): JwtPayload {
    if (!payload) {
      throw new UnauthorizedException();
    }

    return { id: payload.id };
  }
}
