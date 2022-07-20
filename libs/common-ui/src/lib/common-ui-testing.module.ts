import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createMock } from '@golevelup/ts-jest';

import { CommonUiModule } from './common-ui.module';
import { TranslateModule, TranslateService } from './translate';
import { BehaviorSubject } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const imports = [CommonUiModule, HttpClientTestingModule, RouterTestingModule];

@NgModule({
  imports: [
    ...imports,
    TranslateModule.forRoot({ languages: [{ code: 'en', displayValue: 'English' }], defaultLanguage: 'en' }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: TranslateService,
      useValue: createMock<TranslateService>({ language$: new BehaviorSubject('en') }),
    },
  ],
  exports: [...imports],
})
export class CommonUiTestingModule {}
