import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AppTestingModule } from '../../../app-testing.module';
import { SignupEffects } from './signup.effects';
import { AuthActions, selectProfile } from '@common-ui';
import { createMock } from '@golevelup/ts-jest';
import { LatLon, User } from '@common';
import { hot, cold } from 'jest-marbles';
import { SignupActions } from './signup.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe(`SignupEffects`, () => {
  let effects: SignupEffects;
  let actions$ = new Observable<Action>();
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
      providers: [SignupEffects, provideMockStore(), provideMockActions(() => actions$)],
    });

    mockStore = TestBed.inject(MockStore);
    effects = TestBed.inject(SignupEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe(`setName$`, () => {
    it(`should return a cold observable of updateProfile`, () => {
      const user = createMock<User>({ id: 'id' });

      mockStore.overrideSelector(selectProfile, user);

      const name = 'name';
      const action = SignupActions.setName({ name });
      const completion = AuthActions.updateProfile({ user: { ...user, name } });

      actions$ = hot('-a', { a: action });
      const expected = cold(`-(b)`, { b: completion });

      expect(effects.setName$).toBeObservable(expected);
    });
  });

  describe(`setLocation$`, () => {
    it(`should return a cold observable of updateProfile`, () => {
      const user = createMock<User>({ id: 'id' });

      mockStore.overrideSelector(selectProfile, user);

      const location: LatLon = [0, 0];
      const action = SignupActions.setLocation({ location });
      const completion = AuthActions.updateProfile({ user: { ...user, locations: [location] } });

      actions$ = hot('-a', { a: action });
      const expected = cold(`-(b)`, { b: completion });

      expect(effects.setLocation$).toBeObservable(expected);
    });
  });
});
