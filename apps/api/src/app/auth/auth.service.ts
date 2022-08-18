import { APIErrorCode, JwtPayload, JwtTokens, ResetPasswordCredentials, User } from '@common';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TimeUnit, unitToMS } from '@qntm-code/utils';
import * as crypto from 'crypto';
import { compare } from 'bcrypt';
import { MailService } from '../mail';
import { UsersService } from '../users';
import { JwtConstants } from './constants';
import { AuthResult } from './interfaces';

interface VerificationCode {
  generated: Date;
  code: string;
}

interface ResetPasswordCode {
  generated: Date;
  userId: string;
}

@Injectable()
export class AuthService {
  private readonly verificationCodes: Record<string, VerificationCode> = {};

  private readonly resetEmailHash: Record<string, ResetPasswordCode> = {};

  private readonly verificationCodeRetryMs = unitToMS(parseInt(process.env.MAIL_VERIFICATION_RETRY_MINUTES), TimeUnit.Minutes);

  private readonly verificationCodeExpiryMs = unitToMS(parseInt(process.env.MAIL_VERIFICATION_EXPIRY_HOURS), TimeUnit.Hours);

  private readonly passwordResetExpiryMs = unitToMS(parseInt(process.env.PASSWORD_RESET_EXPIRY_HOURS), TimeUnit.Hours);

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
    const verificationCode = this.verificationCodes[userId];

    if (verificationCode && this.generatedToRetryMs(verificationCode.generated) > new Date().getTime()) {
      throw new ForbiddenException(
        APIErrorCode.WaitToResendVerificationEmail,
        this.generatedToRetryMs(verificationCode.generated).toString()
      );
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new ForbiddenException();
    }

    const code = this.generateCode();

    const generated = new Date();

    this.verificationCodes[userId] = {
      code,
      generated,
    };

    this.mailService.sendEmailVerification(user.email, code, user.language);

    return this.generatedToRetryMs(generated);
  }

  public async validateEmail(userId: string, code: string): Promise<User> {
    const activeCode = this.verificationCodes[userId];

    if (
      !activeCode ||
      !(activeCode.code === code && activeCode.generated.getTime() + this.verificationCodeExpiryMs >= new Date().getTime())
    ) {
      throw new ForbiddenException(APIErrorCode.EmailVerificationInvalidOrExpired);
    }

    const user = await this.usersService.markUserEmailAsValidated(userId);

    delete this.verificationCodes[userId];

    return user;
  }

  public async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const code = this.genererateResetCode();
      const generated = new Date();

      this.resetEmailHash[code] = {
        userId: user.id,
        generated,
      };

      this.mailService.sendPasswordReset(user.email, code, user.language);
    }
  }

  public async resetPassword(credentials: ResetPasswordCredentials): Promise<void> {
    const hash = this.resetEmailHash[credentials.code];

    console.log(
      hash.generated.getTime() + this.passwordResetExpiryMs,
      new Date().getTime(),
      hash.generated.getTime() + this.passwordResetExpiryMs <= new Date().getTime()
    );

    if (!hash || hash.generated.getTime() + this.passwordResetExpiryMs <= new Date().getTime()) {
      throw new ForbiddenException(APIErrorCode.PasswordResetInvalidOrExpired);
    }

    delete this.resetEmailHash[credentials.code];

    await this.usersService.updatePassword(hash.userId, credentials.password);
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

  private genererateResetCode(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private generatedToRetryMs(generated: Date): number {
    return generated.getTime() + this.verificationCodeRetryMs;
  }
}
