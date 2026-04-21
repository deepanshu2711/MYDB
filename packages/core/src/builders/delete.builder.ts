import { BuiltQuery, QueryRequest } from "@repo/db";

//NOTE: this will delete all rows of a table for now because there is no where clause
export const buildDelete = (query: QueryRequest): BuiltQuery => {
  const sql = `DELETE FROM ${query.schema}.${query.table}`;
  return {
    sql,
    params: [],
  };
};

//NOTE: DELETE FROM schema.users WHERE
