import { BuiltQuery, QueryRequest } from "@repo/db";

export const buildUpdate = (query: QueryRequest): BuiltQuery => {
  const dataKeys = Object.keys(query.data || {});
  const dataValues = Object.values(query.data || {});

  const setClause = dataKeys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  let sql = `UPDATE ${query.schema}.${query.table} SET ${setClause}`;

  const params = [...dataValues];

  if (query.filter && Object.keys(query.filter).length > 0) {
    const whereCondition = Object.keys(query.filter)
      .map((key, index) => `${key} = $${index + dataKeys.length + 1}`)
      .join(" AND ");

    sql += ` WHERE ${whereCondition}`;
    params.push(...Object.values(query.filter));
  }

  return {
    sql,
    params,
  };
};

//NOTE:
//UPDATE schema.users SET name = 'saini', age='25' where id =2
