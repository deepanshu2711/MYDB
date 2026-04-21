import { BuiltQuery, QueryRequest } from "@repo/db";

export const buildInsert = (quety: QueryRequest): BuiltQuery => {
  return {
    sql: "",
    params: [],
  };
};
