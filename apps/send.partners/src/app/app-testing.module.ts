import { createMock } from '@golevelup/ts-jest';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SendPartnersCommonUiModule, TranslateModule, TranslateService } from '@send.partners/send-partners-common-ui';
import { ROOT_REDUCERS } from './routing';
import { AuthModule } from './auth';

const imports = [SendPartnersCommonUiModule, RouterTestingModule];

@NgModule({
  imports: [
    ...imports,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([]),
    AuthModule,
    TranslateModule.forRoot({ languages: [{ code: 'en', displayValue: 'English' }], defaultLanguage: 'en' }),
  ],
  providers: [
    {
      provide: TranslateService,
      useValue: createMock<TranslateService>(),
    },
  ],
  exports: [...imports],
})
export class AppTestingModule {}
