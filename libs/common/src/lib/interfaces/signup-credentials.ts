import { LoginCredentials } from './login-credentials';

export interface SignUpCredentials extends LoginCredentials {
  language: string;
}
