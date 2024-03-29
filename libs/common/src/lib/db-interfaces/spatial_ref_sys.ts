/**
 * !!! This file is autogenerated do not edit by hand !!!
 *
 * Generated by: @databases/pg-schema-print-types
 * Checksum: U3QFSXdTB6BQA6igr/D2s5B6o+xRem/KSmskKv/Rt18QI//347vL3D6Jiylqh78/3y9TJNaoGSo42nJMV5tanA==
 */

// tslint:disable

interface SpatialRefSys {
  auth_name: string | null;
  auth_srid: number | null;
  proj4text: string | null;
  srid: number & { readonly __brand?: 'spatial_ref_sys_srid' };
  srtext: string | null;
}
export default SpatialRefSys;

interface SpatialRefSys_InsertParameters {
  auth_name?: string | null;
  auth_srid?: number | null;
  proj4text?: string | null;
  srid: number & { readonly __brand?: 'spatial_ref_sys_srid' };
  srtext?: string | null;
}
export type { SpatialRefSys_InsertParameters };
