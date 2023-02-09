import { Connection, sql } from '@databases/pg';

export default async function applyMigration(db: Connection) {
  await db.query(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await db.query(sql`CREATE EXTENSION IF NOT EXISTS "Postgis"`);

  await db.query(sql`CREATE TYPE user_role AS ENUM ('sysadmin', 'admin', 'moderator', 'user')`);

  await db.query(sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
      role user_role NOT NULL,
      email TEXT NOT NULL,
      email_verified BOOLEAN DEFAULT FALSE,
      language TEXT NOT NULL,
      password TEXT NOT NULL,
      refresh_hash TEXT,
      name TEXT,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      created_by UUID REFERENCES users(id),
      last_updated_by UUID REFERENCES users(id)
    )
  `);

  await db.query(sql`
    CREATE TABLE IF NOT EXISTS user_locations (
      id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
      user_id UUID NOT NULL REFERENCES users(id),
      location GEOGRAPHY(POINT, 4326) NOT NULL,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      created_by UUID NOT NULL REFERENCES users(id),
      last_updated_by UUID NOT NULL REFERENCES users(id)
    )
  `);

  await db.query(sql`
    CREATE TABLE IF NOT EXISTS email_verification_codes (
      user_id UUID PRIMARY KEY NOT NULL REFERENCES users(id),
      generated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      code TEXT NOT NULL
    )
  `);

  await db.query(sql`
    CREATE TABLE IF NOT EXISTS reset_password_codes (
      code TEXT PRIMARY KEY NOT NULL,
      user_id UUID NOT NULL REFERENCES users(id),
      generated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      unique(user_id),
      created_by UUID REFERENCES users(id)
    )
  `);
}
