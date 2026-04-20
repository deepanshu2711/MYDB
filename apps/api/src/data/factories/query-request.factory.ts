import type { QueryRequest } from '@repo/db';

export const makeInsertQuery = (
  schema: string,
  table: string,
  data: Record<string, any>,
): QueryRequest => {
  return {
    schema,
    table,
    action: 'insert',
    data,
    returning: true,
  };
};

export const makeSelectQuery = (
  schema: string,
  table: string,
  options: Partial<QueryRequest>,
): QueryRequest => {
  return {
    schema,
    table,
    action: 'select',
    select: options.select ?? [],
    filter: options.filter ?? {},
    order: options.order ?? [],
    limit: options.limit ?? 25,
    offset: options.offset ?? 0,
  };
};

export function makeUpdateQuery(
  schema: string,
  table: string,
  data: Record<string, any>,
  filter: Record<string, any>,
): QueryRequest {
  return {
    schema,
    table,
    action: 'update',
    data,
    filter,
    returning: true,
  };
}

export function makeDeleteQuery(
  schema: string,
  table: string,
  filter: Record<string, any>,
): QueryRequest {
  return {
    schema,
    table,
    action: 'delete',
    filter,
    returning: true,
  };
}
