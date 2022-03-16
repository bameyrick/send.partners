import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@send.partners/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
  }

  public async validate({ id, email, name }: User): Promise<User> {
    return { id, email, name };
  }
}
