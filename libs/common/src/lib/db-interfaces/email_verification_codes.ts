/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: Bzk0DiYXTxvGZhPXJlQ80e3NvllKDFHaOkByQqYQmZ7zb4tDTeSjU5HQnWWGTFS0HXGYruHpTn2bg/EKn0Zk6g==
 */

// tslint:disable

import Users from './users';

interface EmailVerificationCodes {
  code: string;
  /**
   * @default CURRENT_TIMESTAMP
   */
  generated: Date;
  user_id: Users['id'];
}
export default EmailVerificationCodes;

interface EmailVerificationCodes_InsertParameters {
  code: string;
  /**
   * @default CURRENT_TIMESTAMP
   */
  generated?: Date;
  user_id: Users['id'];
}
export type { EmailVerificationCodes_InsertParameters };