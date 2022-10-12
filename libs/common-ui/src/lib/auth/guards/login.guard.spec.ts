import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppPath } from '@common';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { AuthState, selectAuthenticated } from '../store';
import { LoginGuard } from './login.guard';

describe(`LoginGuard`, () => {
  let guard: LoginGuard;
  let mockStore: MockStore;
  let mockAuthenticatedSelector: MemoizedSelector<AuthState, boolean>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      providers: [
        LoginGuard,
        provideMockStore(),
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },
      ],
    });

    guard = TestBed.inject(LoginGuard);
    mockStore = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    mockAuthenticatedSelector = mockStore.overrideSelector(selectAuthenticated, true);

    jest.spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe(`canActivateChild`, () => {
    it(`should return true if the user isn't authenticated`, async () => {
      mockAuthenticatedSelector.setResult(false);

      expect(await guard.canActivateChild()).toBe(true);
    });

    it(`should return navigate the signup page if the user isn't authenticated`, async () => {
      mockAuthenticatedSelector.setResult(false);

      await guard.canActivateChild();

      expect(router.navigate).toHaveBeenCalledWith([AppPath.Signup]);
    });

    it(`should return false if the user is authenticated`, async () => {
      mockAuthenticatedSelector.setResult(true);

      expect(await guard.canActivateChild()).toBe(false);
    });
  });
});
