import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  APIEndpoint,
  JwtPayload,
  JwtPayloadWithRefreshToken,
  JwtTokens,
  LoginCredentials,
  removeParentUrlParts,
} from '@send.partners/common';
import { Public } from './decorators';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard, LocalAuthGuard } from './guards';

@Controller(APIEndpoint.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.SignUp))
  public signUp(@Body() { email, password }: LoginCredentials): Promise<JwtTokens> {
    return this.authService.signUp(email, password);
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
}
