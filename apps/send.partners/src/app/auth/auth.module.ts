import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AuthActions, AuthEffects, authReducer, AUTH_FEATURE_KEY } from './store';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer), EffectsModule.forFeature([AuthEffects])],
})
export class AuthModule {
  constructor(readonly store: Store) {
    store.dispatch(AuthActions.refreshToken());
  }
}
