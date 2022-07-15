import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { CommonUiModule } from '@app/common-ui';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonUiModule, HomeRoutingModule],
})
export class HomeModule {}
