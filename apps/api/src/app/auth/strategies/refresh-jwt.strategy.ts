import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload, JwtPayloadWithRefreshToken } from '@send.partners/common';
import { JwtConstants, REFRESH_STRATEGY_KEY } from '../constants';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, REFRESH_STRATEGY_KEY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtConstants.refresh_token_secret,
      passReqToCallback: true,
    });
  }

  public async validate(request: Request, { id }: JwtPayload): Promise<JwtPayloadWithRefreshToken> {
    return {
      refresh_token: request.get('Authorization').replace('Bearer', '').replace('bearer', '').trim(),
      id,
    };
  }
}
