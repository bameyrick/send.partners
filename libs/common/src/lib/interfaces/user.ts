import { Users_InsertParameters } from '../db-interfaces';
import { LatLon } from './lat-lon';

export interface FullUser extends Users_InsertParameters {
  locations?: LatLon[];
}

export type User = Pick<FullUser, 'id' | 'role' | 'email' | 'email_verified' | 'language' | 'name' | 'locations'>;
