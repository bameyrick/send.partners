import { JwtPayload, JwtPayloadWithRefreshToken } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { mockResponseObject } from '@mocks';
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

  // describe('signUp', () => {
  //   it('should call authService.signUp', () => {
  //     jest.spyOn(authService, 'signUp').mockImplementation(() => undefined);

  //     controller.signUp({ email: 'email', password: 'password', language: 'en' }, mockResponseObject());

  //     expect(authService.signUp).toHaveBeenCalled();
  //   });
  // });

  // describe('verifyEmail', () => {
  //   it('should call authService.verifyEmail', () => {
  //     jest.spyOn(authService, 'validateEmail').mockImplementation(() => undefined);

  //     controller.verifyEmail({ user: createMock<JwtPayloadWithRefreshToken>() }, { code: '' });

  //     expect(authService.validateEmail).toHaveBeenCalled();
  //   });
  // });

  // describe('resendEmailVerification', () => {
  //   it('should call authService.resendEmailVerification', () => {
  //     jest.spyOn(authService, 'sendEmailVerification').mockImplementation(() => undefined);

  //     controller.resendEmailVerification({ user: createMock<JwtPayloadWithRefreshToken>() });

  //     expect(authService.sendEmailVerification).toHaveBeenCalled();
  //   });
  // });
});
