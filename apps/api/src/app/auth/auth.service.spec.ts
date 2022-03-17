import { ForbiddenException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FullUser } from '@send.partners/common';
import { hash } from '../helpers';
import { UsersService } from '../users';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [AuthService, UsersService],
    }).compile();

    service = app.get<AuthService>(AuthService);
    userService = app.get<UsersService>(UsersService);
  });

  describe('validateUser', () => {
    it(`should return null if user not found`, async () => {
      jest.spyOn(userService, 'findByEmail').mockImplementation(() => undefined);

      expect(await service.validateUser('email', 'password')).toBeNull();
    });

    it(`should return null if password does not match`, async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation(() => new Promise(resolve => resolve({ id: 'test', email: 'test', name: 'test', password: 'test' })));

      expect(await service.validateUser('test', 'badPassword')).toBeNull();
    });

    it(`should return the user's id  if password does not match`, async () => {
      const user: FullUser = { id: 'test', email: 'test', name: 'test', password: await hash('test') };

      jest.spyOn(userService, 'findByEmail').mockImplementation(async () => user);

      expect(await service.validateUser(user.email, 'test')).toEqual(user.id);
    });
  });

  describe('login', () => {
    it(`should call generateTokens`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn(service as any, 'generateTokens');

      await service.login('');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it(`should call generateTokens`, async () => {
      jest.spyOn(userService, 'removeRefreshHash').mockImplementation(() => undefined);

      await service.logout('');

      expect(userService.removeRefreshHash).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it(`should throw a forbidden exception if no user found`, async () => {
      jest.spyOn(userService, 'findById').mockImplementation(() => undefined);

      await expect(service.refresh('', '')).rejects.toThrow(new ForbiddenException());
    });

    it(`should throw a forbidden exception if user does not have a refresh_hash`, async () => {
      jest.spyOn(userService, 'findById').mockImplementation(async () => ({ id: '', email: '', name: '', password: '' }));

      await expect(service.refresh('', '')).rejects.toThrow(new ForbiddenException());
    });

    it(`should throw a forbidden exception if refreshToken does not match refresh_hash`, async () => {
      const token = 'test';
      jest
        .spyOn(userService, 'findById')
        .mockImplementation(async () => ({ id: '', email: '', name: '', password: '', refresh_hash: await hash(token) }));

      await expect(service.refresh('', 'badToken')).rejects.toThrow(new ForbiddenException());
    });

    it(`should return new tokens if hashes match`, async () => {
      const token = 'test';
      jest
        .spyOn(userService, 'findById')
        .mockImplementation(async () => ({ id: '', email: '', name: '', password: '', refresh_hash: await hash(token) }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn(service as any, 'generateTokens');

      await service.refresh('', token);

      expect(spy).toHaveBeenCalled();
    });
  });
});
