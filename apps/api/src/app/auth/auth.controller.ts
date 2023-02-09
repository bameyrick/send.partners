import {
  APIEndpoint,
  JwtPayload,
  JwtPayloadWithRefreshToken,
  JwtTokens,
  removeParentUrlParts,
  ResetPasswordCredentials,
  SignUpCredentials,
  User,
} from '@common';
import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { isNullOrUndefined } from '@qntm-code/utils';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JWT_COOKIE_KEY } from './constants';
import { Public } from './decorators';
import { JwtRefreshAuthGuard, LocalAuthGuard } from './guards';

@Controller(APIEndpoint.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.SignUp))
  public async signUp(
    @Body() { email, password, language }: SignUpCredentials,
    @Res({ passthrough: true }) response: Response
  ): Promise<User> {
    const { user, tokens } = await this.authService.signUp(email, password, language);

    this.setAuthCookie(response, tokens);

    return user;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.Login))
  public async login(@Request() { user }: { user: string }, @Res({ passthrough: true }) response: Response): Promise<User> {
    const result = await this.authService.login(user);

    this.setAuthCookie(response, result.tokens);

    return result.user;
  }

  @Get(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.Logout))
  public logout(@Request() { user }: { user: JwtPayload }): Promise<void> {
    if (isNullOrUndefined(user)) {
      return Promise.resolve();
    }

    return this.authService.logout(user.id);
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Get(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.RefreshTokens))
  public async refresh(
    @Request() { user }: { user: JwtPayloadWithRefreshToken },
    @Res({ passthrough: true }) response: Response
  ): Promise<User> {
    const result = await this.authService.refresh(user.id, user.refresh_token);

    this.setAuthCookie(response, result.tokens);

    return result.user;
  }

  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.VerifyEmail))
  public verifyEmail(@Request() { user }: { user: JwtPayloadWithRefreshToken }, @Body() { code }: { code: string }): Promise<User> {
    return this.authService.validateEmail(user.id, code);
  }

  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.ResendEmailVerification))
  public resendEmailVerification(@Request() { user }: { user: JwtPayloadWithRefreshToken }): Promise<number> {
    return this.authService.sendEmailVerification(user.id);
  }

  @Public()
  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.RequestPasswordReset))
  public async requestPasswordReset(@Body() { email }: { email: string }): Promise<void> {
    await this.authService.requestPasswordReset(email);
  }

  @Public()
  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.ResetPassword))
  public async resetPassword(@Body() credentials: ResetPasswordCredentials): Promise<void> {
    await this.authService.resetPassword(credentials);
  }

  private setAuthCookie(response: Response, tokens: JwtTokens): void {
    response.cookie(JWT_COOKIE_KEY, tokens, {
      sameSite: 'strict',
      httpOnly: true,
    });
  }
}
