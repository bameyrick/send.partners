import { Injectable } from '@nestjs/common';
import { FullUser } from '@send.partners/common';
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
        email: 'sysadmin',
        name: 'sysadmin',
        password: await hash('password'),
      },
    ];
  }

  public async findByEmail(email: string): Promise<FullUser | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async findById(id: string): Promise<FullUser | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async updateRefreshHash(id: string, refreshToken: string): Promise<void> {
    const user = await this.findById(id);

    if (user) {
      user.refresh_hash = await hash(refreshToken);
    }
  }

  public async removeRefreshHash(id: string): Promise<void> {
    const user = await this.findById(id);

    if (user) {
      user.refresh_hash = undefined;
    }
  }
}
