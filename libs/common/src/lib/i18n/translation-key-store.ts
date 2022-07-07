import { Dictionary, isEmpty, isObject, isString } from '@qntm-code/utils';
import MessageFormat, { MessageFunction } from '@messageformat/core';

export type TranslationValue = MessageFunction<'string'>;

export type TranslationNamespace = Dictionary<unknown>;

type TranslationLanguage = Dictionary<unknown>;

type TranslationLanguages = Dictionary<Dictionary<TranslationNamespace>>;

export class TranslationKeyStore {
  /**
   * Stored languages and namespaces
   */
  private readonly store: TranslationLanguages = {};

  /**
   * Messageformat instance
   */
  private readonly messageformat = new MessageFormat([]);

  constructor(
    private readonly missingTranslationHandler: (language: string, key: string) => void = (language: string, key: string) =>
      console.error(`Translation not found for ${language}.${key}`)
  ) {}

  /**
   * Adds a namespace for a given language to the store
   */
  public addLanguageNamespace(language: string, namespace: string, values: TranslationLanguage): void {
    if (!this.store[language]) {
      this.store[language] = {};
    }

    this.store[language][namespace] = this.compileValues(values);
  }

  /**
   * Removes a language and all related namespaces
   */
  public removeLanguage(language: string): void {
    delete this.store[language];
  }

  /**
   * Gets a namespace in a given language
   */
  public getNamepaceForLanguage(language: string, namespace: string): TranslationNamespace | undefined {
    const languageStore = this.store[language];

    if (languageStore) {
      return languageStore[namespace];
    }

    return;
  }

  /**
   * Gets a translation value for a given key in a given value. If the key can't be found in the given language it will attempt to find the
   * key in the default language if provided.
   */
  public getTranslationValue(key: string, language: string, defaultLanguage?: string): TranslationValue | undefined {
    let store: TranslationLanguage = this.store[language];

    if (!store && !isEmpty(defaultLanguage) && defaultLanguage !== language) {
      store = this.store[defaultLanguage];
    }

    if (store) {
      let result: unknown | undefined = store;

      const parts = key.split('.');

      for (let i = 0, l = parts.length; i < l; i++) {
        result = (result as Dictionary<unknown>)[parts[i]];

        if (!result) {
          break;
        }
      }

      if (!result) {
        this.missingTranslationHandler(language, key);
      }

      return result as TranslationValue | undefined;
    }

    return;
  }

  /**
   * Compiles values to messageformat functions
   */
  private compileValues(values: Dictionary<unknown>): Dictionary<unknown> {
    return Object.entries(values).reduce((result, [key, value]) => {
      if (isString(value)) {
        result[key] = this.messageformat.compile(value);
      } else if (isObject(value)) {
        result[key] = this.compileValues(value as Dictionary<unknown>);
      }
      return result;
    }, {} as Dictionary<unknown>);
  }
}
