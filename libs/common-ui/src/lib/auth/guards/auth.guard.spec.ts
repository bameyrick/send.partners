import { TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { AuthActions, AuthState, selectAuthenticated } from '../store';
import { AuthGuard } from './auth.guard';

describe(`AuthGuard`, () => {
  let guard: AuthGuard;
  let mockStore: MockStore;
  let mockAuthenticatedSelector: MemoizedSelector<AuthState, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      providers: [AuthGuard, provideMockStore()],
    });

    guard = TestBed.inject(AuthGuard);
    mockStore = TestBed.inject(MockStore);
    mockAuthenticatedSelector = mockStore.overrideSelector(selectAuthenticated, true);

    jest.spyOn(mockStore, 'dispatch');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe(`canActivateChild`, () => {
    it(`should return true if the user is authenticated`, async () => {
      mockAuthenticatedSelector.setResult(true);

      expect(await guard.canActivateChild()).toBe(true);
    });

    it(`shouldn't dispatch a logout action if the user is authenticated`, async () => {
      mockAuthenticatedSelector.setResult(true);

      await guard.canActivateChild();

      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });

    it(`should return false if the user is not authenticated`, async () => {
      mockAuthenticatedSelector.setResult(false);

      expect(await guard.canActivateChild()).toBe(false);
    });

    it(`should dispatch a logout action if the user is not authenticated`, async () => {
      mockAuthenticatedSelector.setResult(false);

      await guard.canActivateChild();

      expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    });
  });
});
