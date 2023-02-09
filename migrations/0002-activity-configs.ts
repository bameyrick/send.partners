import { Connection, sql } from '@databases/pg';

export default async function applyMigration(db: Connection) {
  await db.query(sql`CREATE TABLE IF NOT EXISTS activity_categories (
      id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
      name TEXT NOT NULL,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      created_by UUID NOT NULL REFERENCES users(id),
      last_updated_by UUID NOT NULL REFERENCES users(id)
    )
  `);

  await db.query(sql`CREATE TABLE IF NOT EXISTS activity (
      id UUID PRIMARY KEY DEFAULT UUID_GENERATE_V4() NOT NULL,
      category_id UUID NOT NULL REFERENCES activity_categories(id),
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      created_by UUID NOT NULL REFERENCES users(id),
      last_updated_by UUID NOT NULL REFERENCES users(id)
    )
  `);
}
