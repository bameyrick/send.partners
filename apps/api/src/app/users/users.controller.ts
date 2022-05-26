import { Controller, Get, Request } from '@nestjs/common';
import { APIEndpoint, JwtPayload, removeParentUrlParts, User } from '@send.partners/common';
import { UsersService } from './users.service';

@Controller(APIEndpoint.Users)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(removeParentUrlParts(APIEndpoint.Users, APIEndpoint.MyProfile))
  public async myProfile(@Request() { user }: { user: JwtPayload }): Promise<User> {
    return await this.userService.findById(user.id);
  }
}
