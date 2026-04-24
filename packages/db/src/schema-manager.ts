import { pool } from ".";

export const initializeDatabaseSchema = async (
  schemaName: string,
  password: string,
) => {
  const dbUser = `${schemaName}_user`;
  const safeUser = `"${dbUser.replace(/"/g, '""')}"`;

  try {
    await pool.query(`CREATE SCHEMA ${schemaName}`);

    const { rows } = await pool.query("SELECT current_database()");
    const dbName = rows[0].current_database;

    await pool.query(`CREATE USER ${safeUser} WITH PASSWORD '${password}'`);
    await pool.query(`GRANT CONNECT ON DATABASE "${dbName}" TO ${safeUser}`);
    await pool.query(
      `GRANT ALL PRIVILEGES ON SCHEMA ${schemaName} TO ${safeUser}`,
    );
    await pool.query(
      `ALTER DEFAULT PRIVILEGES IN SCHEMA ${schemaName} GRANT ALL ON TABLES TO ${safeUser}`,
    );

    await pool.query(`
      CREATE TABLE ${schemaName}._tables (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE ${schemaName}._columns (
        id SERIAL PRIMARY KEY,
        table_id INT REFERENCES ${schemaName}._tables(id),
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        nullable BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log("çreatedd schema permissions etc");
  } catch (error) {
    console.error("Error initializing database schema:", {
      schemaName,
      dbUser,
      error,
    });

    throw error;
  }
};

export const teardownDatabaseSchema = async (schemaName: string) => {
  const dbUser = `${schemaName}_user`;
  const safeUser = `"${dbUser.replace(/"/g, '""')}"`;

  try {
    const { rows } = await pool.query("SELECT current_database()");
    const dbName = rows[0].current_database;

    await pool.query(`REVOKE CONNECT ON DATABASE "${dbName}" FROM ${safeUser}`);
    await pool.query(
      `REVOKE ALL PRIVILEGES ON SCHEMA ${schemaName} FROM ${safeUser}`,
    );
    await pool.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);
    await pool.query(`DROP USER IF EXISTS ${safeUser}`);
  } catch (error) {
    console.error("Error tearing down database schema:", {
      schemaName,
      dbUser,
      error,
    });

    throw error;
  }
};
