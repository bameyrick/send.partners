import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AccessJwtStrategy } from '../strategies/access-jwt.strategy';

describe(`JwtAuthGuard`, () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        AccessJwtStrategy,
        {
          provide: Reflector,
          useValue: {
            constructor: jest.fn(),
            get: jest.fn(),
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it(`Should return true if route is marked as public`, () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockImplementation(() => true);

    const context = createMock<ExecutionContext>();

    expect(guard.canActivate(context)).toEqual(true);
  });

  it(`Should return true if route is not marked as public`, async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockImplementation(() => false);

    const context = createMock<ExecutionContext>();

    await expect(guard.canActivate(context)).rejects.toThrow(new UnauthorizedException());
  });
});
