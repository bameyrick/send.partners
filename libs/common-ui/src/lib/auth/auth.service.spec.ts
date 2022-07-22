import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APIEndpoint, User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { firstValueFrom } from 'rxjs';
import { CommonUiTestingModule } from '../common-ui-testing.module';

import { AuthService } from './auth.service';

describe(`AuthService`, () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`refreshTokens`, () => {
    it(`should call http get with APIEndpoint.RefreshTokens`, async () => {
      const user = createMock<User>();

      service.refreshTokens().subscribe(result => expect(result).toEqual(user));

      const mock = httpTestingController.expectOne(APIEndpoint.RefreshTokens);

      expect(mock.request.method).toBe('GET');

      mock.flush(user);
    });
  });

  describe(`login`, () => {
    it(`should call http get with APIEndpoint.SignUp`, async () => {
      const user = createMock<User>();

      service.signUp({ email: 'email', password: 'password' }).subscribe(result => expect(result).toEqual(user));

      const mock = httpTestingController.expectOne(APIEndpoint.SignUp);

      expect(mock.request.method).toBe('POST');

      mock.flush(user);
    });
  });

  describe(`login`, () => {
    it(`should call http get with APIEndpoint.Login`, async () => {
      const user = createMock<User>();

      service.login({ email: 'email', password: 'password' }).subscribe(result => expect(result).toEqual(user));

      const mock = httpTestingController.expectOne(APIEndpoint.Login);

      expect(mock.request.method).toBe('POST');

      mock.flush(user);
    });
  });

  describe(`logout`, () => {
    it(`should call http get with APIEndpoint.Logout`, async () => {
      firstValueFrom(service.logout());

      const mock = httpTestingController.expectOne(APIEndpoint.Logout);

      expect(mock.request.method).toBe('GET');

      mock.flush(null);
    });
  });

  describe(`verifyEmail`, () => {
    it(`should call http get with APIEndpoint.VerifyEmail`, async () => {
      const user = createMock<User>();

      service.verifyEmail('code').subscribe(result => expect(result).toEqual(user));

      const mock = httpTestingController.expectOne(APIEndpoint.VerifyEmail);

      expect(mock.request.method).toBe('POST');

      mock.flush(user);
    });
  });

  describe(`resendVerificationEmail`, () => {
    it(`should call http get with APIEndpoint.ResendEmailVerification`, async () => {
      const user = createMock<User>();

      firstValueFrom(service.resendVerificationEmail());

      const mock = httpTestingController.expectOne(APIEndpoint.ResendEmailVerification);

      expect(mock.request.method).toBe('POST');

      mock.flush(user);
    });
  });

  describe(`updateProfile`, () => {
    it(`should call http get with APIEndpoint.MyProfile`, async () => {
      const user = createMock<User>();

      service.updateProfile(user).subscribe(result => expect(result).toEqual(user));

      const mock = httpTestingController.expectOne(APIEndpoint.MyProfile);

      expect(mock.request.method).toBe('PUT');

      mock.flush(user);
    });
  });

  describe(`requestPasswordReset`, () => {
    it(`should call http get with APIEndpoint.RequestPasswordReset`, async () => {
      const user = createMock<User>();

      firstValueFrom(service.requestPasswordReset({ email: 'email' }));

      const mock = httpTestingController.expectOne(APIEndpoint.RequestPasswordReset);

      expect(mock.request.method).toBe('POST');

      mock.flush(user);
    });
  });

  describe(`resetPassword`, () => {
    it(`should call http get with APIEndpoint.ResetPassword`, async () => {
      const user = createMock<User>();

      firstValueFrom(service.resetPassword({ password: 'password', code: 'code' }));

      const mock = httpTestingController.expectOne(APIEndpoint.ResetPassword);

      expect(mock.request.method).toBe('POST');

      mock.flush(user);
    });
  });
});
