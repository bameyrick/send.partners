import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TimeUnit, unitToMS } from '@qntm-code/utils';
import * as crypto from 'crypto';
import { compare } from 'bcrypt';
import { APIErrorCode, JwtPayload, JwtTokens, User } from '@app/common';
import { MailService } from '../mail';
import { UsersService } from '../users';
import { JwtConstants } from './constants';
import { AuthResult } from './interfaces';

interface VerificationCode {
  userId: string;
  generated: Date;
  code: string;
}

@Injectable()
export class AuthService {
  private verificationCodes: VerificationCode[] = [];

  private readonly verificationCodeRetryMs = unitToMS(parseInt(process.env.MAIL_VERIFICATION_RETRY_MINUTES), TimeUnit.Minutes);

  private readonly verificationCodeExpiryMs = unitToMS(parseInt(process.env.MAIL_VERIFICATION_EXPIRY_HOURS), TimeUnit.Hours);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  public async signUp(email: string, password: string, language: string): Promise<AuthResult> {
    const user = this.usersService.sanitizeUser(await this.usersService.createUser(email, password, language));

    this.sendEmailVerification(user.id);

    return { user, tokens: await this.generateTokens({ id: user.id }) };
  }

  public async validateUser(email: string, password: string): Promise<string | null> {
    const user = await this.usersService.findFullByEmail(email);

    if (user && (await compare(password, user.password))) {
      return user.id;
    }

    return null;
  }

  public async login(id: string): Promise<AuthResult> {
    const user = await this.usersService.findById(id);

    return { user, tokens: await this.generateTokens({ id }) };
  }

  public async logout(id: string): Promise<void> {
    return this.usersService.removeRefreshHash(id);
  }

  public async refresh(id: string, refreshToken: string): Promise<AuthResult> {
    const user = await this.usersService.findFullById(id);

    if (!user || !user.refresh_hash || !(await compare(refreshToken, user.refresh_hash))) {
      throw new ForbiddenException();
    }

    return { user: this.usersService.sanitizeUser(user), tokens: await this.generateTokens({ id }) };
  }

  public async sendEmailVerification(userId: string): Promise<number> {
    const activeCode = this.verificationCodes.find(
      verificationCode => verificationCode.userId === userId && this.generatedToRetryMs(verificationCode.generated) > new Date().getTime()
    );

    if (activeCode) {
      throw new ForbiddenException(APIErrorCode.WaitToResendVerificationEmail, this.generatedToRetryMs(activeCode.generated).toString());
    }

    this.resetVerificationCodesForUser(userId);

    const user = await this.usersService.findById(userId);

    const code = this.generateCode();

    const generated = new Date();

    this.verificationCodes.push({
      userId,
      code,
      generated,
    });

    this.mailService.sendEmailVerification(user.email, code, user.language);

    return this.generatedToRetryMs(generated);
  }

  public async validateEmail(userId: string, code: string): Promise<User> {
    const activeCode = this.verificationCodes.find(
      item =>
        item.userId === userId && item.code === code && item.generated.getTime() + this.verificationCodeExpiryMs > new Date().getTime()
    );

    if (!activeCode) {
      throw new ForbiddenException(APIErrorCode.EmailVerificationInvalidOrExpired);
    }

    const user = await this.usersService.markUserEmailAsValidated(userId);

    this.resetVerificationCodesForUser(userId);

    return user;
  }

  /**
   * Generates access and refresh tokens for a given user and updates the user's refresh_hash in the database
   */
  private async generateTokens(payload: JwtPayload): Promise<JwtTokens> {
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: JwtConstants.refresh_token_secret,
    });

    await this.usersService.updateRefreshHash(payload.id, refresh_token);

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: JwtConstants.access_token_secret,
      }),
      refresh_token,
    };
  }

  private generateCode(): string {
    return new Array(6)
      .fill(null)
      .map(() => crypto.randomInt(0, 9))
      .join('');
  }

  private resetVerificationCodesForUser(userId: string): void {
    this.verificationCodes = this.verificationCodes.filter(item => item.userId !== userId);
  }

  private generatedToRetryMs(generated: Date): number {
    return generated.getTime() + this.verificationCodeRetryMs;
  }
}
