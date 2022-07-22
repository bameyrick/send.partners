import { TestBed } from '@angular/core/testing';
import { User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jest-marbles';
import { Observable } from 'rxjs';

import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { AuthEffects } from './auth.effects';

describe(`AuthEffects`, () => {
  let effects: AuthEffects;
  let actions$ = new Observable<Action>();
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      providers: [AuthEffects, provideMockActions(() => actions$), { provide: AuthService, useValue: createMock<AuthService>() }],
    }).compileComponents();

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe(`refreshToken$`, () => {
    it(`should return a cold observable refreshTokenSuccess`, () => {
      const user = createMock<User>({ id: 'id' });
      const action = AuthActions.refreshToken();
      const completion = AuthActions.refreshTokenSuccess({ user });

      jest.spyOn(authService, 'refreshTokens').mockImplementation(() => cold('-b', { b: user }));

      actions$ = hot('-a', { a: action });
      const expected = cold('--(b)', { b: completion });

      expect(effects.refreshToken$).toBeObservable(expected);
    });
  });
});
