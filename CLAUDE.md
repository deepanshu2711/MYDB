# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Turborepo monorepo containing:

- `apps/api` — NestJS backend API (runs on port `5082` by default, configurable via `PORT` env var)
- `packages/ui` — Shared React component library (`@repo/ui`)
- `packages/eslint-config` — Shared ESLint config (`@repo/eslint-config`)
- `packages/typescript-config` — Shared TypeScript configs (`@repo/typescript-config`)

Package manager: **npm** (v10.8.2). Node >= 18 required.

## Commands

### Root (all workspaces via Turbo)

```sh
npm run dev          # Start all apps in watch mode
npm run build        # Build all apps and packages
npm run lint         # Lint all workspaces
npm run check-types  # Type-check all workspaces
npm run format       # Prettier-format all TS/TSX/MD files
```

Use `--filter` to target a specific app/package:

```sh
npx turbo dev --filter=api
npx turbo build --filter=api
```

### NestJS API (`apps/api`)

```sh
# From apps/api
npm run dev              # watch mode (nest start --watch)
npm run start:debug      # debug + watch mode
npm run start:prod       # run compiled output

npm run test             # unit tests (Jest)
npm run test:watch       # unit tests in watch mode
npm run test:cov         # unit tests with coverage
npm run test:e2e         # end-to-end tests (test/jest-e2e.json)
```

Run a single test file:
```sh
npx jest src/app.controller.spec.ts
```

### Shared UI package (`packages/ui`)

```sh
# From packages/ui
npm run generate:component   # scaffold a new React component via turbo gen
npm run check-types          # tsc --noEmit
```

## Architecture

### Turbo task graph

`build` and `check-types` tasks depend on `^build` / `^check-types` — meaning shared packages must build/type-check before apps. `dev` runs persistently with caching disabled.

### NestJS API structure

Follows standard NestJS module conventions:

- `src/main.ts` — bootstraps the Nest app
- `src/app.module.ts` — root module; add feature modules here via `imports`
- `src/app.controller.ts` / `src/app.service.ts` — root controller and service

New features should be added as NestJS modules (`nest generate module <name>`) and imported into `AppModule`.

### Shared packages

`@repo/ui` exports components directly from `src/` (no build step — consumed as TypeScript source). `@repo/eslint-config` and `@repo/typescript-config` are dev-only shared configs referenced by `"*"` workspace references.
