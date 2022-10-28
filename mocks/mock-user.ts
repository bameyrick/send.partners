import { createMock } from '@golevelup/ts-jest';
import { Users } from '../libs/common/src';

export const mockUser = createMock<Users>({
  id: 'id',
  email: 'email',
  email_verified: true,
  language: 'en',
  name: 'name',
  password: 'password',
  refresh_hash: 'refresh_hash',
  role: 'user',
});
