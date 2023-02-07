import { APIErrorCode, FullUser, LatLon, passwordRegex, User, UserRole, Users } from '@common';
import { ConnectionPool, sql, Transaction } from '@databases/pg';
import { allOf } from '@databases/pg-typed';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { clone } from '@qntm-code/utils';
import * as crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../db';
import { hash } from '../helpers';
import { MailService } from '../mail';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService, private readonly mailService: MailService) {
    void this.createDefaultSysadmin();
  }

  /**
   * This should only be used by internal code, and the data should not be returned to the user
   */
  public async findFullByEmail(email: string): Promise<FullUser | undefined> {
    const user = await this.databaseService.users().findOne({ email });

    if (user) {
      (user as FullUser).locations = await this.getUserLocations(user.id);
    }
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findFullByEmail(email);

    if (user) {
      return this.sanitizeUser(user);
    }
  }

  /**
   * This should only be used by internal code, and the data should not be returned to the user
   */
  public async findFullById(id: string, getUserLocations = true): Promise<FullUser | undefined> {
    const user = await this.databaseService.users().findOne({ id });

    if (getUserLocations && user) {
      (user as FullUser).locations = await this.getUserLocations(user.id);
    }

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findFullById(id);

    if (user) {
      return this.sanitizeUser(user);
    }
  }

  public async updateById(id: string, user: User): Promise<User | undefined> {
    if (id !== user.id) {
      throw new ForbiddenException();
    }

    const foundUser = await this.findFullById(id, false);

    if (foundUser) {
      const { name, language } = user;

      const modifiedUser = { ...foundUser, name, language };

      let updatedUser: Users;

      await this.databaseService.db.tx(async db => {
        updatedUser = (await this.databaseService.users(db).update({ id }, modifiedUser))[0];

        const locations = await this.getUserLocations(id, db);

        const newLocations = user.locations
          ?.filter(location => !locations.includes(location))
          .map(location => this.databaseService.toPoint(location));

        const deletedLocations = locations
          .filter(location => !user.locations.includes(location))
          .map(location => this.databaseService.toPoint(location));

        await this.databaseService.user_locations(db).delete({ user_id: id, location: allOf(deletedLocations) });

        if (newLocations) {
          await this.databaseService.user_locations(db).bulkInsertOrIgnore({
            columnsToInsert: [`user_id`, `location`],
            records: newLocations.map(location => ({ location, user_id: id })),
          });
        }
      });

      (updatedUser as FullUser).locations = await this.getUserLocations(id);

      return this.sanitizeUser(updatedUser);
    }

    return undefined;
  }

  public async markUserEmailAsValidated(id: string): Promise<User> {
    const user = await this.findFullById(id);

    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = (await this.databaseService.users().update({ id }, { email_verified: true }))[0];

    return this.sanitizeUser(updatedUser);
  }

  public async updateRefreshHash(id: string, refreshToken: string): Promise<void> {
    const user = await this.findFullById(id);

    if (user) {
      await this.databaseService.users().update({ id }, { refresh_hash: await hash(refreshToken) });
    }
  }

  public async removeRefreshHash(id: string): Promise<void> {
    const user = await this.findFullById(id);

    if (user) {
      await this.databaseService.users().update({ id }, { refresh_hash: undefined });
    }
  }

  public async createUser(
    email: string,
    password: string,
    language: string,
    email_verified = false,
    role: UserRole = 'user',
    name?: string
  ): Promise<FullUser> {
    if (await this.findByEmail(email)) {
      throw new BadRequestException(APIErrorCode.UserAlreadyExists);
    }

    if (passwordRegex.test(password)) {
      const users = await this.databaseService.users().insert({
        role,
        email,
        name,
        password: await hash(password),
        email_verified,
        language,
      });

      return users[0];
    } else {
      throw new Error(APIErrorCode.PasswordDoesNotMeetRequirements);
    }
  }

  public async updatePassword(id: string, password: string): Promise<void> {
    const user = await this.findFullById(id);

    if (!user) {
      throw new NotFoundException();
    }

    if (passwordRegex.test(password)) {
      await this.databaseService.users().update({ id }, { password: await hash(password) });
    } else {
      throw new Error(APIErrorCode.PasswordDoesNotMeetRequirements);
    }
  }

  public async requestPasswordReset(email: string): Promise<void> {
    const user = await this.findByEmail(email);

    if (user) {
      const code = this.genererateResetCode();
      const generated = new Date();

      await this.databaseService.reset_password_codes().insertOrUpdate(['user_id'], { user_id: user.id, code, generated });

      this.mailService.sendPasswordReset(user, code);
    }
  }

  public sanitizeUser(fullUser: FullUser): User {
    const user = clone(fullUser);

    delete user.password;
    delete user.refresh_hash;

    return user;
  }

  private async getUserLocations(user_id: string, db: ConnectionPool | Transaction = this.databaseService.db): Promise<LatLon[]> {
    const locations: Array<{ lat: number; lon: number }> = await db.query(
      sql`SELECT ST_Y(ST_AsText(location)) as lat, ST_X(ST_AsText(location)) as lon FROM user_locations WHERE user_id = ${user_id}`
    );

    return locations?.map(({ lat, lon }) => [lat, lon]);
  }

  private genererateResetCode(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private async createDefaultSysadmin(): Promise<void> {
    const sysadmin = await this.findByEmail(process.env.DEFAULT_SYSADMIN_EMAIL);

    if (!sysadmin) {
      await this.createUser(process.env.DEFAULT_SYSADMIN_EMAIL, `${uuid()}!A`, 'en', true, 'sysadmin', process.env.DEFAULT_SYSADMIN_NAME);

      void this.requestPasswordReset(process.env.DEFAULT_SYSADMIN_EMAIL);
    }
  }
}
