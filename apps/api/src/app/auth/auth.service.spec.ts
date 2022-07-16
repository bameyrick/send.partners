import { APIErrorCode, FullUser, User } from '@common';
import { ForbiddenException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { hash } from '../helpers';
import { MailService } from '../mail';
import { UsersService } from '../users';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let mailService: MailService;

  beforeEach(async () => {
    process.env.MAIL_VERIFICATION_RETRY_MINUTES = '60';
    process.env.MAIL_VERIFICATION_EXPIRY_HOURS = '24';

    const app = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [AuthService, UsersService, { provide: MailService, useValue: { sendEmailVerification: jest.fn() } }],
    }).compile();

    service = app.get<AuthService>(AuthService);
    userService = app.get<UsersService>(UsersService);
    mailService = app.get<MailService>(MailService);
  });

  describe('signUp', () => {
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

  describe('sendEmailVerification', () => {
    beforeEach(async () => {
      jest.spyOn(userService, 'findById').mockImplementation(async () => ({
        id: '',
        email: '',
        name: '',
        emailVerified: false,
        language: 'en',
      }));
    });

    it(`should throw a forbidden exception if a code exists and it has not expired`, async () => {
      await service.sendEmailVerification('id');

      await expect(service.sendEmailVerification('id')).rejects.toThrow(new ForbiddenException(APIErrorCode.WaitToResendVerificationEmail));
    });

    it(`should send a verification email if no code exists`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resetVerificationCodesForUserSpy = jest.spyOn(service as any, 'resetVerificationCodesForUser');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const generateCodeSpy = jest.spyOn(service as any, 'generateCode');

      await expect(service.sendEmailVerification('id')).resolves.not.toThrow();

      expect(resetVerificationCodesForUserSpy).toHaveBeenCalled();
      expect(generateCodeSpy).toBeCalled();
      expect(mailService.sendEmailVerification).toBeCalled();
    });

    it(`should send a verification email if no code but has expired`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resetVerificationCodesForUserSpy = jest.spyOn(service as any, 'resetVerificationCodesForUser');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const generateCodeSpy = jest.spyOn(service as any, 'generateCode');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).verificationCodes['id'] = { generated: new Date(0) };

      await expect(service.sendEmailVerification('id')).resolves.not.toThrow();

      expect(resetVerificationCodesForUserSpy).toHaveBeenCalled();
      expect(generateCodeSpy).toBeCalled();
      expect(mailService.sendEmailVerification).toBeCalled();
    });
  });

  describe('validateEmail', () => {
    it(`should throw an error if the code is invalid`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).verificationCodes['id'] = { generated: new Date(), code: '000000' };

      await expect(service.validateEmail('id', '111111')).rejects.toThrow(
        new ForbiddenException(APIErrorCode.EmailVerificationInvalidOrExpired)
      );
    });

    it(`should throw an error if user has no code`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).verificationCodes['id'] = { generated: new Date(), code: '000000' };

      await expect(service.validateEmail('badId', '000000')).rejects.toThrow(
        new ForbiddenException(APIErrorCode.EmailVerificationInvalidOrExpired)
      );
    });

    it(`should throw an error if code has expired`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).verificationCodes['id'] = { generated: new Date(0), code: '000000' };

      await expect(service.validateEmail('id', '000000')).rejects.toThrow(
        new ForbiddenException(APIErrorCode.EmailVerificationInvalidOrExpired)
      );
    });

    it(`should validate a valid code`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).verificationCodes['id'] = { generated: new Date(), code: '000000' };

      const user: User = { id: 'id ', email: 'email', emailVerified: true, language: 'en' };

      jest.spyOn(userService, 'markUserEmailAsValidated').mockImplementation(async () => user);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resetVerificationCodesForUserSpy = jest.spyOn(service as any, 'resetVerificationCodesForUser');

      await expect(service.validateEmail('id', '000000')).resolves.toEqual(user);

      expect(resetVerificationCodesForUserSpy).toBeCalled();
    });
  });
});
