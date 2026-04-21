import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env["DATABASE_URL"],
  ssl: {
    rejectUnauthorized: false,
  },
});

export { Pool };
export { initializeDatabaseSchema } from "./schema-manager";

export type { QueryRequest, QueryAction, BuiltQuery } from "./types";
