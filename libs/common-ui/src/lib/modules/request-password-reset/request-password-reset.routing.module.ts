import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath, removeParentUrlParts } from '@common';
import { RequestPasswordResetComponent, RequestPasswordResetSuccessComponent } from './pages';

const routes: Routes = [
  {
    path: AppPath.Root,
    component: RequestPasswordResetComponent,
  },
  {
    path: removeParentUrlParts(AppPath.RequestPasswordReset, AppPath.RequestPasswordResetSuccess),
    component: RequestPasswordResetSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestPasswordResetRoutingModule {}
