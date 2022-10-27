import { AppPath, Authority } from '@common';

export interface AppTreeRoute {
  path: AppPath;
  authority?: Authority;
  children?: AppTreeRoute[];
}
