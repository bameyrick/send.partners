import { NgModule } from '@angular/core';
import { CommonUiModule } from '@common-ui';
import { ActivityConfigsComponent } from './activity-configs.component';
import { ActivityConfigsRoutingModule } from './activity-configs.routing.module';

@NgModule({
  declarations: [ActivityConfigsComponent],
  imports: [CommonUiModule, ActivityConfigsRoutingModule],
})
export class ActivityConfigsModule {}
