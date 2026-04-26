import { QueryRequest, BuiltQuery } from "@repo/db";
import { buildInsert } from "./builders/insert.builder";
import { buildSelect } from "./builders/select.builder";
import { buildUpdate } from "./builders/update.builder";
import { buildDelete } from "./builders/delete.builder";

export const QueryBuilder = {
  build: (query: QueryRequest): BuiltQuery => {
    switch (query.action) {
      case "insert":
        return buildInsert(query);
      case "select":
        return buildSelect(query);
      case "update":
        return buildUpdate(query);
      case "delete":
        return buildDelete(query);
    }
  },
};
