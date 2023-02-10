import { NgModule } from '@angular/core';
import { CommonUiModule } from '@common-ui';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent],
  imports: [CommonUiModule, HomeRoutingModule],
})
export class HomeModule {}
