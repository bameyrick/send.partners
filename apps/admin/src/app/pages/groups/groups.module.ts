import { NgModule } from '@angular/core';
import { CommonUiModule } from '@common-ui';
import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups.routing.module';

@NgModule({
  declarations: [GroupsComponent],
  imports: [CommonUiModule, GroupsRoutingModule],
})
export class GroupsModule {}
