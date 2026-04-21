import { BuiltQuery, QueryRequest } from "@repo/db";

export const buildSelect = (query: QueryRequest): BuiltQuery => {
  const selectedFields = query.select?.length ? query.select.join(", ") : "*";
  let sql = `SELECT ${selectedFields} FROM ${query.schema}.${query.table}`;

  const params = [];

  if (query.filter && Object.keys(query.filter).length != 0) {
    const whereCondition = Object.keys(query.filter)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(" AND ");
    sql = sql + ` WHERE ${whereCondition}`;
    params.push(...Object.values(query.filter));
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
