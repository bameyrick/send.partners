import { Test, TestingModule } from '@nestjs/testing';
import { AccessJwtStrategy } from './access-jwt.strategy';

describe(`JwtAuthGuard`, () => {
  let strategy: AccessJwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessJwtStrategy],
    }).compile();

    strategy = module.get<AccessJwtStrategy>(AccessJwtStrategy);
  });

  it(`Should return the id of the payload`, () => {
    const id = 'id';

    expect(strategy.validate({ id })).toEqual({ id });
  });
});
