import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, User } from '@send.partners/common';
import { compare } from 'bcrypt';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  public async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);

    if (user && (await compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  public async login(user: User): Promise<LoginResponse> {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
