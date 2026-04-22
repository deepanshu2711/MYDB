import { BuiltQuery, QueryRequest } from "@repo/db";
import { operatorMap } from "../helpers";

//NOTE: this will delete all rows of a table for now because there is no where clause
export const buildDelete = (query: QueryRequest): BuiltQuery => {
  let sql = `DELETE FROM ${query.schema}.${query.table}`;

  const params = [];
  let paramIndex = 1;

  if (query.filter && Object.keys(query.filter).length > 0) {
    const conditions: string[] = [];

    for (const [column, ops] of Object.entries(query.filter)) {
      for (const [op, value] of Object.entries(ops as any)) {
        if (op === "in") {
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error(`IN operator requires non-empty array`);
          }

          const placeholders = value.map(() => `$${paramIndex++}`);
          params.push(...value);
          conditions.push(`${column} IN (${placeholders.join(", ")})`);
        } else {
          const sqlOp = operatorMap[op];
          if (!sqlOp) {
            throw new Error(`Unsupported operator: ${op}`);
          }

          params.push(value);
          conditions.push(`${column} ${sqlOp} $${paramIndex++}`);
        }
      }
    }
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  return {
    sql,
    params,
  };
};

//NOTE: DELETE FROM schema.users WHERE id = 1
