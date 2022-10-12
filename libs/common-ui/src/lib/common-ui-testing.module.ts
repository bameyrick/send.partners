import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createMock } from '@golevelup/ts-jest';

import { CommonUiModule } from './common-ui.module';
import { Language, TranslateModule, TranslateService } from './translate';
import { BehaviorSubject } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth';

const imports = [CommonUiModule, HttpClientTestingModule, RouterTestingModule];

export const testLanguages: Language[] = [
  { code: 'en', displayValue: 'English' },
  { code: 'cy', displayValue: 'Cymraeg' },
];

@NgModule({
  imports: [
    ...imports,
    TranslateModule.forRoot({
      languages: testLanguages,
      defaultLanguage: 'en',
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AuthModule,
  ],
  providers: [
    {
      provide: TranslateService,
      useValue: createMock<TranslateService>({ language$: new BehaviorSubject('en'), languages: testLanguages }),
    },
  ],
  exports: [...imports],
})
export class CommonUiTestingModule {}
