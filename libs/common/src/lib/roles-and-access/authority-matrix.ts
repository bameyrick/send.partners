import { UserRole } from '../db-interfaces/_enums';
import { PartialRecord } from '../types';
import { Authority } from './authority';

export interface AccessRule {
  allow?: UserRole[];
  deny?: UserRole[];
}

interface _AuthorityAccessRule extends AccessRule {
  authority: Authority;
}

export interface AuthorityAccessRule extends _AuthorityAccessRule {
  children?: AuthorityAccessRule[];
}

const AUTHORITY_MATRIX: AuthorityAccessRule[] = [
  {
    authority: Authority.Admin,
    allow: ['sysadmin', 'admin', 'moderator'],
    children: [
      {
        authority: Authority.ManageUsers,
        children: [
          {
            authority: Authority.CreateUsers,
            deny: ['moderator'],
            children: [
              {
                authority: Authority.CreateAdmin,
                deny: ['admin'],
                children: [
                  {
                    authority: Authority.CreateSysadmin,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        authority: Authority.ManageActivityConfigs,
        deny: ['moderator'],
      },
    ],
  },
];

export const FLATTENED_AUTHORITY_MATRIX: PartialRecord<Authority, UserRole[]> = {};

AUTHORITY_MATRIX.forEach(authorityAccessRule => flattenAuthorityAccessRule(authorityAccessRule));

function flattenAuthorityAccessRule({ authority, allow, deny, children }: AuthorityAccessRule, parentRule?: AccessRule): void {
  let roles: UserRole[] = ['sysadmin', 'admin', 'moderator', 'user'];

  allow = [...new Set([...(parentRule?.allow ?? []), ...(allow ?? [])])];
  deny = [...new Set([...(parentRule?.deny ?? []), ...(deny ?? [])])];

  if (allow.length) {
    roles = roles.filter(role => allow?.includes(role));
  }

  if (deny.length) {
    roles = roles.filter(role => !deny?.includes(role));
  }

  FLATTENED_AUTHORITY_MATRIX[authority] = roles;

  if (children) {
    children.forEach(child => flattenAuthorityAccessRule(child, { allow, deny }));
  }
}
