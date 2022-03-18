import { TestBed } from '@angular/core/testing';

import { SvgSymbolsService } from './svg-symbols.service';

describe('SvgSymbolsService', () => {
  let service: SvgSymbolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgSymbolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
