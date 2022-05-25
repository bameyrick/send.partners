import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AuthActions, AuthEffects, authReducer, AUTH_FEATURE_KEY, selectAuthTokens } from './store';
import { firstValueFrom } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer), EffectsModule.forFeature([AuthEffects])],
})
export class AuthModule {
  constructor(private readonly store: Store) {
    void this.refresh();
  }

  private async refresh(): Promise<void> {
    if (await firstValueFrom(this.store.select(selectAuthTokens))) {
      this.store.dispatch(AuthActions.refreshToken());
    }
  }
}
