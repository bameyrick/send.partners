import { AppPath, Authority } from '@common';
import { AppTreeRoute } from '@common-ui';

/**
 * A tree depicting the entire routing of the app. This is used for checking permissions and route guards.
 */
export const AppRoutingTree: AppTreeRoute[] = [
  {
    path: AppPath.Users,
    authority: Authority.ManageUsers,
  },
  {
    path: AppPath.ActivityConfigs,
    authority: Authority.ManageActivityConfigs,
  },
  {
    path: AppPath.RequestPasswordReset,
  },
  {
    path: AppPath.RequestPasswordResetSuccess,
  },
  {
    path: AppPath.ResetPasswordCode,
  },
  {
    path: AppPath.Login,
  },
  {
    path: AppPath.Root,
  },
];
