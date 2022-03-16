import { Injectable } from '@nestjs/common';
import { FullUser } from '@send.partners/common';
import { hash } from 'bcrypt';

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
        email: 'sysadmin',
        name: 'sysadmin',
        password: await hash('password', 10),
      },
    ];
  }

  public async findOne(email: string): Promise<FullUser | undefined> {
    return this.users.find(user => user.email === email);
  }
}
