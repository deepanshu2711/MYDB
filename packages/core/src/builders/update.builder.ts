import { BuiltQuery, QueryRequest } from "@repo/db";
import { operatorMap } from "../helpers";

export const buildUpdate = (query: QueryRequest): BuiltQuery => {
  const dataKeys = Object.keys(query.data || {});
  const dataValues = Object.values(query.data || {});

  const setClause = dataKeys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  let sql = `UPDATE ${query.schema}.${query.table} SET ${setClause}`;

  const params = [...dataValues];

  if (query.filter && Object.keys(query.filter).length > 0) {
    const conditions = [];
    for (const [column, ops] of Object.entries(query.filter)) {
      for (const [op, value] of Object.entries(ops)) {
        if (op === "in") {
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error(`IN operator requires non-empty array`);
          }
          const placeHolders = value.map(
            (_, index) => `$${params.length + index + 1}`,
          );

          params.push(...value);
          conditions.push(`${column} IN (${placeHolders.join(", ")})`);
        } else {
          const sqlOp = operatorMap[op];
          if (!sqlOp) {
            throw new Error(`Unsupported operator: ${op}`);
          }

          params.push(value);
          conditions.push(`${column} ${sqlOp} $${params.length}`);
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

//NOTE:
//UPDATE schema.users SET name = 'saini', age='25' where id =2
//UPDATE schema.users SET name = 'saini', age='25' where id =2
