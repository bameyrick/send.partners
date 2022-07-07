import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createMock } from '@golevelup/ts-jest';

import { SendPartnersCommonUiModule } from './send-partners-common-ui.module';
import { TranslateModule, TranslateService } from './translate';
import { BehaviorSubject } from 'rxjs';

const imports = [SendPartnersCommonUiModule, HttpClientTestingModule];

@NgModule({
  imports: [...imports, TranslateModule.forRoot({ languages: [{ code: 'en', displayValue: 'English' }], defaultLanguage: 'en' })],
  providers: [
    {
      provide: TranslateService,
      useValue: createMock<TranslateService>({ language$: new BehaviorSubject('en') }),
    },
  ],
  exports: [...imports],
})
export class SendPartnersCommonUiTestingModule {}
