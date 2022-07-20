import { NgModule } from '@angular/core';
import { CommonUiModule } from '../../common-ui.module';
import { RequestPasswordResetComponent, RequestPasswordResetSuccessComponent } from './pages';
import { RequestPasswordResetRoutingModule } from './request-password-reset.routing.module';

@NgModule({
  declarations: [RequestPasswordResetComponent, RequestPasswordResetSuccessComponent],
  imports: [CommonUiModule, RequestPasswordResetRoutingModule],
})
export class RequestPasswordResetModule {}
