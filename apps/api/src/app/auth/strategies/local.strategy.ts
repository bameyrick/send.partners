import { APIErrorCode } from '@common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(email: string, password: string): Promise<string> {
    const id = await this.authService.validateUser(email, password);

    if (!id) {
      throw new UnauthorizedException(APIErrorCode.InvalidCredentials);
    }

    return id;
  }
}
