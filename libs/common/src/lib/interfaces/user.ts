export interface User {
  id: string;
  email: string;
  name: string;
}

export interface FullUser extends User {
  password: string;
}
