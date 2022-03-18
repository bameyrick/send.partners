import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SendPartnersCommonUiModule } from '@send.partners/send-partners-common-ui';

@NgModule({
  declarations: [HomeComponent],
  imports: [SendPartnersCommonUiModule, HomeRoutingModule],
})
export class HomeModule {}
