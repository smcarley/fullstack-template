### Engineering Guidelines (Aligned to the Tech Stack)

This guide defines coding standards and engineering practices for the TypeScript + Next.js + Tailwind + pnpm monorepo. It complements principles in `memory/constitution.md` and concrete choices in `memory/tech_stack.md`.

## TypeScript & General Coding
- Enable strict TypeScript. No `any` unless isolated and justified. Prefer precise types.
- Public APIs explicitly typed; avoid leaking internal types across package boundaries.
- Use discriminated unions and Zod schemas for runtime validation at boundaries.
- Prefer composition over inheritance; keep functions small with early returns.
- Name things descriptively; avoid abbreviations; functions are verbs, variables are nouns.
- Handle errors explicitly. Never swallow exceptions; include context in error messages.
- Avoid deep nesting (>2–3). Extract helpers.

## Project Structure
- Monorepo with `apps/*` and `packages/*`. Cross-app logic resides in `packages/*`.
- No cross-dependencies between apps. Shared code is promoted into packages.
- Each package exposes a minimal public API via `package.json` exports.

## Next.js (App Router)
- Use Server Components by default; Client Components only when browser APIs/state are required.
- Co-locate route handlers, loaders, and components under the route folder.
- Data fetching: prefer server-side functions; cache where safe with `revalidate` and `cache` helpers.
- Use `headers()`/`cookies()` only in server code. Never access secrets client-side.
- Error handling: route-level error boundaries; standardize problem+json for API errors.

## Styling & UI
- Tailwind first; keep utility classes readable by grouping logically. Extract components when class lists grow.
- Prefer shadcn/ui components for common patterns; compose with Radix primitives where needed. Ensure focus management and ARIA correctness.
- Use design tokens in `packages/ui`; avoid ad hoc colors and spacing.

## Forms & Validation
- Use React Hook Form with Zod schemas. All user input is validated at both client and server.
- Parse/validate env via `@t3-oss/env-nextjs` with Zod. No unvalidated `process.env` access.

## State & Data
- TanStack Query for server cache and background revalidation; colocate query keys in modules.
- Local complex state may use Zustand; keep stores small and domain-focused.
- Avoid global event buses. Prefer explicit props/context boundaries.

## APIs, Contracts, and SSE
- OpenAPI 3.1 lives in `packages/contracts`. Generate types/clients from spec. PRs changing contracts require both FE/BE review.
- Validate all request/response bodies with Zod at the server edge.
- SSE: set proper headers (`text/event-stream`, no-cache, keep-alive) and heartbeat comments. On the client, use `EventSource` with reconnect/backoff.

### Backend service: Express
- Build backend HTTP APIs using Express. Structure routes by domain and mount under a versioned base path.
- Use centralized error handling with `@hapi/boom` and map to standardized problem+json responses.
- Register OpenAPI-derived request/response validators at route boundaries.
- Serve Swagger UI from Express using the generated OpenAPI document for manual testing and exploration.

### Architectural Decision: Frontend proxies all API requests (no client-side CORS)
- All browser requests must target relative endpoints under `/api/*` in the Next.js app; clients must not call external origins directly.
- Implement proxying with Next.js Route Handlers under `app/api/*` that forward to Express backend services using server-side `fetch`.
- Forward and sanitize headers: include `Authorization`, cookies, correlation IDs; add/propagate `X-Request-ID`.
- Treat the proxy as the ingress boundary: do not enable public wildcard CORS on backend services; enforce origin/method allowlists at the proxy when needed.
- SSE proxying: set `Content-Type: text/event-stream`, disable buffering, stream chunks as-is, send heartbeat comments, and abort upstream on client disconnect.
- Prefer route handlers over `next.config.js` rewrites; use rewrites only when handler code is not required.
- Configure timeouts and safe retries (idempotent methods only) with exponential backoff; surface standardized error shapes.

## Testing Strategy
- Unit: Vitest for pure logic; aim for ≥80% coverage on units.
- Component: Testing Library with jest-dom matchers; avoid snapshot-only tests.
- Integration: test Express routes and server logic with supertest/fetch; MSW for mocking upstreams.
- E2E: Playwright on critical flows; run against production-like builds.
- Accessibility: axe checks on key components/routes.

## Git, Commits, and Reviews
- Conventional Commits. Keep PRs small and focused with a clear test plan.
- Require at least one code owner review for touched area; contracts require FE+BE reviewers.
- No direct commits to main; feature branches only. Rebase/merge via PR.

## Linting, Formatting, and CI
- ESLint with typescript-eslint and import/order; Prettier for formatting. No disabling rules project-wide without rationale.
- CI gates: typecheck, lint, unit/integration/E2E, contract checks, security/audit, and size budgets.

## UI Components via shadcn MCP Server
- Component additions should be performed via the shadcn MCP server to ensure provenance and consistency.
- Configure MCP client per official docs:
  - Cursor: add to `.cursor/mcp.json`:
    ```json
    { "mcpServers": { "shadcn": { "command": "npx", "args": ["shadcn@latest", "mcp"] } } }
    ```
  - Alternative clients: `.mcp.json` with the same command/args.
- Configure registries in `components.json` (supports namespaces and auth headers).
- Preferred workflow:
  - Browse/search via MCP prompts; select components from approved registries.
  - Install components using MCP/CLI, generating code into the repo (copy-as-code) rather than opaque packages.
  - Commit generated files with proper review; ensure a11y and design token alignment.
- Troubleshooting and usage reference: see shadcn MCP docs (`https://ui.shadcn.com/docs/mcp`).

## Observability & Security
- Use Sentry in apps and server; include correlation IDs in logs across FE→BE.
- Secrets never in client bundles or VCS. Use environment injection. Audit PII access.

## Performance
- Enforce performance budgets; use Next.js image optimization, code-splitting, and route-level caching.
- Monitor LCP/CLS/TBT; investigate regressions before merge.


