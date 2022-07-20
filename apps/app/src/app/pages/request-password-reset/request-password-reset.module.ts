import { NgModule } from '@angular/core';
import { CommonUiModule } from '@common-ui';

import { RequestPasswordResetComponent } from './request-password-reset.component';
import { RequestPasswordResetRoutingModule } from './request-password-reset.routing.module';

@NgModule({
  declarations: [RequestPasswordResetComponent],
  imports: [CommonUiModule, RequestPasswordResetRoutingModule],
})
export class RequestPasswordResetModule {}
