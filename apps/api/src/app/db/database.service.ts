import { DatabaseSchema, LatLon, serializeValue } from '@common';
import createConnectionPool, { ConnectionPool, Transaction } from '@databases/pg';
import tables from '@databases/pg-typed';
import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import databaseSchema from '../../../../../libs/common/src/lib/db-interfaces/schema.json';

@Injectable()
export class DatabaseService {
  public readonly db = createConnectionPool({
    connectionString: process.env['DATABASE'],
    bigIntMode: 'number',
  });

  private readonly tables = tables<DatabaseSchema>({ serializeValue, databaseSchema });

  public readonly users = (db: ConnectionPool | Transaction = this.db) => this.tables.users(db);

  public readonly user_locations = (db: ConnectionPool | Transaction = this.db) => this.tables.user_locations(db);

  public readonly email_verification_codes = (db: ConnectionPool | Transaction = this.db) => this.tables.email_verification_codes(db);

  public readonly reset_password_codes = (db: ConnectionPool | Transaction = this.db) => this.tables.reset_password_codes(db);

  constructor() {
    process.once('SIGTERM', () => this.db.dispose().catch(exception => console.error(exception)));
  }

  public toPoint(coordinates: LatLon): string {
    return `POINT(${coordinates[1]} ${coordinates[0]})`;
  }
}
