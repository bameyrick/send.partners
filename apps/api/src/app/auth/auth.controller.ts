import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  APIEndpoint,
  JwtPayload,
  JwtPayloadWithRefreshToken,
  JwtTokens,
  removeParentUrlParts,
  SignUpCredentials,
  User,
} from '@send.partners/common';
import { Public } from './decorators';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard, LocalAuthGuard } from './guards';

@Controller(APIEndpoint.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.SignUp))
  public signUp(@Body() { email, password, language }: SignUpCredentials): Promise<JwtTokens> {
    return this.authService.signUp(email, password, language);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.Login))
  public login(@Request() { user }: { user: string }): Promise<JwtTokens> {
    return this.authService.login(user);
  }

  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.Logout))
  public logout(@Request() { id }: JwtPayload): Promise<void> {
    return this.authService.logout(id);
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Get(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.RefreshTokens))
  public refresh(@Request() { user }: { user: JwtPayloadWithRefreshToken }): Promise<JwtTokens> {
    return this.authService.refresh(user.id, user.refresh_token);
  }

  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.VerifyEmail))
  public verifyEmail(@Request() { user }: { user: JwtPayloadWithRefreshToken }, @Body() { code }: { code: string }): Promise<User> {
    return this.authService.validateEmail(user.id, code);
  }

  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.ResendEmailVerification))
  public resendEmailVerification(@Request() { user }: { user: JwtPayloadWithRefreshToken }): Promise<number> {
    return this.authService.sendEmailVerification(user.id);
  }
}
