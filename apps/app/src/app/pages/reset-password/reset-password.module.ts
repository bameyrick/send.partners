import { NgModule } from '@angular/core';
import { CommonUiModule } from '@common-ui';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password.routing.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonUiModule, ResetPasswordRoutingModule],
})
export class ResetPasswordModule {}
