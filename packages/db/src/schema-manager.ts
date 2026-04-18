import { pool } from ".";

export const initializeDatabaseSchema = async (
  schemaName: string,
  password: string,
) => {
  const safeName = `"${schemaName.replace(/"/g, '""')}"`;
  const dbUser = `${schemaName}_user`;
  const safeUser = `"${dbUser.replace(/"/g, '""')}"`;

  await pool.query(`CREATE SCHEMA ${safeName}`);

  const { rows } = await pool.query("SELECT current_database()");
  const dbName = rows[0].current_database;

  await pool.query(`CREATE USER ${safeUser} WITH PASSWORD $1`, [password]);
  await pool.query(`GRANT CONNECT ON DATABASE "${dbName}" TO ${safeUser}`);
  await pool.query(`GRANT ALL PRIVILEGES ON SCHEMA ${safeName} TO ${safeUser}`);
  await pool.query(
    `ALTER DEFAULT PRIVILEGES IN SCHEMA ${safeName} GRANT ALL ON TABLES TO ${safeUser}`,
  );

  await pool.query(`
    CREATE TABLE ${safeName}._tables (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await pool.query(`
  CREATE TABLE ${safeName}._columns (
    id SERIAL PRIMARY KEY,
    table_id INT REFERENCES ${safeName}._tables(id),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    nullable BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
`);
};
