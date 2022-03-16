import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { APIEndpoint, LoginResponse, removeParentUrlParts, User } from '@send.partners/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

@Controller(APIEndpoint.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post(removeParentUrlParts(APIEndpoint.Auth, APIEndpoint.Login))
  public login(@Request() { user }: { user: User }): Promise<LoginResponse> {
    return this.authService.login(user);
  }
}
