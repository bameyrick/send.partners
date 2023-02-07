import { APIEndpoint, JwtPayload, removeParentUrlParts, User } from '@common';
import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller(APIEndpoint.Users)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(removeParentUrlParts(APIEndpoint.Users, APIEndpoint.MyProfile))
  public async myProfile(@Request() { user }: { user: JwtPayload }): Promise<User> {
    return this.userService.findById(user.id);
  }

  @Put(removeParentUrlParts(APIEndpoint.Users, APIEndpoint.MyProfile))
  public async updateMyProfile(@Request() { user }: { user: JwtPayload }, @Body() authUser: User): Promise<User> {
    return this.userService.updateById(user.id, authUser);
  }
}
