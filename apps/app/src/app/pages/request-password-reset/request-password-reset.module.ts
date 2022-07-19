import { NgModule } from '@angular/core';
import { CommonUiModule } from '@common-ui';
import { RequestPasswordResetSuccessComponent } from './request-password-reset-success/request-password-reset-success.component';
import { RequestPasswordResetComponent } from './request-password-reset.component';
import { RequestPasswordResetRoutingModule } from './request-password-reset.routing.module';

@NgModule({
  declarations: [RequestPasswordResetComponent, RequestPasswordResetSuccessComponent],
  imports: [CommonUiModule, RequestPasswordResetRoutingModule],
})
export class RequestPasswordResetModule {}
