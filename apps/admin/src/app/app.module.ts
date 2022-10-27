import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_ROUTING_TREE, AuthModule, CommonAppLoadService, CommonUiModule, ROOT_REDUCERS, TranslateModule } from '@common-ui';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './routing';
import { AppRoutingTree } from './routing/app-routing-tree';

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
      name: 'ngrx Send Partners Admin App',
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
      provide: APP_ROUTING_TREE,
      useValue: AppRoutingTree,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
