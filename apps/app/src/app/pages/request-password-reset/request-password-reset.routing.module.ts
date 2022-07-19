import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath, removeParentUrlParts } from '@common';
import { RequestPasswordResetSuccessComponent } from './request-password-reset-success/request-password-reset-success.component';
import { RequestPasswordResetComponent } from './request-password-reset.component';

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
