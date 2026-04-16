Full System Architecture — myDB (Managed Database Platform)

A multi-tenant database platform built on PostgreSQL using schema-based isolation. It provides instant REST APIs and SDKs for developers to interact with their data, integrated with MuAuth for authentication and user management.

1. High-Level Overview

myDB is a SaaS platform where:

Users authenticate via MuAuth
Users create projects
Each project gets an isolated PostgreSQL schema
Users can create tables and manage data
APIs are auto-generated
SDK is provided for easy integration
Core Flow
User → MuAuth → myDB API → PostgreSQL (Cloud SQL)
├── proj_1 schema
├── proj_2 schema
└── proj_n schema
Core Components
API Gateway (NestJS)
Auth Integration (MuAuth)
Project Service
Schema Manager
Query Engine (core)
Table Service
API Key Service
SDK (client)
PostgreSQL (Cloud SQL)
Cache (Redis - optional later) 2. Architecture (Service-Level)
Client (Frontend / Backend)
↓
SDK / REST API
↓
API Gateway (NestJS)
↓

---

| Project Service |
| Table Service |
| Query Engine |
| Auth Middleware (MuAuth) |

---

        ↓

PostgreSQL (Single DB)
↓
Schemas (per project) 3. Monorepo Structure (NestJS)

Use a monorepo for scalability and code sharing.

mydb/
├── apps/
│ ├── api/ # Main NestJS API
│ │ ├── src/
│ │ │ ├── modules/
│ │ │ │ ├── auth/
│ │ │ │ ├── projects/
│ │ │ │ ├── tables/
│ │ │ │ ├── data/
│ │ │ │ ├── api-keys/
│ │ │ │ └── health/
│ │ │ ├── common/
│ │ │ │ ├── decorators/
│ │ │ │ ├── guards/
│ │ │ │ ├── interceptors/
│ │ │ │ └── filters/
│ │ │ ├── config/
│ │ │ ├── main.ts
│ │ │ └── app.module.ts
│ │ └── tsconfig.json
│
│ ├── worker/ # Background jobs (future)
│ │ └── src/
│
│ └── sdk/ # JS/TS SDK
│ └── src/
│ ├── client.ts
│ ├── query-builder.ts
│ └── index.ts
│
├── packages/
│ ├── db/ # DB connection & helpers
│ │ ├── src/
│ │ │ ├── connection.ts
│ │ │ ├── schema-manager.ts
│ │ │ └── query-runner.ts
│
│ ├── core/ # Query engine (MOST IMPORTANT)
│ │ ├── src/
│ │ │ ├── query-engine.ts
│ │ │ ├── builders/
│ │ │ │ ├── select.builder.ts
│ │ │ │ ├── insert.builder.ts
│ │ │ │ ├── update.builder.ts
│ │ │ │ └── delete.builder.ts
│ │ │ └── validators/
│
│ ├── types/
│ │ └── src/
│
│ ├── utils/
│ │ └── src/
│
│ └── config/
│ └── src/
│
├── infra/
│ ├── docker/
│ ├── kubernetes/
│ └── terraform/
│
├── .env
├── package.json
├── tsconfig.base.json
└── README.md 4. Core Modules (NestJS)
4.1 Auth Module
Integrates with MuAuth
Validates JWT
Extracts user and project context
4.2 Project Module

Responsibilities:

Create project
Generate API key
Create schema
Example Flow
POST /projects
→ validate user (MuAuth)
→ generate projectId
→ CREATE SCHEMA proj_x
→ store metadata
→ return API key
4.3 Table Module

Responsibilities:

Create tables dynamically
Validate schema
Example
POST /tables
{
"tableName": "users",
"columns": [
{ "name": "id", "type": "uuid" },
{ "name": "email", "type": "text" }
]
}
4.4 Data Module (Query API)

This is powered by the query engine.

Example APIs
GET /data/:table
POST /data/:table
PATCH /data/:table
DELETE /data/:table
Flow:
Request → Validate API Key → Resolve Schema → Build Query → Execute → Return 5. Query Engine (Core System)

This is the most important part of your system.

Responsibilities
Convert API requests → SQL
Prevent SQL injection
Support:
select
insert
update
delete
filters
pagination (later)
joins (later)
Example

Input:

{
"table": "users",
"filter": { "email": "test@mail.com" }
}

Output:

SELECT \* FROM proj_123.users WHERE email = $1; 6. Database Design
Main Tables (public schema)
projects

- id
- user_id
- schema_name
- api_key
- created_at

api_keys

- id
- project_id
- key_hash
- created_at
  Tenant Data
  proj_123.users
  proj_123.orders

7. API Design
   Project APIs
   POST /projects
   GET /projects
   Table APIs
   POST /tables
   GET /tables
   Data APIs
   GET /data/:table
   POST /data/:table
   PATCH /data/:table
   DELETE /data/:table
   Headers
   Authorization: Bearer <MuAuth JWT>
   x-api-key: mydb_sk_xxx
8. SDK Design
   Initialization
   createClient({
   apiKey: "mydb_sk_xxx",
   baseUrl: "https://api.mydb.com"
   });
   Usage
   db.from("users").select();
   db.from("users").insert({ email: "test@mail.com" });
   Flow
   SDK → REST API → Query Engine → PostgreSQL
9. Security
   Must implement:
   API key hashing
   JWT validation via MuAuth
   schema isolation
   parameterized queries
   request validation (Zod or class-validator)
   Prevent:
   SQL injection
   cross-schema access
   unrestricted queries
10. Scaling Strategy
    V1
    Single DB
    Multiple schemas
    Single API instance
    V2
    Add Redis caching
    Add read replicas
    V3
    Migrate heavy tenants to separate DB
11. Deployment
    Backend
    NestJS (Docker)
    Deploy on:
    GCP Cloud Run or
    Kubernetes
    Database
    GCP Cloud SQL (PostgreSQL)
12. Development Roadmap
    Phase 1
    Project creation
    Schema creation
    Basic CRUD APIs
    Phase 2
    SDK
    Filters
    Pagination
    Phase 3
    Relations
    Joins
    Performance optimization
13. Key Design Principles
    API-first architecture
    Schema-based multi-tenancy
    Strong abstraction layer (Query Engine)
    Secure by default
    Easy developer experience
    Final Summary

myDB is a developer platform where:

Each project maps to a PostgreSQL schema
APIs are auto-generated
SDK simplifies usage
Query engine abstracts SQL
MuAuth handles authentication
