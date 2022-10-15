import { createMock } from '@golevelup/ts-jest';
import { DatabaseService } from '../apps/api/src/app/db/database.service';

const mockTable = {
  findOne: jest.fn(),
  find: () => ({
    all: jest.fn(),
  }),
  update: jest.fn(),
  insert: jest.fn(),
  insertOrUpdate: jest.fn(),
  delete: jest.fn(),
  bulkInsertOrIgnore: jest.fn(),
};

export const mockDatabaseService = createMock<DatabaseService>({
  db: {
    query: jest.fn(),
    tx: jest.fn(),
  },
  users: () => mockTable,
  user_locations: () => mockTable,
  email_verification_codes: () => mockTable,
  reset_password_codes: () => mockTable,
});
