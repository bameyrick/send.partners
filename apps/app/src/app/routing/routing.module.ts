import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath } from '@common';
import { SignUpGuard } from '../auth/guards/signup.guard';

const routes: Routes = [
  {
    path: AppPath.Root,
    canActivate: [SignUpGuard],
    canActivateChild: [SignUpGuard],
    children: [
      { path: AppPath.Root, loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule) },
      { path: AppPath.Signup, loadChildren: () => import('../pages/signup/signup.module').then(m => m.SignupModule) },
      {
        path: AppPath.RequestPasswordReset,
        loadChildren: () => import('../pages/request-password-reset/request-password-reset.module').then(m => m.RequestPasswordResetModule),
      },
      {
        path: AppPath.ResetPassword,
        loadChildren: () => import('../pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
      },
      { path: '**', redirectTo: AppPath.Root },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
