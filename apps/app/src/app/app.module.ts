import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthModule, CommonAppLoadService, CommonUiModule, LOGOUT_REDIRECT_PATH, ROOT_REDUCERS, TranslateModule } from '@common-ui';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing';
import { environment } from '../environments/environment';
import { AppPath } from '@common';

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
    AuthModule,
  ],
  providers: [
    CommonAppLoadService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appLoadService: CommonAppLoadService) => () => appLoadService.initializeApp(),
      deps: [CommonAppLoadService],
      multi: true,
    },
    {
      provide: LOGOUT_REDIRECT_PATH,
      useValue: AppPath.Root,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
