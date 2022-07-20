import { NgModule } from '@angular/core';
import { CommonUiModule } from '../../common-ui.module';
import { ResetPasswordComponent, ResetPasswordSuccessComponent } from './pages';
import { ResetPasswordRoutingModule } from './reset-password.routing.module';

@NgModule({
  declarations: [ResetPasswordComponent, ResetPasswordSuccessComponent],
  imports: [CommonUiModule, ResetPasswordRoutingModule],
})
export class ResetPasswordModule {}
