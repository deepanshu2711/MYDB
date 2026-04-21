import { BuiltQuery, QueryRequest } from "@repo/db";

//NOTE: this will delete all rows of a table for now because there is no where clause
export const buildDelete = (query: QueryRequest): BuiltQuery => {
  let sql = `DELETE FROM ${query.schema}.${query.table}`;

  const params = [];

  if (query.filter && Object.keys(query.filter).length > 0) {
    const whereCondition = Object.keys(query.filter)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(" AND ");

    sql += ` WHERE ${whereCondition}`;
    params.push(...Object.values(query.filter));
  }

  return {
    sql,
    params,
  };
};

//NOTE: DELETE FROM schema.users WHERE id = 1
