import { NgModule } from '@angular/core';
import { SignupComponent } from './signup.component';
import { SendPartnersCommonUiModule } from '@send.partners/send-partners-common-ui';
import { SignupRoutingModule } from './signup.routing.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [SendPartnersCommonUiModule, SignupRoutingModule],
})
export class SignupModule {}
