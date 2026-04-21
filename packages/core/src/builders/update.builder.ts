import { BuiltQuery, QueryRequest } from "@repo/db";

export const buildUpdate = (quety: QueryRequest): BuiltQuery => {
  return {
    sql: "",
    params: [],
  };
};
