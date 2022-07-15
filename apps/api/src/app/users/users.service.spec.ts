import { createMock } from '@golevelup/ts-jest';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { APIErrorCode, FullUser, User } from '@app/common';
import { hash } from '../helpers';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let testUser: FullUser;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = app.get<UsersService>(UsersService);

    testUser = {
      id: 'test',
      email: 'test',
      name: 'test',
      password: await hash('password'),
      emailVerified: true,
      language: 'en',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (service as any).users = [testUser];
  });

  describe('findByEmail', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findByEmail('email')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      expect(await service.findByEmail('test')).toEqual(service.sanitizeUser(testUser));
    });
  });

  describe('findFullByEmail', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findFullByEmail('email')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      expect(await service.findFullByEmail('test')).toEqual(testUser);
    });
  });

  describe('findById', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findById('id')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      expect(await service.findById('test')).toEqual(service.sanitizeUser(testUser));
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const user = (await service.findById('test'))!;

      user.name = 'Doop';

      expect(await service.updateById(user.id, user)).toEqual(user);
    });
  });

  describe('findFullById', () => {
    it(`should return undefined for a not found user`, async () => {
      expect(await service.findFullById('id')).toBeUndefined();
    });

    it(`should return the user`, async () => {
      expect(await service.findFullById('test')).toEqual(testUser);
    });
  });

  describe('removeRefreshHash', () => {
    it(`shouldn't set the refresh has to undefined if user not found`, async () => {
      const user = await service.findFullById('test');
      user.refresh_hash = 'test';

      await service.removeRefreshHash('id');
      expect(user.refresh_hash).not.toBeUndefined();
    });

    it(`should return the user`, async () => {
      const user = await service.findFullById('test');
      user.refresh_hash = 'test';

      await service.removeRefreshHash('test');
      expect(user.refresh_hash).toBeUndefined();
    });
  });

  describe(`markUserEmailAsValidated`, () => {
    it(`should throw a not found exception if user not found`, async () => {
      await expect(service.markUserEmailAsValidated('id')).rejects.toThrow(new NotFoundException());
    });

    it(`should return a user marked with email verified if user found`, async () => {
      expect((await service.markUserEmailAsValidated('test'))?.emailVerified).toEqual(true);
    });
  });

  describe(`createUser`, () => {
    it('should throw an exception if the user already exists', async () => {
      await expect(service.createUser('test', '', '')).rejects.toThrow(new BadRequestException(APIErrorCode.UserAlreadyExists));
    });

    it(`should throw an error if password does not meet requirements`, async () => {
      await expect(service.createUser('', '', '')).rejects.toThrow(new Error(APIErrorCode.PasswordDoesNotMeetRequirements));
    });

    it('should create the user if it meets requirements', async () => {
      expect(await service.createUser('new', 'Password01', 'en')).toBeTruthy();
    });
  });
});
