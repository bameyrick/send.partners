import { JwtPayload, JwtPayloadWithRefreshToken } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { mockDatabaseService, mockResponseObject } from '@mocks';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db';
import { MailService } from '../mail';
import { UsersService } from '../users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      controllers: [AuthController],
      providers: [
        UsersService,
        { provide: MailService, useValue: createMock<MailService>() },
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login', () => {
      jest.spyOn(authService, 'login');

      controller.login({ user: '' }, mockResponseObject());

      expect(authService.login).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call authService.logout', () => {
      jest.spyOn(authService, 'logout');

      controller.logout({ user: createMock<JwtPayload>() });

      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('should call authService.refresh', () => {
      controller.refresh({ user: createMock<JwtPayloadWithRefreshToken>() }, mockResponseObject());

      expect(authService.refresh).toHaveBeenCalled();
    });
  });

  describe('signUp', () => {
    it('should call authService.signUp', () => {
      jest.spyOn(authService, 'signUp');

      controller.signUp({ email: 'email', password: 'password', language: 'en' }, mockResponseObject());

      expect(authService.signUp).toHaveBeenCalled();
    });
  });

  describe('verifyEmail', () => {
    it('should call authService.verifyEmail', () => {
      jest.spyOn(authService, 'validateEmail');

      controller.verifyEmail({ user: createMock<JwtPayloadWithRefreshToken>() }, { code: '' });

      expect(authService.validateEmail).toHaveBeenCalled();
    });
  });

  describe('resendEmailVerification', () => {
    it('should call authService.resendEmailVerification', () => {
      jest.spyOn(authService, 'sendEmailVerification');

      controller.resendEmailVerification({ user: createMock<JwtPayloadWithRefreshToken>() });

      expect(authService.sendEmailVerification).toHaveBeenCalled();
    });
  });

  describe('requestPasswordReset', () => {
    it('should call authService.requestPasswordReset', () => {
      jest.spyOn(authService, 'requestPasswordReset');

      controller.requestPasswordReset({ user: createMock<JwtPayloadWithRefreshToken>() }, { email: 'email' });

      expect(authService.requestPasswordReset).toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should call authService.resetPassword', () => {
      jest.spyOn(authService, 'resetPassword');

      controller.resetPassword({ code: 'code', password: 'password ' });

      expect(authService.resetPassword).toHaveBeenCalled();
    });
  });
});
