import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CommonAppLoadService, CommonUiModule, TranslateModule } from '@common-ui';
import { AppComponent } from './app.component';
import { AppRoutingModule, ROOT_REDUCERS } from './routing';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonUiModule,
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      languages: [
        { code: 'en', displayValue: 'English' },
        { code: 'cy', displayValue: 'Cymraeg' },
      ],
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS, {
      runtimeChecks: {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: false,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      name: 'ngrx Send Partners App',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
  ],
  providers: [
    CommonAppLoadService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appLoadService: CommonAppLoadService) => () => appLoadService.initializeApp(),
      deps: [CommonAppLoadService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
