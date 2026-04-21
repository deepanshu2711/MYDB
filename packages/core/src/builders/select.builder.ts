import { BuiltQuery, QueryRequest } from "@repo/db";

export const buildSelect = (quety: QueryRequest): BuiltQuery => {
  return {
    sql: "",
    params: [],
  };
};
