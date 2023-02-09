/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: TITXHygPzmMs9Bcd/SwbFYH/KxdcSmSHaeqc1v5JXyqavMERG2Cirh0gneSZikVy7oXnifJMcftzvyM9SftayA==
 */

import Activity, { Activity_InsertParameters } from './activity';
import ActivityCategories, { ActivityCategories_InsertParameters } from './activity_categories';
import AtdatabasesMigrationsApplied, { AtdatabasesMigrationsApplied_InsertParameters } from './atdatabases_migrations_applied';
import AtdatabasesMigrationsVersion, { AtdatabasesMigrationsVersion_InsertParameters } from './atdatabases_migrations_version';
import EmailVerificationCodes, { EmailVerificationCodes_InsertParameters } from './email_verification_codes';
import ResetPasswordCodes, { ResetPasswordCodes_InsertParameters } from './reset_password_codes';
import SpatialRefSys, { SpatialRefSys_InsertParameters } from './spatial_ref_sys';
import Users, { Users_InsertParameters } from './users';
import UserLocations, { UserLocations_InsertParameters } from './user_locations';

interface DatabaseSchema {
  activity: { record: Activity; insert: Activity_InsertParameters };
  activity_categories: { record: ActivityCategories; insert: ActivityCategories_InsertParameters };
  atdatabases_migrations_applied: { record: AtdatabasesMigrationsApplied; insert: AtdatabasesMigrationsApplied_InsertParameters };
  atdatabases_migrations_version: { record: AtdatabasesMigrationsVersion; insert: AtdatabasesMigrationsVersion_InsertParameters };
  email_verification_codes: { record: EmailVerificationCodes; insert: EmailVerificationCodes_InsertParameters };
  reset_password_codes: { record: ResetPasswordCodes; insert: ResetPasswordCodes_InsertParameters };
  spatial_ref_sys: { record: SpatialRefSys; insert: SpatialRefSys_InsertParameters };
  user_locations: { record: UserLocations; insert: UserLocations_InsertParameters };
  users: { record: Users; insert: Users_InsertParameters };
}
export default DatabaseSchema;

function serializeValue(_tableName: string, _columnName: string, value: unknown): unknown {
  return value;
}
export { serializeValue };
export type {
  Activity,
  ActivityCategories,
  ActivityCategories_InsertParameters,
  Activity_InsertParameters,
  AtdatabasesMigrationsApplied,
  AtdatabasesMigrationsApplied_InsertParameters,
  AtdatabasesMigrationsVersion,
  AtdatabasesMigrationsVersion_InsertParameters,
  EmailVerificationCodes,
  EmailVerificationCodes_InsertParameters,
  ResetPasswordCodes,
  ResetPasswordCodes_InsertParameters,
  SpatialRefSys,
  SpatialRefSys_InsertParameters,
  UserLocations,
  UserLocations_InsertParameters,
  Users,
  Users_InsertParameters,
};
