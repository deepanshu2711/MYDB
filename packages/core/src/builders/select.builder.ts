import { BuiltQuery, QueryRequest } from "@repo/db";
import { operatorMap } from "../helpers";

export const buildSelect = (query: QueryRequest): BuiltQuery => {
  const selectedFields = query.select?.length ? query.select.join(", ") : "*";
  let sql = `SELECT ${selectedFields} FROM ${query.schema}.${query.table}`;

  let paramIndex = 1;
  const params: any[] = [];

  if (query.filter && Object.keys(query.filter).length !== 0) {
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

  if (query.order && query.order.length > 0) {
    const orderClause = query.order
      .map((o) => `${o.column} ${o.direction.toUpperCase()}`)
      .join(", ");

    sql += ` ORDER BY ${orderClause}`;
  }

  if (query.limit !== undefined) {
    sql += ` LIMIT ${query.limit}`;
  }

  if (query.offset !== undefined) {
    sql += ` OFFSET ${query.offset}`;
  }

  return {
    sql,
    params,
  };
};

//NOTE:
//SELECT userName, id , age from schema.users where id = $1
//SELECT userName, id , age from schema.users where userName = $1
//SELECT id, name FROM public.users WHERE status = $1 ORDER BY id DESC LIMIT 10 OFFSET 20
//filter: {
//   age: { gt: 25 },
//   id: { in: [1, 2, 3] }
// }
