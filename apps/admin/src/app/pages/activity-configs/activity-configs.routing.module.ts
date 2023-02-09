import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath } from '@common';
import { ActivityConfigsComponent } from './activity-configs.component';

const routes: Routes = [
  {
    path: AppPath.Root,
    component: ActivityConfigsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityConfigsRoutingModule {}
