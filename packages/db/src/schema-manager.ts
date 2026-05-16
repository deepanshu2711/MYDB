import { pool } from ".";

export const initializeDatabaseSchema = async (
  schemaName: string,
  password: string,
) => {
  const dbUser = `${schemaName}_user`;

  // escape identifiers safely
  const safeSchema = `"${schemaName.replace(/"/g, '""')}"`;
  const safeUser = `"${dbUser.replace(/"/g, '""')}"`;

  try {
    // create schema
    await pool.query(`CREATE SCHEMA ${safeSchema}`);

    // get current db name
    const { rows } = await pool.query(
      `SELECT current_database() AS current_database`,
    );

    const dbName = rows[0].current_database;

    // create user
    await pool.query(`
      CREATE USER ${safeUser}
      WITH PASSWORD '${password}'
    `);

    await pool.query(`
      GRANT ${safeUser} TO CURRENT_USER
    `);

    // database access
    await pool.query(`
      GRANT CONNECT ON DATABASE "${dbName}"
      TO ${safeUser}
    `);

    // schema permissions
    await pool.query(`
      GRANT USAGE, CREATE ON SCHEMA ${safeSchema}
      TO ${safeUser}
    `);

    // future tables/sequences permissions
    await pool.query(`
      ALTER DEFAULT PRIVILEGES IN SCHEMA ${safeSchema}
      GRANT ALL ON TABLES TO ${safeUser}
    `);

    await pool.query(`
      ALTER DEFAULT PRIVILEGES IN SCHEMA ${safeSchema}
      GRANT ALL ON SEQUENCES TO ${safeUser}
    `);

    // _tables table
    await pool.query(`
      CREATE TABLE ${safeSchema}._tables (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // _columns table
    await pool.query(`
      CREATE TABLE ${safeSchema}._columns (
        id SERIAL PRIMARY KEY,
        table_id INT REFERENCES ${safeSchema}._tables(id),
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        nullable BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // change ownership of tables
    await pool.query(`
      ALTER TABLE ${safeSchema}._tables
      OWNER TO ${safeUser}
    `);

    await pool.query(`
      ALTER TABLE ${safeSchema}._columns
      OWNER TO ${safeUser}
    `);

    // change ownership of SERIAL sequences
    await pool.query(`
      ALTER SEQUENCE ${safeSchema}._tables_id_seq
      OWNER TO ${safeUser}
    `);

    await pool.query(`
      ALTER SEQUENCE ${safeSchema}._columns_id_seq
      OWNER TO ${safeUser}
    `);

    // grant table permissions
    await pool.query(`
      GRANT ALL PRIVILEGES
      ON ALL TABLES IN SCHEMA ${safeSchema}
      TO ${safeUser}
    `);

    // grant sequence permissions
    await pool.query(`
      GRANT ALL PRIVILEGES
      ON ALL SEQUENCES IN SCHEMA ${safeSchema}
      TO ${safeUser}
    `);

    console.log("Created schema, tables, permissions, and ownership");
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

  // safely escape identifiers
  const safeSchema = `"${schemaName.replace(/"/g, '""')}"`;
  const safeUser = `"${dbUser.replace(/"/g, '""')}"`;

  try {
    // get current database name
    const { rows } = await pool.query(
      `SELECT current_database() AS current_database`,
    );

    const dbName = rows[0].current_database;

    // revoke future/default privileges
    await pool.query(`
      ALTER DEFAULT PRIVILEGES IN SCHEMA ${safeSchema}
      REVOKE ALL ON TABLES FROM ${safeUser}
    `);

    await pool.query(`
      ALTER DEFAULT PRIVILEGES IN SCHEMA ${safeSchema}
      REVOKE ALL ON SEQUENCES FROM ${safeUser}
    `);

    // revoke schema permissions
    await pool.query(`
      REVOKE ALL PRIVILEGES
      ON ALL TABLES IN SCHEMA ${safeSchema}
      FROM ${safeUser}
    `);

    await pool.query(`
      REVOKE ALL PRIVILEGES
      ON ALL SEQUENCES IN SCHEMA ${safeSchema}
      FROM ${safeUser}
    `);

    await pool.query(`
      REVOKE ALL PRIVILEGES
      ON SCHEMA ${safeSchema}
      FROM ${safeUser}
    `);

    // revoke database connect
    await pool.query(`
      REVOKE CONNECT ON DATABASE "${dbName}"
      FROM ${safeUser}
    `);

    // drop schema and all contained objects
    await pool.query(`
      DROP SCHEMA IF EXISTS ${safeSchema} CASCADE
    `);

    // terminate active connections owned by user
    await pool.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE usename = '${dbUser}'
      AND pid <> pg_backend_pid()
    `);

    // drop user
    await pool.query(`
      DROP USER IF EXISTS ${safeUser}
    `);

    console.log("Removed schema, permissions, and user");
  } catch (error) {
    console.error("Error tearing down database schema:", {
      schemaName,
      dbUser,
      error,
    });

    throw error;
  }
};
