### Build and Test Command Guide (Robust, Monorepo-Aware)

These commands are designed for pnpm workspaces with `apps/*` and `packages/*`. They resolve paths from any working directory by using repository-root discovery and explicit `--filter` flags. Use pnpm over npm if there are any commands that need to be run not listed.

## Assumptions
- Node.js LTS installed; pnpm installed globally
- Turborepo configured for task orchestration (optional but recommended)
- Apps: `apps/web` (Next.js). Adjust filters if your app names differ.

## Repo Root Helper
If using scripts, prefer running via `pnpm -w` (workspace root). When invoking directly from arbitrary folders, prepend `pnpm -w` and use `--filter` to target a package.

## Install
From any directory:
```bash
pnpm -w install --frozen-lockfile
```

## Typecheck
Entire workspace:
```bash
pnpm -w run typecheck
```
Single app (Next.js web):
```bash
pnpm -w --filter ./apps/web run typecheck
```

## Lint
Entire workspace:
```bash
pnpm -w run lint
```
Auto-fix (where safe):
```bash
pnpm -w run lint:fix
```

## Format
Check formatting:
```bash
pnpm -w run format:check
```
Write formatting:
```bash
pnpm -w run format
```

## Build
All packages and apps:
```bash
pnpm -w run build
```
Just the Next.js app:
```bash
pnpm -w --filter ./apps/web run build
```

## Develop (local)
Start Next.js app on default port:
```bash
pnpm -w --filter ./apps/web run dev
```

## Tests
Unit/Integration (Vitest) across workspace:
```bash
pnpm -w run test
```
Watch mode for local dev:
```bash
pnpm -w run test:watch
```
E2E (Playwright):
```bash
pnpm -w run test:e2e
```
Update Playwright browsers (first run or upgrade):
```bash
pnpm -w exec playwright install --with-deps
```

## Contract Generation
OpenAPI types/clients (if applicable):
```bash
pnpm -w run contracts:gen
```

## CI Pipeline (suggested sequence)
```bash
pnpm -w install --frozen-lockfile
pnpm -w run contracts:gen
pnpm -w run typecheck
pnpm -w run lint
pnpm -w run test
pnpm -w --filter ./apps/web run build
pnpm -w run test:e2e
```

## Expected package.json scripts (workspace root)
Ensure the root `package.json` defines:
```json
{
  "scripts": {
    "typecheck": "turbo run typecheck --continue",
    "lint": "turbo run lint --continue",
    "lint:fix": "turbo run lint:fix --continue",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "build": "turbo run build --continue",
    "test": "turbo run test --continue",
    "test:watch": "turbo run test:watch --continue",
    "test:e2e": "turbo run test:e2e --continue",
    "contracts:gen": "turbo run contracts:gen --continue"
  }
}
```

## App-level scripts (apps/web)
In `apps/web/package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```


