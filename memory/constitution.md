# Full-Stack Web Monorepo Constitution

## Core Principles

### I. Monorepo, Modular, and Contract-Centric
- Use a single monorepo with clear boundaries: `apps/frontend`, `apps/backend`, `packages/*` (shared libraries: types, utils, UI, API clients, schema). [Both]
- All cross-layer communication is defined by explicit contracts (OpenAPI/GraphQL/JSON Schema/Protobuf). Contracts live in `packages/contracts` and are the single source of truth. [Both]
- Code is modular, cohesive, and independently testable; avoid cyclic dependencies. Public APIs of shared packages are stable and versioned. [Both]
- Frontend consumes generated clients from contracts; backend generates server stubs/validators from the same source. [Frontend/Backend]

### II. API-First and Backward Compatibility
- Design APIs from the consumer’s perspective; define/approve contract before implementation. [Both]
- Backward compatibility is the default. Breaking API or shared package changes require a migration plan, a deprecation period, and a version bump. [Backend/Both]
- Validation is performed at boundaries: schema validation on requests/responses (backend) and type-safe usage at compile time (frontend). [Frontend/Backend]

### III. Test-First Quality (NON-NEGOTIABLE)
- Red-Green-Refactor: write tests before implementation for new features and bug fixes. [Both]
- Minimum coverage targets: unit (≥80%), integration on critical paths, and E2E per user-critical flows. [Both]
- Frontend: unit/component tests (e.g., React Testing Library), visual regression, and E2E (Playwright/Cypress). [Frontend]
- Backend: unit tests, contract tests, repository/service tests against ephemeral DB, and API integration tests. [Backend]

### IV. Integration and End-to-End Confidence
- Contract tests gate releases: generated clients must pass against backend mocks and live endpoints. [Both]
- Representative test data and seed scripts ensure realistic flows in CI and local dev. [Both]
- E2E tests run against production-like builds and infrastructure primitives (feature flags, auth, CDN). [Both]

### V. Observability, Reliability, and Performance by Default
- Structured logs with correlation IDs, metrics, and distributed tracing propagate across FE→BE. [Both]
- SLOs/SLA: define availability, latency, and error budgets; alert on breach. [Backend]
- Frontend performance budgets (LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms) with build-time and runtime monitoring. [Frontend]
- Backend latency budgets for P95/P99 on key endpoints; use profiling and APM. [Backend]

### VI. Security, Privacy, and Compliance
- Principle of least privilege, secure defaults, and shift-left security in CI. [Both]
- AuthN/AuthZ standardized; tokens validated server-side; sensitive logic never trusted to the client. [Backend]
- Input/output validation, output encoding, and CSRF/CORS/CSP configured appropriately. [Frontend/Backend]
- Secrets via a vault/KMS; never committed. PII access is audited, minimized, and encrypted at rest/in transit. [Backend]

### VII. Simplicity, Consistency, and DX
- Prefer boring, proven tech; minimize bespoke frameworks. [Both]
- One way to do things: shared linters, formatters, tsconfig, commit style, and scripts. [Both]
- Developer ergonomics: fast feedback (hot reload, incremental builds), seed data, and make targets. [Both]

## Additional Constraints, Standards, and Requirements

### Technology and Tooling Baseline
- Language and runtime: defined in `memory/tech_stack.md`; server uses an LTS runtime and strict type-safety. [Both/Backend]
- Package management and workspaces: as defined in `memory/tech_stack.md`; monorepo layout `apps/*` and `packages/*`. [Both]
- Build systems: per `memory/tech_stack.md`; production builds are reproducible, optimized, and cacheable. [Frontend/Backend]
- Formatting/Linting: formatter and linter with shared configs in `packages/config/*`. [Both]

- Contracts, Types, and Shared Packages
- Contracts in `packages/contracts` (format per `memory/tech_stack.md`). Generate backend validators/types and frontend clients/hooks from the single source of truth. [Both]
- Shared UI components in `packages/ui` with theme tokens and accessibility baked in. [Frontend]
- Shared runtime libs in `packages/utils`; no side effects; strict semver and changelogs. [Both]

- API and Data Standards
- Contracted APIs are mandated per `memory/tech_stack.md` (one primary style). Mixing styles requires clear justification and boundaries. [Backend]
- Error model standardized and documented; never leak internals. [Backend]
- Pagination, filtering, and sorting conventions documented and consistent. [Backend]
- Idempotency for unsafe operations where applicable; retries are safe. [Backend]

### Database, Migrations, and Data Lifecycle
- Migrations are versioned, reversible, and run via CI/CD gates. [Backend]
- Local/CI use ephemeral databases seeded via `scripts/seed`. [Backend]
- Data retention and deletion policies documented; PII is minimized and encrypted. [Backend]

### Security Requirements
- Secrets: use environment injection and a secrets manager; `.env` files are local-only and gitignored. [Backend]
- TLS everywhere; HSTS and secure cookies in production. [Backend]
- Frontend security headers (CSP with nonces/hashes, SRI for third-parties). [Frontend]
- Dependency scanning, SAST, DAST, and license checks required in CI. [Both]

### Performance and Caching
- Frontend: code-splitting, prefetching, image optimization, HTTP/2/3, and CDN caching. [Frontend]
- Backend: HTTP caching (ETag/Last-Modified), application caches with clear invalidation policies. [Backend]
- Performance budgets enforced in CI (bundle size, route-level timings). [Both]

### Accessibility and Internationalization
- WCAG 2.2 AA baseline; automated a11y checks in CI and manual QA on flows. [Frontend]
- Keyboard navigation, focus management, and ARIA patterns built into `packages/ui`. [Frontend]
- i18n: message catalogs versioned; locale fallback strategy; RTL support where applicable. [Frontend]

### CI/CD, Environments, and Release Hygiene
- CI runs: typecheck, lint, unit, integration, contract tests, E2E (gated), security scans. [Both]
- Environments: dev, staging, prod. Staging mirrors prod topology; feature flags gate risky changes. [Both]
- Releases are automated, reproducible, and traceable; artifacts are immutable. [Both]
- Blue/green or canary deploys for backend; frontend uses atomic deploys with instant rollback. [Frontend/Backend]

### Configuration and Operational Standards
- Twelve-Factor alignment: config via env; logs to stdout/stderr; stateless services. [Backend]
- Health, readiness, and liveness endpoints required; expose build/version metadata. [Backend]
- Runbooks and dashboards exist for all critical services and user journeys. [Backend/Frontend]

## Development Workflow, Review Process, and Quality Gates

### Branching and PRs
- Trunk-based with short-lived branches. Conventional Commits for messages (feat, fix, chore, refactor, docs). [Both]
- Every PR must include: scope, test plan, screenshots (FE), and migration notes (BE). [Frontend/Backend]
- Required reviews: at least one code owner of touched area; contracts require both FE and BE reviewers. [Both]

### Required Checks (must pass before merge)
- Typecheck, ESLint/Prettier, unit tests, integration tests, contract tests, security scan, and size/perf budgets. [Both]
- Frontend PRs: a11y checks and visual regression baseline updates. [Frontend]
- Backend PRs: API compat checks against previous contract versions; DB migration lints/dry-runs. [Backend]

### Releases, Versioning, and Deprecations
- SemVer for packages; backend services follow MAJOR.MINOR.PATCH. [Both/Backend]
- Breaking changes require an RFC, deprecation window, and migration guide with sample diffs. [Both]
- Feature flags for progressive delivery; remove flags within two release cycles after full rollout. [Both]

### Documentation and Decision Records
- Each package/app has a README with purpose, public API, scripts, and examples. [Both]
- Architecture Decision Records (ADRs) are required for significant changes and live in `docs/adrs`. [Both]
- Public contracts are documented and published to an internal developer portal. [Both]

### Incident Readiness and Operations
- Error budgets and on-call rotations defined; playbooks cover detection, triage, rollback, and comms. [Backend]
- Post-incident reviews produce action items tracked to completion and reflected in tests/alerts. [Both]

## Governance

- This constitution supersedes other team practices where conflicts arise. [Both]
- Amendments require: written proposal (RFC), cross-functional review (FE/BE/Security), migration plan, and owner sign-off. [Both]
- Exceptions are time-bounded, documented, and require approval from code owners and system owners. [Both]
- Compliance is enforced via CI gates, CODEOWNERS, and release workflows; non-compliant PRs cannot merge. [Both]

**Version**: 1.0.0 | **Ratified**: 2025-09-08 | **Last Amended**: 2025-09-08