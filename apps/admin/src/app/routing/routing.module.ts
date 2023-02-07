import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath } from '@common';
import { AuthGuard } from '@common-ui';

const routes: Routes = [
  {
    path: AppPath.Root,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: AppPath.Root,
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: AppPath.Login,
        loadChildren: () => import('../pages/login/login.module').then(m => m.LoginModule),
      },
      {
        path: AppPath.RequestPasswordReset,
        loadChildren: () =>
          // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
          import('../../../../../libs/common-ui/src/lib/modules/request-password-reset/request-password-reset.module').then(
            m => m.RequestPasswordResetModule
          ),
      },
      {
        path: AppPath.ResetPassword,
        loadChildren: () =>
          // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
          import('../../../../../libs/common-ui/src/lib/modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
      },
      {
        path: AppPath.Users,
        loadChildren: () => import('../pages/users/users.module').then(m => m.UsersModule),
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
