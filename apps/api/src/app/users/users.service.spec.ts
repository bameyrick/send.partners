import { Test } from '@nestjs/testing';
import { FullUser } from '@send.partners/common';
import { hash } from '../helpers';

import { UsersService } from './users.service';

const testUser = describe('UsersService', () => {
  let service: UsersService;
  let testUser: FullUser;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = app.get<UsersService>(UsersService);

    testUser = {
      id: 'test',
      email: 'test',
      name: 'test',
      password: await hash('password'),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (service as any).users = [testUser];
  });

  describe('findByEmail', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findByEmail('email')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      expect(await service.findByEmail('test')).toEqual(testUser);
    });
  });

  describe('findById', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findById('id')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      expect(await service.findById('test')).toEqual(testUser);
    });
  });

  describe('removeRefreshHash', () => {
    it(`shouldn't set the refresh has to undefined if user not found`, async () => {
      const user = await service.findById('test');
      user.refresh_hash = 'test';

      await service.removeRefreshHash('id');
      expect(user.refresh_hash).not.toBeUndefined();
    });

    it(`should return the user`, async () => {
      const user = await service.findById('test');
      user.refresh_hash = 'test';

      await service.removeRefreshHash('test');
      expect(user.refresh_hash).toBeUndefined();
    });
  });
});
