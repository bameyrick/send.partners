import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@send.partners/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants, JWT_STRATEGY_KEY } from '../constants';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.access_token_secret,
    });
  }

  public validate({ id }: JwtPayload): JwtPayload {
    return { id };
  }
}
