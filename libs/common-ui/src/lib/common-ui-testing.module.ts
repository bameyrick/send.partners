import { Component, NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createMock } from '@golevelup/ts-jest';

import { CommonUiModule } from './common-ui.module';
import { Language, TranslateModule, TranslateService } from './translate';
import { BehaviorSubject } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule, LOGOUT_REDIRECT_PATH } from './auth';
import { AppPath } from '@common';

@Component({
  template: '',
})
class DummyComponent {}

const imports = [CommonUiModule, HttpClientTestingModule];

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
    RouterTestingModule.withRoutes([
      {
        path: AppPath.Root,
        component: DummyComponent,
      },
      {
        path: AppPath.Login,
        component: DummyComponent,
      },
    ]),
  ],
  providers: [
    {
      provide: TranslateService,
      useValue: createMock<TranslateService>({ language$: new BehaviorSubject('en'), languages: testLanguages }),
    },
    {
      provide: LOGOUT_REDIRECT_PATH,
      useValue: AppPath.Login,
    },
  ],
  exports: [...imports, RouterTestingModule],
})
export class CommonUiTestingModule {}
