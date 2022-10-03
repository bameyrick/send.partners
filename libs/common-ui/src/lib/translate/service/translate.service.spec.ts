import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { delay, Dictionary } from '@qntm-code/utils';
import { firstValueFrom } from 'rxjs';
import { testLanguages } from '../../common-ui-testing.module';
import { AssetPath } from '../../enums';
import { ENABLE_LOGGING } from '../../tokens';
import { DEFAULT_LANGUAGE, LANGUAGES, TranslateService, USE_DEFAULT_LANGUAGE } from './translate.service';

describe(`TranslateService`, () => {
  let service: TranslateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: LANGUAGES,
          useValue: testLanguages,
        },
        {
          provide: DEFAULT_LANGUAGE,
          useValue: 'en',
        },
        {
          provide: USE_DEFAULT_LANGUAGE,
          useValue: true,
        },
        {
          provide: ENABLE_LOGGING,
          useValue: false,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TranslateService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`current lanaugage should be english`, async () => {
    expect(await firstValueFrom(service.language$)).toBe('en');
  });

  describe(`setLanguage`, () => {
    it(`should call getValidLanguageCode`, () => {
      const getValidLanguageCodeSpy = jest.spyOn(service as any, 'getValidLanguageCode');

      service.setLanguage('en');

      expect(getValidLanguageCodeSpy).toHaveBeenCalledWith('en');
    });

    it(`should call next on language$`, () => {
      const nextSpy = jest.spyOn(service.language$, 'next');

      service.setLanguage('en');

      expect(nextSpy).toHaveBeenCalledWith('en');
    });
  });

  describe(`translate`, () => {
    it(`should return the key if no translation is found`, async () => {
      const translateRequest$ = service.translate('common.test');

      const result = firstValueFrom(translateRequest$) as Promise<string>;

      await delay();

      const request = httpMock.expectOne((AssetPath as Dictionary<string>)[`i18n/en.common.i18n.json`]);

      request.flush({});

      expect(await result).toBe('common.test');
    });

    it(`the value should update when the language changes`, async () => {
      const translateRequest$ = service.translate('common.test');

      let result = '';

      translateRequest$.subscribe(r => (result = r));

      await delay();

      const request = httpMock.expectOne((AssetPath as Dictionary<string>)[`i18n/en.common.i18n.json`]);

      request.flush({});

      await delay();

      expect(result).toBe('common.test');

      service.setLanguage('cy');

      await delay();

      const request2 = httpMock.expectOne((AssetPath as Dictionary<string>)[`i18n/cy.common.i18n.json`]);

      request2.flush({ test: 'test' });

      await delay();

      expect(result).toBe('test');
    });
  });
});
