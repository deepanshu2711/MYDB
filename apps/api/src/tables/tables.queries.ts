export const TABLE_QUERIES = {
  CREATE: (schema: string, table: string, cols: string) =>
    `CREATE TABLE ${schema}.${table} (${cols})`,
  FIND_ALL: `SELECT tablename FROM pg_tables WHERE schemaname = $1`,
  FIND_ONE: `
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns
    WHERE table_schema = $1 AND table_name = $2
    ORDER BY ordinal_position
  `,
  DELETE: (schema: string, table: string) =>
    `DROP TABLE ${schema}.${table}`,
};
