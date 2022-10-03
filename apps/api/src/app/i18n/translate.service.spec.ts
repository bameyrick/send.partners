import { Test } from '@nestjs/testing';
import { TranslateService } from './translate.service';

describe(`TranslateService`, () => {
  let service: TranslateService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [TranslateService],
    }).compile();

    service = app.get<TranslateService>(TranslateService);

    (service as any).store.addLanguageNamespace('en', 'testing', { a: 'A', b: 'B', c: 'C' });

    (service as any).store.addLanguageNamespace('z', 'testing', { a: 'zA', b: 'zB' });

    (service as any).store.missingTranslationHandler = jest.fn();
  });

  describe(`translate`, () => {
    it(`Should return a translated value if that key exists in that language`, () => {
      expect(service.translate('en', 'testing.a')).toEqual('A');
      expect(service.translate('z', 'testing.a')).toEqual('zA');
    });

    it(`Should return a translated value in the default language if its not available in the provided language`, () => {
      expect(service.translate('z', 'testing.c')).toEqual('C');
    });

    it(`Should return the provided key if no translation is available`, () => {
      expect(service.translate('en', 'testing.d')).toEqual('testing.d');
    });
  });
});
