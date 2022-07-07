import { TestBed } from '@angular/core/testing';
import { SendPartnersTestingModule } from '../../app-testing.module';

import { AppLoadService } from './app-load.service';

describe('AppLoadService', () => {
  let service: AppLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SendPartnersTestingModule],
    });
    service = TestBed.inject(AppLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
