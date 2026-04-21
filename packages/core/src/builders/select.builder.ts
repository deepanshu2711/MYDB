import { BuiltQuery, QueryRequest } from "@repo/db";

//NOTE: FOR NOW THERE IS NO FILTERS
export const buildSelect = (query: QueryRequest): BuiltQuery => {
  const selectedFields = query.select?.join(", ");
  const sql = `SELECT ${selectedFields} FROM ${query.schema}.${query.table}`;

  return {
    sql,
    params: [],
  };
};

//NOTE:
//SELECT userName, id , age from schema.users where id = $1
