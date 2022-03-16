import { Controller, Get, Request } from '@nestjs/common';
import { APIEndpoint, removeParentUrlParts, User } from '@send.partners/common';

@Controller(APIEndpoint.Users)
export class UsersController {
  @Get(removeParentUrlParts(APIEndpoint.Users, APIEndpoint.MyProfile))
  public myProfile(@Request() { user }: { user: User }) {
    return user;
  }
}
