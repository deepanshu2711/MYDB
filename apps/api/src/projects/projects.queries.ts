export const PROJECT_QUERIES = {
  INSERT:
    'INSERT INTO projects(name, password, schema_name, global_user_id) VALUES($1, $2, $3, $4) RETURNING *',
  FIND_ALL: 'SELECT * FROM projects WHERE global_user_id = $1',
  FIND_BY_ID: 'SELECT * FROM projects WHERE id = $1 AND global_user_id = $2',
  UPDATE:
    'UPDATE projects SET name = $1 WHERE id = $2 AND global_user_id = $3 RETURNING *',
  DELETE: 'DELETE FROM projects WHERE id = $1 AND global_user_id = $2',
};
