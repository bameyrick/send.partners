import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { APIErrorCode, FullUser } from '@send.partners/common';
import { hash } from '../helpers';
import { MailService } from '../mail';
import { UsersService } from '../users';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [AuthService, UsersService, { provide: MailService, useValue: jest.fn() }],
    }).compile();

    service = app.get<AuthService>(AuthService);
    userService = app.get<UsersService>(UsersService);
  });

  describe('signUp', () => {
    it('should throw an exception if the user already exists', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockImplementation(
          () => new Promise(resolve => resolve({ id: 'test', email: 'test', name: 'test', emailVerified: true, language: 'en' }))
        );

      await expect(service.signUp('', '', '')).rejects.toThrow(new BadRequestException(APIErrorCode.UserAlreadyExists));
    });

    it('should create a user if the user does not exist', async () => {
      jest.spyOn(userService, 'findByEmail').mockImplementation(() => new Promise(resolve => resolve(undefined)));

      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(
          () =>
            new Promise(resolve =>
              resolve({ id: 'test', email: 'test', name: 'test', password: 'password', emailVerified: true, language: 'en' })
            )
        );

      jest.spyOn(service, 'sendEmailVerification').mockImplementation(() => new Promise(resolve => resolve(0)));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn(service as any, 'generateTokens');

      await service.signUp('', '', '');

      expect(userService.createUser).toHaveBeenCalled();
      expect(service.sendEmailVerification).toHaveBeenCalled();
      expect(spy).toBeCalled();
    });
  });

  describe('validateUser', () => {
    it(`should return null if user not found`, async () => {
      jest.spyOn(userService, 'findFullByEmail').mockImplementation(() => undefined);

      expect(await service.validateUser('email', 'password')).toBeNull();
    });

    it(`should return null if password does not match`, async () => {
      jest
        .spyOn(userService, 'findFullByEmail')
        .mockImplementation(
          () =>
            new Promise(resolve =>
              resolve({ id: 'test', email: 'test', name: 'test', password: 'password', emailVerified: true, language: 'en' })
            )
        );

      expect(await service.validateUser('test', 'badPassword')).toBeNull();
    });

    it(`should return the user's id  if password does not match`, async () => {
      const user: FullUser = { id: 'test', email: 'test', name: 'test', password: await hash('test'), emailVerified: true, language: 'en' };

      jest.spyOn(userService, 'findFullByEmail').mockImplementation(async () => user);

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
      jest.spyOn(userService, 'findFullById').mockImplementation(() => undefined);

      await expect(service.refresh('', '')).rejects.toThrow(new ForbiddenException());
    });

    it(`should throw a forbidden exception if user does not have a refresh_hash`, async () => {
      jest
        .spyOn(userService, 'findFullById')
        .mockImplementation(async () => ({ id: '', email: '', name: '', password: '', emailVerified: false, language: 'en' }));

      await expect(service.refresh('', '')).rejects.toThrow(new ForbiddenException());
    });

    it(`should throw a forbidden exception if refreshToken does not match refresh_hash`, async () => {
      const token = 'test';
      jest.spyOn(userService, 'findFullById').mockImplementation(async () => ({
        id: '',
        email: '',
        name: '',
        password: '',
        refresh_hash: await hash(token),
        emailVerified: false,
        language: 'en',
      }));

      await expect(service.refresh('', 'badToken')).rejects.toThrow(new ForbiddenException());
    });

    it(`should return new tokens if hashes match`, async () => {
      const token = 'test';
      jest.spyOn(userService, 'findFullById').mockImplementation(async () => ({
        id: '',
        email: '',
        name: '',
        password: '',
        refresh_hash: await hash(token),
        emailVerified: false,
        language: 'en',
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spy = jest.spyOn(service as any, 'generateTokens');

      await service.refresh('', token);

      expect(spy).toHaveBeenCalled();
    });
  });
});
