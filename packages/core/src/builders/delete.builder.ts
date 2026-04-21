import { BuiltQuery, QueryRequest } from "@repo/db";

export const buildDelete = (query: QueryRequest): BuiltQuery => {
  return {
    sql: "",
    params: [],
  };
};
