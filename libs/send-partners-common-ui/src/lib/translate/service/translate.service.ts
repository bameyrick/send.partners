import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Dictionary, isEqual, isNullOrUndefined, isString } from '@qntm-code/utils';
import { TranslationKeyStore, TranslationValue } from '@send.partners/common';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  concatMap,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  from,
  map,
  mergeMap,
  NEVER,
  Observable,
  of,
  pairwise,
  share,
  Subscription,
  withLatestFrom,
} from 'rxjs';
import { AssetPath } from '../../enums';

export const USE_DEFAULT_LANGUAGE = new InjectionToken<boolean>('USE_DEFAULT_LANGUAGE');

export const DEFAULT_LANGUAGE = new InjectionToken<string>('DEFAULT_LANGUAGE');

@Injectable({ providedIn: 'root' })
export class TranslateService {
  /**
   * The current language
   */
  public readonly language$ = new BehaviorSubject<string>('en');

  /**
   * The default language to fall back to if no translation is found
   */
  public readonly defaultLanguage$ = new BehaviorSubject<string>(this.defaultLanguage);

  /**
   * The dictionary for the current language
   */
  private readonly store = new TranslationKeyStore();

  /**
   * Files that have already been attempted to be downloaded
   */
  private readonly downloadedRequests: Dictionary<Observable<Dictionary<unknown> | undefined> | undefined> = {};

  constructor(
    @Inject(DEFAULT_LANGUAGE) private readonly defaultLanguage: string,
    @Inject(USE_DEFAULT_LANGUAGE) private readonly useDefaultLanguage: boolean = true,
    private readonly http: HttpClient
  ) {
    this.subscribeToLanguageChange(this.language$, this.defaultLanguage$);
    this.subscribeToLanguageChange(this.defaultLanguage$, this.language$);
  }

  public translate(key?: string, params?: Dictionary<unknown>): Observable<string> {
    return combineLatest([this.language$, this.defaultLanguage$]).pipe(
      distinctUntilChanged((previous, next) => isEqual(previous, next)),
      concatMap(() => (isString(key) ? of(key) : NEVER)),
      mergeMap(key => from(this.getKey(key))),
      map(result => (isNullOrUndefined(result) ? key || '' : result(params)))
    );
  }

  /**
   * Subscribes to either the language or default language changing. If the new previous language or default language is not the same as the
   * current language or default language, that language can be removed from the store to save memory.
   */
  private subscribeToLanguageChange(a$: Observable<string>, b$: Observable<string>): Subscription {
    return a$
      .pipe(
        pairwise(),
        map(([previous]) => previous),
        withLatestFrom(b$),
        filter(([a, b]) => b !== a),
        map(([a]) => a)
      )
      .subscribe(language => {
        this.store.removeLanguage(language);
        this.removeDownloadedFiles(language);
      });
  }

  /**
   * Gets a key for a given value
   */
  private async getKey(key: string): Promise<TranslationValue | undefined> {
    const parts = key.split('.');
    const namespace = parts[0];

    const language = await firstValueFrom(this.language$);
    const defaultLanguage = await firstValueFrom(this.defaultLanguage$);

    /**
     * If the namespace does not exist for the language and the default language is not the same as the language attempt to
     * download the file for the default language
     */
    if (!(await this.getNamespaceForLanguage(language, namespace)) && this.useDefaultLanguage && language !== defaultLanguage) {
      await this.getNamespaceForLanguage(defaultLanguage, namespace);
    }

    // Attempt to get the translation key value
    let result = this.store.getTranslationValue(key, language);

    // If the translation key value is not found and the language is not the same as the default language
    if (!result && this.useDefaultLanguage && language !== defaultLanguage) {
      await this.getNamespaceForLanguage(defaultLanguage, namespace);

      // Attempt to get the translation key value in the default language
      result = this.store.getTranslationValue(key, defaultLanguage);
    }

    return result;
  }

  /**
   * Downloads a namespace for a given language, and if found it will store it. Returns a boolean denoting whether the file was found
   */
  private async getNamespaceForLanguage(language: string, namespace: string): Promise<boolean> {
    const result = await firstValueFrom(this.downloadFile(language, namespace));

    if (result) {
      // If the file exists add it to the store
      this.store.addLanguageNamespace(language, namespace, result);

      return true;
    }

    return false;
  }

  /**
   * Downloads a language file for a given namespace
   */
  private downloadFile(language: string, namespace: string): Observable<Dictionary<unknown> | undefined> {
    const path = (AssetPath as Dictionary<string>)[`i18n/${language}.${namespace}.i18n.json`];

    let observable = this.downloadedRequests[path];

    if (!isNullOrUndefined(observable)) {
      return observable;
    }

    observable = this.http.get<Dictionary<unknown>>(path).pipe(
      catchError(() => of(undefined)),
      share()
    );

    this.downloadedRequests[path] = observable;

    if (!path) {
      console.error(`File with namespace ${namespace} not found for language ${language}`);
    }

    return observable;
  }

  /**
   * Removes the markers for files that have already been attempted to be downloaded
   */
  private removeDownloadedFiles(language: string): void {
    Object.keys(this.downloadedRequests)
      .filter(key => key.replace('assets/i18n/', '').split('.')[0] === language)
      .forEach(key => delete this.downloadedRequests[key]);
  }
}
