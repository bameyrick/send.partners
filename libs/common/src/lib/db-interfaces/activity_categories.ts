/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: FLppN/pz3Vltfh1wUwbEoWt19gd9undU5aT+nLLLpbRx4/qyZgORv0r6PuxkeBGDaAPDMm/jBu+sIsafgJHgIg==
 */

import Users from './users';

interface ActivityCategories {
  /**
   * @default CURRENT_TIMESTAMP
   */
  created: Date;
  created_by: Users['id'];
  /**
   * @default uuid_generate_v4()
   */
  id: string & { readonly __brand?: 'activity_categories_id' };
  last_updated_by: Users['id'];
  name: string;
  /**
   * @default CURRENT_TIMESTAMP
   */
  updated: Date;
}
export default ActivityCategories;

interface ActivityCategories_InsertParameters {
  /**
   * @default CURRENT_TIMESTAMP
   */
  created?: Date;
  created_by: Users['id'];
  /**
   * @default uuid_generate_v4()
   */
  id?: string & { readonly __brand?: 'activity_categories_id' };
  last_updated_by: Users['id'];
  name: string;
  /**
   * @default CURRENT_TIMESTAMP
   */
  updated?: Date;
}
export type { ActivityCategories_InsertParameters };
