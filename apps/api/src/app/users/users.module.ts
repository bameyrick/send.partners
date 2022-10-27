import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db';
import { MailModule } from '../mail';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
