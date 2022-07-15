import { NgModule } from '@angular/core';
import { CommonUiModule } from './common-ui.module';
import { TranslateModule } from './translate/translate.module';

const imports = [CommonUiModule];

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
export class CommonUiStorybookModule {}
