import { APIErrorCode, FullUser, User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { ForbiddenException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { hash } from '../helpers';
import { MailService } from '../mail';
import { UsersService } from '../users';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let mailService: MailService;

  beforeEach(async () => {
    process.env.MAIL_VERIFICATION_RETRY_MINUTES = '60';
    process.env.MAIL_VERIFICATION_EXPIRY_HOURS = '24';

    const app = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        AuthService,
        { provide: UsersService, useValue: createMock<UsersService>() },
        { provide: MailService, useValue: createMock<MailService>() },
      ],
    }).compile();

    service = app.get<AuthService>(AuthService);
    usersService = app.get<UsersService>(UsersService);
    mailService = app.get<MailService>(MailService);
  });

  describe('signUp', () => {
    it('should create a user if the user does not exist', async () => {
      jest.spyOn(usersService, 'findByEmail').mockImplementation(() => new Promise(resolve => resolve(undefined)));

      jest
        .spyOn(usersService, 'createUser')
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

      expect(usersService.createUser).toHaveBeenCalled();
      expect(service.sendEmailVerification).toHaveBeenCalled();
      expect(spy).toBeCalled();
    });
  });

  describe('validateUser', () => {
    it(`should return null if user not found`, async () => {
      jest.spyOn(usersService, 'findFullByEmail').mockImplementation(() => undefined);

      expect(await service.validateUser('email', 'password')).toBeNull();
    });

    it(`should return null if password does not match`, async () => {
      jest
        .spyOn(usersService, 'findFullByEmail')
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

      jest.spyOn(usersService, 'findFullByEmail').mockImplementation(async () => user);

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
      jest.spyOn(usersService, 'removeRefreshHash').mockImplementation(() => undefined);

      await service.logout('');

      expect(usersService.removeRefreshHash).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it(`should throw a forbidden exception if no user found`, async () => {
      jest.spyOn(usersService, 'findFullById').mockImplementation(() => undefined);

      await expect(service.refresh('', '')).rejects.toThrow(new ForbiddenException());
    });

    it(`should throw a forbidden exception if user does not have a refresh_hash`, async () => {
      jest
        .spyOn(usersService, 'findFullById')
        .mockImplementation(async () => ({ id: '', email: '', name: '', password: '', emailVerified: false, language: 'en' }));

      await expect(service.refresh('', '')).rejects.toThrow(new ForbiddenException());
    });

    it(`should throw a forbidden exception if refreshToken does not match refresh_hash`, async () => {
      const token = 'test';
      jest.spyOn(usersService, 'findFullById').mockImplementation(async () => ({
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
      jest.spyOn(usersService, 'findFullById').mockImplementation(async () => ({
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
      jest.spyOn(usersService, 'findById').mockImplementation(async () => ({
        id: '',
        email: '',
        name: '',
        emailVerified: false,
        language: 'en',
      }));
    });

    it(`should throw a forbidden exception if user is not found`, async () => {
      jest.spyOn(usersService, 'findById').mockImplementation(async () => undefined);

      await expect(service.sendEmailVerification('id')).rejects.toThrow(new ForbiddenException());
    });

    it(`should throw a forbidden exception if a code exists and it has not expired`, async () => {
      await service.sendEmailVerification('id');

      await expect(service.sendEmailVerification('id')).rejects.toThrow(new ForbiddenException(APIErrorCode.WaitToResendVerificationEmail));
    });

    it(`should send a verification email if no code exists`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const generateCodeSpy = jest.spyOn(service as any, 'generateCode');

      await expect(service.sendEmailVerification('id')).resolves.not.toThrow();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((service as any).verificationCodes['id']).not.toBeUndefined();
      expect(generateCodeSpy).toBeCalled();
      expect(mailService.sendEmailVerification).toBeCalled();
    });

    it(`should send a verification email if no code but has expired`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const generateCodeSpy = jest.spyOn(service as any, 'generateCode');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).verificationCodes['id'] = { generated: new Date(0) };

      await expect(service.sendEmailVerification('id')).resolves.not.toThrow();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((service as any).verificationCodes['id']).not.toBeUndefined();
      expect(generateCodeSpy).toBeCalled();
      expect(mailService.sendEmailVerification).toBeCalled();
    });
  });

  describe('validateEmail', () => {
    it(`should throw an error if the code is invalid`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).verificationCodes['id'] = { generated: new Date(), code: '000000' };

      jest.spyOn(usersService, 'markUserEmailAsValidated').mockImplementation(async () => createMock<User>());

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

      jest.spyOn(usersService, 'markUserEmailAsValidated').mockImplementation(async () => createMock<User>());

      await expect(service.validateEmail('id', '000000')).rejects.toThrow(
        new ForbiddenException(APIErrorCode.EmailVerificationInvalidOrExpired)
      );
    });

    it(`should validate a valid code`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).verificationCodes['id'] = { generated: new Date(), code: '000000' };

      const user: User = { id: 'id ', email: 'email', emailVerified: true, language: 'en' };

      jest.spyOn(usersService, 'markUserEmailAsValidated').mockImplementation(async () => user);

      await expect(service.validateEmail('id', '000000')).resolves.toEqual(user);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((service as any).verificationCodes['id']).toBeUndefined();
    });
  });

  describe(`requestPasswordReset`, () => {
    beforeEach(async () => {
      jest.spyOn(usersService, 'findByEmail').mockImplementation(async () => ({
        id: '',
        email: '',
        name: '',
        emailVerified: false,
        language: 'en',
      }));
    });

    it(`should call mailService.sendPasswordReset`, async () => {
      await service.requestPasswordReset('id');

      expect(mailService.sendPasswordReset).toBeCalled();
    });
  });

  describe(`resetPassword`, () => {
    it(`should throw forbidden exception if the code does not exist`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).resetEmailHash['code'] = { generated: new Date() };

      await expect(service.resetPassword({ code: 'badCode', password: 'password ' })).rejects.toThrow(
        new ForbiddenException(APIErrorCode.PasswordResetInvalidOrExpired)
      );
    });

    it(`should throw forbidden exception if the code has expired`, async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).resetEmailHash['code'] = { generated: new Date(0) };

      await expect(service.resetPassword({ code: 'code', password: 'password ' })).rejects.toThrow(
        new ForbiddenException(APIErrorCode.PasswordResetInvalidOrExpired)
      );
    });

    it(`should call usersService.updatePassword if code is valid and hasnot expired`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).resetEmailHash['code'] = { generated: new Date() };

      service.resetPassword({ code: 'code', password: 'password ' });

      expect(usersService.updatePassword).toHaveBeenCalled();
    });

    it(`should call remove the code from the hash dictionary`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (service as any).resetEmailHash['code'] = { generated: new Date() };

      service.resetPassword({ code: 'code', password: 'password ' });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((service as any).resetEmailHash['code']).toBeUndefined();
    });
  });
});
