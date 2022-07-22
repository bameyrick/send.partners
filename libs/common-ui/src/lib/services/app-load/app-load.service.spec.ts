import { TestBed } from '@angular/core/testing';
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
});
