import { NgModule } from '@angular/core';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup.routing.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AppCommonModule } from '../../common';

@NgModule({
  declarations: [SignupComponent, SignupFormComponent],
  imports: [AppCommonModule, SignupRoutingModule],
})
export class SignupModule {}
