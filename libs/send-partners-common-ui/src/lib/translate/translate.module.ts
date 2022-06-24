import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslatePipe } from './pipe';
import { DEFAULT_LANGUAGE, TranslateService, USE_DEFAULT_LANGUAGE } from './service';

export interface TranslateModuleConfig {
  defaultLanguage: string;
  useDefaultLanguage?: boolean;
}

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
})
export class TranslateModule {
  public static forRoot(config: TranslateModuleConfig): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: [
        { provide: DEFAULT_LANGUAGE, useValue: config.defaultLanguage },
        { provide: USE_DEFAULT_LANGUAGE, useValue: config.useDefaultLanguage },
        TranslateService,
      ],
    };
  }
}
