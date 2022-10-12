import { ModuleWithProviders, NgModule } from '@angular/core';
import { ENABLE_LOGGING } from '../tokens';
import { Language } from './interfaces';
import { TranslatePipe } from './pipe';
import { DEFAULT_LANGUAGE, LANGUAGES, TranslateService, USE_DEFAULT_LANGUAGE } from './service';

export interface TranslateModuleConfig {
  languages: Language[];
  defaultLanguage: string;
  useDefaultLanguage?: boolean;
  enableLogging?: boolean;
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
        { provide: LANGUAGES, useValue: config.languages },
        { provide: DEFAULT_LANGUAGE, useValue: config.defaultLanguage },
        { provide: USE_DEFAULT_LANGUAGE, useValue: config.useDefaultLanguage },
        { provide: ENABLE_LOGGING, useValue: config.enableLogging },
        TranslateService,
      ],
    };
  }
}
