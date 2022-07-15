import { TestBed } from '@angular/core/testing';
import { CommonUiTestingModule } from '../../common-ui-testing.module';

import { SvgSymbolsService } from './svg-symbols.service';

describe('SvgSymbolsService', () => {
  let service: SvgSymbolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
    });
    service = TestBed.inject(SvgSymbolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
