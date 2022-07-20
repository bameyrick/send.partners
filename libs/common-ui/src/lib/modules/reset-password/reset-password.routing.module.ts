import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath, removeParentUrlParts } from '@common';
import { ResetPasswordComponent, ResetPasswordSuccessComponent } from './pages';

const routes: Routes = [
  {
    path: removeParentUrlParts(AppPath.ResetPassword, AppPath.ResetPasswordSuccess),
    component: ResetPasswordSuccessComponent,
  },
  {
    path: removeParentUrlParts(AppPath.ResetPassword, AppPath.ResetPasswordCode),
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}
