import { BuiltQuery, QueryRequest } from "@repo/db";

export const buildInsert = (query: QueryRequest): BuiltQuery => {
  const dataKeys = Object.keys(query.data ?? {});
  const dataValues = Object.values(query.data ?? {});

  const columns = dataKeys.join(", ");
  const valuePlaceholders = dataValues
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  const sql = `INSERT INTO ${query.schema}.${query.table} (${columns}) values (${valuePlaceholders})`;

  return {
    sql,
    params: dataValues,
  };
};

//NOTE:
//INSERT INTO schema.users (userName, age, id) values ()
