export const PROJECT_QUERIES = {
  INSERT:
    'INSERT INTO projects(name, password, schema_name) VALUES($1, $2, $3) RETURNING *',
  FIND_ALL: 'SELECT * FROM projects',
  FIND_BY_ID: 'SELECT * FROM projects WHERE id = $1',
  UPDATE: 'UPDATE projects SET name = $1 WHERE id = $2 RETURNING *',
  DELETE: 'DELETE FROM projects WHERE id = $1',
};
