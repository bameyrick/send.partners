import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload, JwtPayloadWithRefreshToken } from '@common';
import { JwtConstants, JWT_COOKIE_KEY, REFRESH_STRATEGY_KEY } from '../constants';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, REFRESH_STRATEGY_KEY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([request => request.cookies[JWT_COOKIE_KEY]?.refresh_token]),
      secretOrKey: JwtConstants.refresh_token_secret,
      passReqToCallback: true,
    });
  }

  public async validate(request: Request, payload?: JwtPayload): Promise<JwtPayloadWithRefreshToken> {
    if (!payload) {
      throw new BadRequestException('Invalid JWT token');
    }

    const refresh_token = request.cookies[JWT_COOKIE_KEY]?.refresh_token;

    if (!refresh_token) {
      throw new BadRequestException('Invalid refresh token');
    }

    return {
      refresh_token,
      id: payload.id,
    };
  }
}
