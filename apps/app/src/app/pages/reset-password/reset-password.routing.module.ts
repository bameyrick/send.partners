import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath, removeParentUrlParts } from '@common';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
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
