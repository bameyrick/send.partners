import { Component, NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppPath } from '@common';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AuthActions, AuthModule, LOGOUT_REDIRECT_PATH } from './auth';
import { CommonUiModule } from './common-ui.module';
import { TranslateModule } from './translate/translate.module';

@Component({
  template: '',
})
class DummyComponent {}

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
    RouterTestingModule.withRoutes([
      {
        path: AppPath.Root,
        component: DummyComponent,
      },
      {
        path: AppPath.Login,
        component: DummyComponent,
      },
    ]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AuthModule,
  ],
  exports: [...imports],
  providers: [
    {
      provide: LOGOUT_REDIRECT_PATH,
      useValue: AppPath.Login,
    },
  ],
})
export class CommonUiStorybookModule {
  constructor(private readonly store: Store) {
    this.store.dispatch(AuthActions.loginSuccess({ user: { id: '1', name: 'Storybook User', role: 'user', language: 'en', email: '' } }));
  }
}
