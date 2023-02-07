import { TestBed } from '@angular/core/testing';
import { Authority, User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAuthUser } from '../../auth';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { AuthorityService } from './authority.service';

describe(`AuthorityService`, () => {
  let service: AuthorityService;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
      providers: [provideMockStore()],
    });

    service = TestBed.inject(AuthorityService);
    mockStore = TestBed.inject(MockStore);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  describe(`hasAuthority`, () => {
    it(`should return false if the user is undefined`, async () => {
      mockStore.overrideSelector(selectAuthUser, undefined);

      expect(await service.hasAuthority(Authority.Admin)).toBe(false);
    });

    it(`should return true if the user has the authority`, async () => {
      mockStore.overrideSelector(selectAuthUser, createMock<User>({ role: 'sysadmin' }));

      expect(await service.hasAuthority(Authority.Admin)).toBe(true);
    });
  });
});
