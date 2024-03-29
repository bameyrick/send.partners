import { JwtPayload, User } from '@common';
import { createMock } from '@golevelup/ts-jest';
import { mockDatabaseService } from '@mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db';
import { MailService } from '../mail';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        {
          provide: MailService,
          useValue: createMock<MailService>(),
        },
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('myProfile', () => {
    it('should call userService.findById', () => {
      jest.spyOn(userService, 'findById');

      controller.myProfile({ user: createMock<JwtPayload>() });

      expect(userService.findById).toHaveBeenCalled();
    });
  });

  describe('updateMyProfile', () => {
    it('should call userService.updateById', async () => {
      jest.spyOn(userService, 'updateById').mockImplementation();

      await controller.updateMyProfile({ user: createMock<JwtPayload>() }, createMock<User>());

      expect(userService.updateById).toHaveBeenCalled();
    });
  });
});
