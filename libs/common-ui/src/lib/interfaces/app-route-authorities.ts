import { Authority } from '@common';

export interface AppRouteAuthorities {
  // This includes parent authorities
  authorities: Authority[];

  // This is only the authority actually applied to the route
  authority?: Authority;
}
