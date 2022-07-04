import { NgModule } from '@angular/core';
import { SendPartnersCommonUiModule } from './send-partners-common-ui.module';
import { TranslateModule } from './translate/translate.module';

const imports = [SendPartnersCommonUiModule];

@NgModule({
  imports: [
    ...imports,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      languages: [
        { code: 'cy', displayValue: 'Cymraeg' },
        { code: 'fr', displayValue: 'Français' },
        { code: 'en', displayValue: 'English' },
      ],
    }),
  ],
  exports: [...imports],
})
export class SendPartnersCommonUiStorybookModule {}
