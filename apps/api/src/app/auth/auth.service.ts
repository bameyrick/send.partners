import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APIErrorCode, JwtPayload, JwtTokens } from '@send.partners/common';
import { compare } from 'bcrypt';
import { UsersService } from '../users';
import { JwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  public async signUp(email: string, password: string): Promise<JwtTokens> {
    let user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException(APIErrorCode.UserAlreadyExists);
    }

    user = await this.usersService.createUser(email, password);

    return this.generateTokens({ id: user.id });
  }

  public async validateUser(email: string, password: string): Promise<string | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await compare(password, user.password))) {
      return user.id;
    }

    return null;
  }

  public async login(id: string): Promise<JwtTokens> {
    return this.generateTokens({ id });
  }

  public async logout(id: string): Promise<void> {
    return this.usersService.removeRefreshHash(id);
  }

  public async refresh(id: string, refreshToken: string): Promise<JwtTokens> {
    const user = await this.usersService.findById(id);

    if (!user || !user.refresh_hash || !(await compare(refreshToken, user.refresh_hash))) {
      throw new ForbiddenException();
    }

    return this.generateTokens({ id: user.id });
  }

  /**
   * Generates access and refresh tokens for a given user and updates the user's refresh_hash in the database
   */
  private async generateTokens(payload: JwtPayload): Promise<JwtTokens> {
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: JwtConstants.refresh_token_secret,
    });

    await this.usersService.updateRefreshHash(payload.id, refresh_token);

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: JwtConstants.access_token_secret,
      }),
      refresh_token,
    };
  }
}
