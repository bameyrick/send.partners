import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CommonUiModule } from '@common-ui';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonUiModule, DashboardRoutingModule],
})
export class DashboardModule {}
