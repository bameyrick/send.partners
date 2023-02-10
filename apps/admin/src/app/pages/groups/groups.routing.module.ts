import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath } from '@common';
import { GroupsComponent } from './groups.component';

const routes: Routes = [
  {
    path: AppPath.Root,
    component: GroupsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
