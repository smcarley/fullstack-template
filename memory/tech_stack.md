### Tech Stack Catalog (Stable, Well-Documented, Works Together)

This document defines the concrete technologies chosen for our monorepo. The constitution describes principles and guardrails; this file enumerates specific tools that can change over time without modifying the constitution.

## Core Languages, Runtimes, Monorepo
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js LTS (active even-numbered releases)
- **Monorepo**: pnpm workspaces with Turborepo for task orchestration
- **Directory layout**: `apps/*`, `packages/*`, `packages/contracts`

## Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + Tailwind Plugins (forms, typography)
- **UI components**: shadcn/ui (Radix-based, copy-as-code) as the default component library
- **Headless primitives**: Radix UI primitives for accessibility and composability
- **State & data fetching**: TanStack Query for server cache + React state (Context/useState); Zustand for local complex state when needed
- **Forms & validation**: React Hook Form + Zod + @hookform/resolvers/zod
- **i18n**: next-intl (or Lingui) with static analysis and extraction
- **SSE client**: native `EventSource` in browsers; server parsing via `eventsource-parser` when needed

## Backend/APIs
- **API surface**: Next.js Route Handlers (Node runtime); background jobs via server actions or queue workers (see below)
- **Transport styles**: HTTP/REST with OpenAPI; Server-Sent Events for push
- **Contracts**: OpenAPI 3.1 single source of truth in `packages/contracts`
  - Authoring/generation: `openapi-typescript` (client types), `zod-openapi` or `zod-to-openapi` for schema from Zod where helpful
  - Request/response validation: Zod on server boundaries
- **Server utilities**: `zod`, `@hapi/boom` (HTTP errors), `@sentry/node` (observability)
- **Authentication**: Auth.js (NextAuth) with JWT/session strategy; `@auth/core` adapters as needed
- **Authorization**: `@casl/ability` (policy-driven access control)
- **SSE server**: native `ReadableStream`/Node `stream` with proper headers; `eventsource-parser` for robustness

## Data & Persistence
- **Database**: PostgreSQL (primary)
- **ORM**: Prisma (strict types, migrations)
- **Caching**: Redis (optional, via Upstash or self-managed)
- **Migrations**: Prisma Migrate (CI gated)
- **Seeds/fixtures**: Prisma seed scripts under `scripts/seed`

## Shared Packages
- `packages/ui`: cross-app components (accessible by default)
- `packages/utils`: runtime utilities (side-effect free)
- `packages/config`: shared ESLint/Prettier/TS configs
- `packages/contracts`: OpenAPI spec and generation scripts

## Testing & QA
- **Unit & Integration (Node/Browser)**: Vitest
- **React components**: @testing-library/react + @testing-library/jest-dom
- **Network mocking**: MSW (node and browser)
- **E2E**: Playwright (headed/headless, trace on failures)
- **API integration**: supertest (for Route Handlers) and/or fetch + testcontainers when spinning up Postgres/Redis for real
- **Accessibility checks**: axe-core via jest-axe in component tests; Playwright a11y scans on key routes

## Tooling & Productivity
- **Linting/formatting**: ESLint (typescript-eslint, import plugin) + Prettier
- **Build (packages)**: tsup for libraries; `next build` for apps
- **Git hooks**: Husky + lint-staged
- **Commits**: commitlint (Conventional Commits)
- **Env management**: `@t3-oss/env-nextjs` (Zod-validated env), dotenv for local
- **Task runner**: Turborepo with remote cache (optional)
- **shadcn tooling**: shadcn CLI and MCP server for AI-assisted component install;
  - Registry via `components.json`
  - MCP config via `.cursor/mcp.json` (Cursor) or `.mcp.json` (other clients)

## Observability & Security
- **Error tracking & performance**: Sentry (browser + server)
- **Logging**: pino/pino-pretty (server), structured logging across boundaries
- **HTTP security**: helmet (where applicable) + strict CSP via Next.js headers
- **Dependency health**: Renovate bot; `pnpm audit` gated in CI with allowlist when needed

## CI/CD
- **CI**: GitHub Actions with matrix for Node LTS, caching pnpm store and Turbo
- **Artifacts**: Next.js output for apps; published npm tarballs for packages (internal registry)
- **Deployment**: Vercel for Next.js apps; managed Postgres/Redis

## Rationale & Compatibility Notes
- These choices prioritize stability, docs, and strong TypeScript support.
- OpenAPI centralizes contracts while Zod provides runtime safety; generators keep FE/BE in sync.
- Vitest + Playwright offer fast, modern testing aligned with Vite/Next ecosystems.
- shadcn/ui provides accessible, Tailwind-first components built on Radix; MCP enables consistent, audited component installation workflows.


