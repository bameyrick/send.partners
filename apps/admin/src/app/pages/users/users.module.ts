import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { CommonUiModule } from '@common-ui';
import { UsersRoutingModule } from './users.routing.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonUiModule, UsersRoutingModule],
})
export class UsersModule {}
