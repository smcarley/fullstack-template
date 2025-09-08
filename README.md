# Specify Test 1

A modern full-stack web monorepo demonstrating enterprise-grade development practices and architectural patterns for building scalable, maintainable web applications.

## 🚀 Overview

This project serves as a comprehensive reference implementation showcasing:

- **Monorepo Architecture**: Unified codebase with clear boundaries between frontend, backend, and shared packages
- **Contract-First Development**: OpenAPI specifications as the single source of truth for API contracts
- **Quality Assurance**: Comprehensive testing strategies, CI/CD pipelines, and observability
- **Developer Experience**: Structured workflows, automated tooling, and clear documentation

## 📁 Project Structure

```
/
├── apps/
│   ├── frontend/          # Next.js application (App Router)
│   └── backend/           # Express.js API server
├── packages/              # Shared packages and libraries
├── memory/                # Project constitution and guidelines
├── scripts/               # Automation and utility scripts
└── templates/             # Development templates and boilerplates
```

## 🛠️ Technology Stack

### Core Infrastructure
- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js LTS
- **Monorepo**: pnpm workspaces with Turborepo orchestration
- **Package Manager**: pnpm

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query + React state
- **Forms**: React Hook Form + Zod validation

### Backend
- **Framework**: Express.js
- **API Specification**: OpenAPI 3.1
- **Validation**: Zod schemas
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Authorization**: CASL ability-based access control

### Quality & Testing
- **Unit Testing**: Vitest
- **Integration Testing**: Playwright (E2E) + MSW (API mocking)
- **Accessibility**: axe-core automated checks
- **Performance**: Lighthouse CI with budgets

### Observability & Security
- **Error Tracking**: Sentry
- **Logging**: Pino with structured logging
- **Security**: Helmet, CSP, dependency scanning
- **Performance Monitoring**: Core Web Vitals tracking

## 📋 Development Workflow

### Branching Strategy
Feature branches follow the pattern: `###-feature-description`
- `001-user-authentication`
- `002-dashboard-layout`
- `003-api-integration`

### Required Documentation
Each feature requires:
- **Specification** (`specs/###-feature/spec.md`)
- **Implementation Plan** (`specs/###-feature/plan.md`)
- **Task Breakdown** (`specs/###-feature/tasks.md`)
- **API Contracts** (`specs/###-feature/contracts/`)

### Quality Gates
All changes must pass:
- TypeScript compilation
- ESLint/Prettier formatting
- Unit test coverage (≥80%)
- Integration tests
- Accessibility checks
- Performance budgets
- Security scanning

## 🚀 Getting Started

### Prerequisites
- Node.js ≥18 (LTS)
- pnpm package manager
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install

# Start development environment
pnpm run dev
```

### Available Scripts
```bash
# Development
pnpm run dev          # Start all apps in development mode
pnpm run build        # Build all apps for production
pnpm run start        # Start production builds

# Quality Assurance
pnpm run typecheck    # TypeScript compilation check
pnpm run lint         # ESLint and Prettier checks
pnpm test             # Run test suites
pnpm test:e2e        # Run end-to-end tests

# Feature Development
pnpm run setup-plan   # Initialize feature documentation structure
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` files in each app directory:

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

**Backend** (`.env.local`):
```env
PORT=4000
DATABASE_URL=postgresql://localhost:5432/specify_test1
JWT_SECRET=your-jwt-secret-here
```

### Database Setup (TBC)
```bash
# Install PostgreSQL and create database
createdb <name>

# Run migrations
cd apps/backend
pnpm prisma migrate dev

# Seed database (if available)
pnpm prisma db seed
```

## 📚 Documentation

- **[Constitution](./memory/constitution.md)**: Core principles and development standards
- **[Tech Stack](./memory/tech_stack.md)**: Detailed technology choices and rationale
- **[Engineering Guidelines](./memory/engineering_guidelines.md)**: Development best practices
- **[Build Guidelines](./memory/build_guidelines.md)**: Build and deployment processes

## 🤝 Contributing

1. **Feature Development**:
   ```bash
   # Create feature branch
   git checkout -b 001-my-feature

   # Setup documentation structure
   ./scripts/setup-plan.sh

   # Follow the implementation plan
   ```

2. **Code Quality**:
   - Write tests before implementation
   - Ensure TypeScript strict mode compliance
   - Follow conventional commit messages
   - Update documentation as needed

3. **Pull Request Process**:
   - All checks must pass
   - Require code review from relevant owners
   - Include test plan and screenshots
   - Update contracts for API changes

## 📈 Performance & Quality

### Performance Budgets
- **Frontend**: LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms
- **Backend**: P95 latency budgets per endpoint
- **Bundle Size**: Monitored and optimized

### Test Coverage Targets
- **Unit Tests**: ≥80% coverage
- **Integration Tests**: Critical user paths
- **E2E Tests**: Core user journeys
- **Accessibility**: WCAG 2.2 AA compliance

## 🔒 Security

- **Dependency Scanning**: Automated vulnerability checks
- **Secret Management**: Environment-based configuration
- **CSP Headers**: Strict Content Security Policy
- **Authentication**: Secure token-based auth with refresh
- **Authorization**: Role-based and resource-level permissions

## 📊 Monitoring & Observability

- **Error Tracking**: Sentry integration for both frontend and backend
- **Performance Monitoring**: Real user monitoring (RUM)
- **Logging**: Structured logging with correlation IDs
- **Metrics**: Custom business metrics and system health indicators

## 🚀 Deployment

### Frontend
- **Platform**: Vercel (recommended)
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`

### Backend
- **Platform**: Docker containers or serverless
- **Build Process**: TypeScript compilation
- **Runtime**: Node.js LTS in production

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For questions and support:
- Check the [Constitution](./memory/constitution.md) for development guidelines
- Review [Engineering Guidelines](./memory/engineering_guidelines.md) for best practices
- Create issues for bugs or feature requests
