import { BuiltQuery, QueryRequest } from "@repo/db";

//NOTE: this will update all rows of a table because there is no where clause for now
export const buildUpdate = (query: QueryRequest): BuiltQuery => {
  const dataKeys = Object.keys(query.data || {});
  const dataValues = Object.values(query.data || {});

  const setClause = dataKeys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const sql = `UPDATE ${query.schema}.${query.table} SET ${setClause}`;

  return {
    sql,
    params: dataValues,
  };
};

//NOTE:
//UPDATE schema.users SET name = 'saini', age='25' where id =2
