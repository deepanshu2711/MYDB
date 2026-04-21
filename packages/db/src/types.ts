export type QueryAction = "select" | "insert" | "update" | "delete";

export interface QueryRequest {
  schema: string; // from api key middleware
  table: string; // from route param
  action: QueryAction;

  select?: string[];
  data?: Record<string, any>;
  filter?: Record<string, any>;
  order?: {
    column: string;
    direction: "asc" | "desc";
  }[];

  limit?: number;
  offset?: number;

  returning?: boolean;
}

export interface BuiltQuery {
  sql: string;
  params: any[];
}
