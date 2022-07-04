import { Injectable, NotFoundException } from '@nestjs/common';
import { clone } from '@qntm-code/utils';
import { APIErrorCode, FullUser, passwordRegex, User } from '@send.partners/common';
import { hash } from '../helpers';

@Injectable()
export class UsersService {
  private users?: FullUser[];

  constructor() {
    this.generateUsers();
  }

  private async generateUsers(): Promise<void> {
    this.users = [
      {
        id: 'sysadmin',
        email: 'sysadmin@email.com',
        name: 'sysadmin',
        password: await hash('password'),
        emailVerified: true,
        language: 'en',
      },
    ];
  }

  /**
   * This should only be used by internal code, and the data should not be returned to the user
   */
  public async findFullByEmail(email: string): Promise<FullUser | undefined> {
    return this.users?.find(user => user.email === email);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findFullByEmail(email);

    if (user) {
      return this.sanitizeUser(user);
    }

    return;
  }

  /**
   * This should only be used by internal code, and the data should not be returned to the user
   */
  public async findFullById(id: string): Promise<FullUser | undefined> {
    return this.users?.find(user => user.id === id);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findFullById(id);

    if (user) {
      return this.sanitizeUser(user);
    }

    return;
  }

  public async markUserEmailAsValidated(id: string): Promise<User> {
    const user = await this.findFullById(id);

    if (!user) {
      throw new NotFoundException();
    }

    user.emailVerified = true;

    return this.sanitizeUser(user);
  }

  public async updateRefreshHash(id: string, refreshToken: string): Promise<void> {
    const user = await this.findFullById(id);

    if (user) {
      user.refresh_hash = await hash(refreshToken);
    }
  }

  public async removeRefreshHash(id: string): Promise<void> {
    const user = await this.findFullById(id);

    if (user) {
      user.refresh_hash = undefined;
    }
  }

  public async createUser(email: string, password: string, language: string): Promise<FullUser> {
    if (passwordRegex.test(password)) {
      const user = {
        id: email,
        email,
        password: await hash(password),
        emailVerified: false,
        language,
      };

      this.users.push(user);

      return user;
    } else {
      throw new Error(APIErrorCode.PasswordDoesNotMeetRequirements);
    }
  }

  private sanitizeUser(fullUser: FullUser): User {
    const user = clone(fullUser);

    delete user.password;
    delete user.refresh_hash;

    return user;
  }
}
