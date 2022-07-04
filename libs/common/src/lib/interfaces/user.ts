export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  language: string;
  name?: string;
}

export interface FullUser extends User {
  password: string;
  refresh_hash?: string;
}
