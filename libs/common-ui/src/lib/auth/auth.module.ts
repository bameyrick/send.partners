import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AUTH_FEATURE_KEY, authReducer, AuthEffects } from './store';
import { AuthInterceptor } from './interceptors';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer), EffectsModule.forFeature([AuthEffects])],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
