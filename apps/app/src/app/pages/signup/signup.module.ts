import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SignupRoutingModule } from './signup.routing.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AppCommonModule } from '../../common';
import { SignupEmailVerificationComponent } from './signup-email-verification/signup-email-verification.component';
import { SignupNameComponent } from './signup-name/signup-name.component';
import { SignupNameFormComponent } from './signup-name/signup-name-form/signup-name-form.component';
import { SignupComponent } from './signup.component';
import { SignupLocationComponent } from './signup-location/signup-location.component';
import { SignupLocationFormComponent } from './signup-location/signup-location-form/signup-location-form.component';
import { SignupEffects } from './store';

@NgModule({
  declarations: [
    SignupComponent,
    SignupFormComponent,
    SignupEmailVerificationComponent,
    SignupNameComponent,
    SignupNameFormComponent,
    SignupLocationComponent,
    SignupLocationFormComponent,
  ],
  imports: [AppCommonModule, SignupRoutingModule, EffectsModule.forFeature([SignupEffects])],
})
export class SignupModule {}
