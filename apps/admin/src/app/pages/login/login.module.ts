import { NgModule } from '@angular/core';
import { CommonUiModule } from '@common-ui';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonUiModule, LoginRoutingModule],
})
export class LoginModule {}
