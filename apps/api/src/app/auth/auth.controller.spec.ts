import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
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
      providers: [AuthService, UsersService, { provide: MailService, useValue: jest.fn() }],
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

      controller.login({ user: '' });

      expect(authService.login).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call authService.logout', () => {
      jest.spyOn(authService, 'logout');

      controller.logout({ id: '' });

      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    it('should call authService.refresh', () => {
      jest.spyOn(authService, 'refresh').mockImplementation(() => undefined);

      controller.refresh({ user: { id: '', refresh_token: '' } });

      expect(authService.refresh).toHaveBeenCalled();
    });
  });

  describe('signUp', () => {
    it('should call authService.signUp', () => {
      jest.spyOn(authService, 'signUp').mockImplementation(() => undefined);

      controller.signUp({ email: 'email', password: 'password', language: 'en' });

      expect(authService.signUp).toHaveBeenCalled();
    });
  });

  describe('verifyEmail', () => {
    it('should call authService.verifyEmail', () => {
      jest.spyOn(authService, 'validateEmail').mockImplementation(() => undefined);

      controller.verifyEmail({ user: { id: '', refresh_token: '' } }, { code: '' });

      expect(authService.validateEmail).toHaveBeenCalled();
    });
  });

  describe('resendEmailVerification', () => {
    it('should call authService.resendEmailVerification', () => {
      jest.spyOn(authService, 'sendEmailVerification').mockImplementation(() => undefined);

      controller.resendEmailVerification({ user: { id: '', refresh_token: '' } });

      expect(authService.sendEmailVerification).toHaveBeenCalled();
    });
  });
});
