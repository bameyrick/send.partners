import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { APIEndpoint } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { throwError } from 'rxjs';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { AuthService } from '../auth.service';
import { AuthInterceptor } from './auth.interceptor';

describe(`AuthInterceptor`, () => {
  let interceptor: AuthInterceptor;
  let next: HttpHandler;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      providers: [AuthInterceptor, { provide: AuthService, useValue: createMock<AuthService>() }],
    });

    interceptor = TestBed.inject(AuthInterceptor);
    authService = TestBed.inject(AuthService);
    next = createMock<HttpHandler>();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe(`intercept`, () => {
    it(`should return the request if the url is equal to APIEndpoint.RefreshTokens`, () => {
      const request = { url: APIEndpoint.RefreshTokens };

      interceptor.intercept(request as HttpRequest<unknown>, next).subscribe({
        next: response => expect(response).toBeTruthy(),
        error: () => {
          throw Error('Expected successful request');
        },
      });

      expect(next.handle).toBeCalledWith(request);
    });

    it(`should call refreshTokens if the request returns a status of 401`, () => {
      const request = { url: APIEndpoint.Login };

      next = createMock<HttpHandler>({
        handle: jest.fn(() => throwError(() => new HttpErrorResponse({ status: 401 }))),
      });

      interceptor.intercept(request as HttpRequest<unknown>, next).subscribe({
        next: response => expect(response).toBeTruthy(),
        error: () => {
          throw Error('Expected successful request');
        },
      });

      expect(authService.refreshTokens).toHaveBeenCalled();
    });

    it(`should throw an error if the request fails`, () => {
      const request = { url: APIEndpoint.Login };

      next = createMock<HttpHandler>({
        handle: jest.fn(() => throwError(() => new HttpErrorResponse({ status: 404, error: { message: 'No' } }))),
      });

      interceptor.intercept(request as HttpRequest<unknown>, next).subscribe({
        next: () => {
          throw Error('Expected error');
        },
        error: error => expect(error).toBeTruthy(),
      });
    });

    it(`should return request successfully `, () => {
      const request = { url: APIEndpoint.Login };

      interceptor.intercept(request as HttpRequest<unknown>, next).subscribe({
        next: response => expect(response).toBeTruthy(),
        error: () => {
          throw Error('Expected successful request');
        },
      });
    });
  });

  describe(`handle401Error`, () => {
    it(`should return error if refresh tokens fails`, () => {
      const request = { url: APIEndpoint.Login };

      next = createMock<HttpHandler>({
        handle: jest.fn(() => throwError(() => new HttpErrorResponse({ status: 401, error: { message: 'No' } }))),
      });

      jest.spyOn(authService, 'refreshTokens').mockReturnValue(throwError(() => new HttpErrorResponse({ status: 403 })));

      interceptor.intercept(request as HttpRequest<unknown>, next).subscribe({
        next: () => {
          throw Error('Expected error');
        },
        error: error => expect(error).toBeTruthy(),
      });
    });
  });
});
