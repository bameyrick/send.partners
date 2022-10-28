import { APIErrorCode, User, UserLocations, Users } from '@common';
import { Transaction } from '@databases/pg';
import { UnorderedSelectQuery } from '@databases/pg-typed';
import { createMock } from '@golevelup/ts-jest';
import { mockDatabaseService, mockUser } from '@mocks';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db';
import { hash } from '../helpers';
import { MailService } from '../mail';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let databaseService: DatabaseService;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        { provide: MailService, useValue: createMock<MailService>() },
      ],
    }).compile();

    databaseService = module.get<DatabaseService>(DatabaseService);
    jest.spyOn(databaseService.users(), 'insert').mockResolvedValueOnce([mockUser]);

    service = module.get<UsersService>(UsersService);

    jest
      .spyOn(databaseService.user_locations(), 'find')
      .mockReturnValue({ all: () => createMock<UserLocations[]>() } as unknown as UnorderedSelectQuery<UserLocations>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findByEmail('email')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      expect(await service.findByEmail('test')).toEqual(service.sanitizeUser(mockUser));
    });
  });

  describe('findFullByEmail', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findFullByEmail('email')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      expect(await service.findFullByEmail('test')).toEqual(mockUser);
    });
  });

  describe('findById', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findById('id')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      expect(await service.findById('test')).toEqual(service.sanitizeUser(mockUser));
    });
  });

  describe('updateById', () => {
    it(`should throw a forbidden exception if the ids don't match`, async () => {
      await expect(service.updateById('id', createMock<User>({ id: 'badId' }))).rejects.toThrow(new ForbiddenException());
    });

    it(`should return undefined if the user does not exist`, async () => {
      expect(await service.updateById('id', createMock<User>({ id: 'id' }))).toBeUndefined();
    });

    it(`should return the updated user if user exists and ids match`, async () => {
      const db = createMock<Transaction>();

      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(databaseService.db, 'tx').mockImplementation(cb => cb(db));
      jest.spyOn(databaseService.users(db), 'update').mockResolvedValueOnce([mockUser]);

      expect(await service.updateById(mockUser.id, mockUser)).toEqual(service.sanitizeUser(mockUser));
    });

    it(`should delete any existing locations that haven't been passed back up`, async () => {
      const db = createMock<Transaction>();

      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(databaseService.db, 'tx').mockImplementation(cb => cb(db));
      jest.spyOn(db, `query`).mockResolvedValueOnce([mockUser] as any);
      jest.spyOn(databaseService.users(db), 'update').mockResolvedValueOnce([mockUser]);

      const deleteSpy = jest.spyOn(databaseService.user_locations(db), 'delete');

      await service.updateById(mockUser.id, { ...mockUser, locations: [[1, 1]] });

      expect(deleteSpy).toHaveBeenCalled();
    });

    it(`should add new locations`, async () => {
      const db = createMock<Transaction>();

      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(databaseService.db, 'tx').mockImplementation(cb => cb(db));
      jest.spyOn(db, `query`).mockResolvedValueOnce([mockUser] as any);
      jest.spyOn(databaseService.users(db), 'update').mockResolvedValueOnce([mockUser]);

      const bulkInsertOrIgnoreSpy = jest.spyOn(databaseService.user_locations(db), 'bulkInsertOrIgnore');

      await service.updateById(mockUser.id, { ...mockUser, locations: [[1, 1]] });

      expect(bulkInsertOrIgnoreSpy).toHaveBeenCalled();
    });
  });

  describe('findFullById', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findFullById('id')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      expect(await service.findFullById('test')).toEqual(mockUser);
    });
  });

  describe('removeRefreshHash', () => {
    it(`shouldn't update the user if user is not found`, async () => {
      await service.removeRefreshHash('id');

      expect(databaseService.users().update).not.toHaveBeenCalled();
    });

    it(`should update the user`, async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      const id = 'test';

      await service.removeRefreshHash(id);

      expect(databaseService.users().update).toHaveBeenCalledWith({ id }, { refresh_hash: undefined });
    });
  });

  describe(`markUserEmailAsValidated`, () => {
    it(`should throw a not found exception if user not found`, async () => {
      await expect(service.markUserEmailAsValidated('id')).rejects.toThrow(new NotFoundException());
    });

    it(`should return a user marked with email verified if user found`, async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(databaseService.users(), 'update').mockResolvedValueOnce([mockUser]);

      expect((await service.markUserEmailAsValidated('test'))?.email_verified).toEqual(true);
    });
  });

  describe(`createUser`, () => {
    it('should throw an exception if the user already exists', async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      await expect(service.createUser('test', '', '')).rejects.toThrow(new BadRequestException(APIErrorCode.UserAlreadyExists));
    });

    it(`should throw an error if password does not meet requirements`, async () => {
      await expect(service.createUser('', '', '')).rejects.toThrow(new Error(APIErrorCode.PasswordDoesNotMeetRequirements));
    });

    it('should create the user if it meets requirements', async () => {
      const password = 'Password1!';
      const mockUser = createMock<Users>({
        password: await hash(password),
      });

      jest.spyOn(databaseService.users(), 'insert').mockResolvedValueOnce([mockUser]);
      expect(await service.createUser(mockUser.email, password, mockUser.language)).toBeTruthy();
    });
  });

  describe(`updateRefreshHash`, () => {
    it(`should update the reset hash on the user`, async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      await service.updateRefreshHash('test', 'test');

      expect(databaseService.users().update).toHaveBeenCalled();
    });
  });

  describe(`updatePassword`, () => {
    it(`should throw a NotFoundException if the user does not exist`, async () => {
      await expect(service.updatePassword('id', 'password')).rejects.toThrow(new NotFoundException());
    });

    it(`should throw an error if the password does not meet requirements`, async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      await expect(service.updatePassword('test', '')).rejects.toThrow(new Error(APIErrorCode.PasswordDoesNotMeetRequirements));
    });

    it(`should update the user's password`, async () => {
      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      jest.spyOn(databaseService.users(), 'findOne').mockResolvedValueOnce(mockUser);

      await service.updatePassword('id', 'NewPassword01');

      expect(databaseService.users().update).toHaveBeenCalled();
    });
  });
});
