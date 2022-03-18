import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPath } from './app-path';

const routes: Routes = [
  {
    path: AppPath.Root,
    children: [
      { path: AppPath.Root, loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule) },
      { path: AppPath.Signup, loadChildren: () => import('../pages/signup/signup.module').then(m => m.SignupModule) },
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
