import { pool } from ".";

export const schemaManager = async (schemaName: string) => {
  const safeName = `"${schemaName.replace(/"/g, '""')}"`;
  await pool.query(`CREATE SCHEMA ${safeName}`);
};
