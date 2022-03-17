import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@send.partners/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from '../constants';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.access_token_secret,
    });
  }

  public async validate({ id }: JwtPayload): Promise<JwtPayload> {
    return { id };
  }
}
