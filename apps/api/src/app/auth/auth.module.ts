import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AccessJwtStrategy, LocalStrategy, RefreshJwtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { MailModule } from '../mail';
import { DatabaseModule } from '../db';

@Module({
  imports: [PassportModule, JwtModule.register({}), UsersModule, MailModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AccessJwtStrategy, RefreshJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
