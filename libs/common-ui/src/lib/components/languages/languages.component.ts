import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs';
import { Language } from '../../translate';
import { TranslateService } from '../../translate/service';
import { AbstractComponent } from '../abstracts';

interface DisplayLanguage extends Language {
  title?: string;
}

@Component({
  selector: 'ul[app-languages]',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LanguagesComponent extends AbstractComponent {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Languages';

  public readonly currentLanguage$ = this.translateService.language$.pipe(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    map(current => this.mapLanguageForDisplay(this.translateService.languages.find(({ code }) => code === current)!))
  );

  public readonly languages$ = this.translateService.language$.pipe(
    map(current =>
      this.translateService.languages.filter(({ code }) => code !== current).map(language => this.mapLanguageForDisplay(language))
    )
  );

  constructor(elementRef: ElementRef, public readonly translateService: TranslateService) {
    super(elementRef);
  }

  private mapLanguageForDisplay(language: Language): DisplayLanguage {
    const translator = new Intl.DisplayNames([navigator.language], { type: 'language' });

    return {
      ...language,
      title: translator.of(language.code),
    };
  }
}
