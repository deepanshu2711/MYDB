Phase 1 — Foundation (do these first)

1. Database connection (packages/db)

Everything depends on this. Set up:

- PostgreSQL connection using pg or typeorm/knex (raw pg fits this project better given the dynamic query nature)
- A schema-manager.ts to CREATE SCHEMA and SET search_path

2. Config module (apps/api/src/config/)

- Load env vars: DATABASE_URL, PORT, MUAUTH_SECRET
- Use @nestjs/config with a validation schema (Zod or Joi)

---

Phase 2 — Auth & Projects (core business logic)

3. Auth module

- JWT guard that validates MuAuth tokens
- Extract userId from JWT and attach to request context
- This must exist before anything else — every endpoint needs it

4. Projects module

This is the first real feature. It ties everything together:
POST /projects
→ validate JWT (userId)
→ generate projectId + API key (hash it)
→ CREATE SCHEMA proj\_<id> in PostgreSQL
→ store in public.projects table
→ return raw API key (only time it's shown)
Schema:
CREATE TABLE public.projects (
id UUID PRIMARY KEY,
user_id TEXT NOT NULL,
schema_name TEXT UNIQUE NOT NULL,
api_key_hash TEXT NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);

---

Phase 3 — Query Engine + Tables + Data

5. Query Engine (packages/core)

Build this before the data module. It's the most critical piece:

- Takes { table, filter, data } → returns parameterized SQL + params
- Start with SELECT and INSERT, add UPDATE/DELETE next
- All queries must be parameterized — no string interpolation

6. Tables module

POST /tables → CREATE TABLE proj\_<id>.<name> (columns...)
GET /tables → list tables in the schema

7. Data module (CRUD API)

Uses the query engine:
GET /data/:table → SELECT
POST /data/:table → INSERT
PATCH /data/:table → UPDATE
DELETE /data/:table → DELETE
Auth here uses x-api-key header (not JWT) — resolve project schema from the key.

---

Suggested file creation order

1. packages/db/src/connection.ts
2. packages/db/src/schema-manager.ts
3. apps/api/src/config/
4. apps/api/src/modules/auth/
5. apps/api/src/modules/projects/
6. packages/core/src/query-engine.ts
7. apps/api/src/modules/tables/
8. apps/api/src/modules/data/

---

First thing to actually build right now

Start with packages/db + the Projects module. Once you can:

1. Connect to Postgres
2. Create a schema on POST /projects
3. Return an API key

...the rest of the system has something to build on. Want me to start implementing any of these?
