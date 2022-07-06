import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { APIEndpoint, JwtPayload, removeParentUrlParts, User } from '@send.partners/common';
import { UsersService } from './users.service';

@Controller(APIEndpoint.Users)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(removeParentUrlParts(APIEndpoint.Users, APIEndpoint.MyProfile))
  public async myProfile(@Request() { user }: { user: JwtPayload }): Promise<User> {
    return await this.userService.findById(user.id);
  }

  @Post(removeParentUrlParts(APIEndpoint.Users, APIEndpoint.MyProfile))
  public async updateMyProfile(@Request() { user }: { user: JwtPayload }, @Body() profile: User): Promise<User> {
    return await this.userService.updateById(user.id, profile);
  }
}
