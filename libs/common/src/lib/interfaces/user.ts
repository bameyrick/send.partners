export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
}

export interface FullUser extends User {
  password: string;
  refresh_hash?: string;
}
