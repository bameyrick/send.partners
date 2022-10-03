import { TestBed } from '@angular/core/testing';
import { delay } from '@qntm-code/utils';
import { AuthActions } from '../../auth';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { CommonAppLoadService } from './app-load.service';

describe('CommonAppLoadService', () => {
  let service: CommonAppLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
    });

    service = TestBed.inject(CommonAppLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`initializeApp`, () => {
    it(`should dispatch the refreshToken action`, async () => {
      (service as any).store.dispatch(AuthActions.refreshTokenFailed());

      const dispatchSpy = jest.spyOn((service as any).store, 'dispatch');

      await service.initializeApp();

      expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.refreshToken());
    });

    it(`should wait for the initial refresh to complete`, async () => {
      let promiseResolved = false;

      service.initializeApp().then(() => (promiseResolved = true));

      expect(promiseResolved).toBe(false);

      (service as any).store.dispatch(AuthActions.refreshTokenFailed());

      await delay();

      expect(promiseResolved).toBe(true);
    });
  });
});
