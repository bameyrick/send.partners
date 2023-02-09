import { APIErrorCode, JwtPayload, JwtTokens, ResetPasswordCredentials, User } from '@common';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TimeUnit, unitToMS } from '@qntm-code/utils';
import { compare } from 'bcrypt';
import * as crypto from 'crypto';
import { DatabaseService } from '../db';
import { MailService } from '../mail';
import { UsersService } from '../users';
import { JwtConstants } from './constants';
import { AuthResult } from './interfaces';

@Injectable()
export class AuthService {
  private readonly verificationCodeRetryMs = unitToMS(parseInt(process.env.MAIL_VERIFICATION_RETRY_MINUTES), TimeUnit.Minutes);

  private readonly verificationCodeExpiryMs = unitToMS(parseInt(process.env.MAIL_VERIFICATION_EXPIRY_HOURS), TimeUnit.Hours);

  private readonly passwordResetExpiryMs = unitToMS(parseInt(process.env.PASSWORD_RESET_EXPIRY_HOURS), TimeUnit.Hours);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly databaseService: DatabaseService
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

  public async sendEmailVerification(user_id: string): Promise<number> {
    const verificationCode = await this.databaseService.email_verification_codes().findOne({ user_id });

    if (verificationCode && this.generatedToRetryMs(verificationCode.generated) > new Date().getTime()) {
      throw new ForbiddenException(
        APIErrorCode.WaitToResendVerificationEmail,
        this.generatedToRetryMs(verificationCode.generated).toString()
      );
    }

    const user = await this.usersService.findById(user_id);

    if (!user) {
      throw new ForbiddenException();
    }

    const code = this.generateCode();
    const generated = new Date();

    this.databaseService.email_verification_codes().insertOrUpdate(['user_id'], { user_id, code, generated });

    this.mailService.sendEmailVerification(user.email, code, user.language);

    return this.generatedToRetryMs(generated);
  }

  public async validateEmail(user_id: string, code: string): Promise<User> {
    const activeCode = await this.databaseService.email_verification_codes().findOne({ user_id });

    if (
      !activeCode ||
      !(activeCode.code === code && activeCode.generated.getTime() + this.verificationCodeExpiryMs >= new Date().getTime())
    ) {
      throw new ForbiddenException(APIErrorCode.EmailVerificationInvalidOrExpired);
    }

    const user = await this.usersService.markUserEmailAsValidated(user_id);

    await this.databaseService.email_verification_codes().delete({ user_id });

    return user;
  }

  public async requestPasswordReset(email: string, requested_by_user_id?: string): Promise<void> {
    await this.usersService.requestPasswordReset(email, requested_by_user_id);
  }

  public async resetPassword(credentials: ResetPasswordCredentials): Promise<void> {
    const hash = await this.databaseService.reset_password_codes().findOne({ code: credentials.code });

    if (!hash || hash.generated.getTime() + this.passwordResetExpiryMs <= new Date().getTime()) {
      throw new ForbiddenException(APIErrorCode.PasswordResetInvalidOrExpired);
    }

    await this.databaseService.reset_password_codes().delete({ code: credentials.code });

    await this.usersService.updatePassword(hash.user_id, credentials.password);
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

  private generatedToRetryMs(generated: Date): number {
    return generated.getTime() + this.verificationCodeRetryMs;
  }
}
