import { Injectable } from '@nestjs/common';
import { TranslationKeyStore } from '@app/common';
import { Dictionary } from '@qntm-code/utils';

import enCommon from '../../../../../libs/common/src/lib/i18n/en.common.i18n.json';
import cyCommon from '../../../../../libs/common/src/lib/i18n/cy.common.i18n.json';
import enAPI from './en.api.json';
import cyAPI from './cy.api.json';

@Injectable()
export class TranslateService {
  /**
   * The dictionary for the known languages
   */
  private readonly store = new TranslationKeyStore();

  private readonly defaultLanguage = 'en';

  constructor() {
    this.store.addLanguageNamespace('en', 'common', enCommon);
    this.store.addLanguageNamespace('cy', 'common', cyCommon);
    this.store.addLanguageNamespace('en', 'api', enAPI);
    this.store.addLanguageNamespace('cy', 'api', cyAPI);
  }

  public translate(language: string, key: string, params?: Dictionary<unknown>): string {
    // Attempt to get the translation key value
    let result = this.store.getTranslationValue(key, language);

    // If the translation key value is not found and the language is not the same as the default language
    if (!result && language !== this.defaultLanguage) {
      result = this.store.getTranslationValue(key, this.defaultLanguage);
    }

    if (result) {
      return result(params);
    }

    return key;
  }
}
