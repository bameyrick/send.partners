import { LatLon } from './lat-lon';

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  language: string;
  name?: string;
  locations?: LatLon[];
}

export interface FullUser extends User {
  password: string;
  refresh_hash?: string;
}
