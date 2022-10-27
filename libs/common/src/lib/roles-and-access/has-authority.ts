import { User } from '../interfaces';
import { Authority } from './authority';
import { FLATTENED_AUTHORITY_MATRIX } from './authority-matrix';

export function hasAuthority(authority: Authority, { role }: Pick<User, 'role'>, enableLogging = false): boolean {
  const allowedRoles = FLATTENED_AUTHORITY_MATRIX[authority];

  if (allowedRoles) {
    if (!allowedRoles.includes(role)) {
      if (enableLogging) {
        console.log(`User does not have the required role to access ${authority}. Allowed roles: ${allowedRoles.join(', ')}`);
      }
      return false;
    }
  }

  return true;
}
