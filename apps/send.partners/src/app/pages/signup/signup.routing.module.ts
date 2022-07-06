import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { removeParentUrlParts } from '@send.partners/common';
import { AppPath } from '../../routing';
import { SignupComponent } from './signup.component';
import { SignupEmailVerificationComponent } from './signup-email-verification/signup-email-verification.component';
import { SignupNameComponent } from './signup-name/signup-name.component';
import { SignupLocationComponent } from './signup-location/signup-location.component';

const routes: Routes = [
  {
    path: AppPath.Root,
    component: SignupComponent,
  },
  {
    path: removeParentUrlParts(AppPath.Signup, AppPath.SignupVerify),
    component: SignupEmailVerificationComponent,
  },
  {
    path: removeParentUrlParts(AppPath.Signup, AppPath.SignupName),
    component: SignupNameComponent,
  },
  {
    path: removeParentUrlParts(AppPath.Signup, AppPath.SignupLocation),
    component: SignupLocationComponent,
  },
  { path: '**', redirectTo: AppPath.Root },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
