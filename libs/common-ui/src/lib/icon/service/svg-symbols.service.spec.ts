import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommonUiTestingModule } from '../../common-ui-testing.module';
import { AssetPath } from '../../enums';

import { SvgSymbolsService } from './svg-symbols.service';

describe('SvgSymbolsService', () => {
  let service: SvgSymbolsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiTestingModule],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SvgSymbolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should add the symbols to the head`, async () => {
    const request = httpMock.expectOne(AssetPath['symbols.svg']);

    expect(request.request.method).toEqual('GET');

    request.flush(`<svg><symbol id="symbol"></symbol></svg>`);

    httpMock.verify();

    expect(document.head.innerHTML).toContain(`<svg style="display: none"><symbol id="symbol"></symbol></svg>`);
  });
});
