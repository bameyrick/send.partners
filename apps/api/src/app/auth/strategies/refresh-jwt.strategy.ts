import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { JwtPayload, JwtPayloadWithRefreshToken } from '@send.partners/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from '../constants';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.refresh_token_secret,
      passReqToCallback: true,
    });
  }

  public async validate(request: Request, { id }: JwtPayload): Promise<JwtPayloadWithRefreshToken> {
    return {
      refresh_token: request.get('authorization').replace('Bearer', '').trim(),
      id,
    };
  }
}
