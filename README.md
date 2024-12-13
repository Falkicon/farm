# FARM Stack Boilerplate

Modern web application boilerplate combining Fastify, API-first design, Lit Web Components, and MongoDB.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/Node.js-22.0%2B-brightgreen)](https://nodejs.org/)
[![Documentation](https://img.shields.io/badge/docs-MkDocs-blue.svg)](https://falkicon.github.io/farm)

## Quick Start

### Prerequisites
- Node.js 22.0 or higher
- npm 10.0 or higher
- Git
- Python 3.x (for documentation)
- Git Bash (recommended) or another terminal

### Installation
```bash
# Clone repository
git clone https://github.com/Falkicon/farm.git
cd farm

# Install dependencies
npm install

# Start development servers
npm run dev
```

### Development Workflow

#### 1. Code Quality
```bash
# Run linting
npm run lint

# Type checking
npm run typecheck

# Run tests
npm run test
```

#### 2. Development Servers
```bash
# Start all development servers
npm run dev

# Start individual servers
npm run dev:frontend    # Frontend on port 3000
npm run dev:backend     # Backend on port 8000
npm run storybook       # Storybook on port 6006
```

#### 3. Testing
```bash
# Run test suite
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
npm run test:ui        # Run component tests

# Coverage report
npm run test:coverage
```

#### 4. Building
```bash
# Production build
npm run build

# Preview production build
npm run preview
```

#### 5. Documentation

Our documentation system consists of two complementary parts:

### 1. Project Documentation (MkDocs)

Project-wide documentation, guides, and architecture overview.

```bash
# Start documentation server
npm run docs:serve     # http://localhost:8000

# Build documentation
npm run docs:build     # Outputs to site/

# Deploy to GitHub Pages
npm run docs:deploy

# Clean documentation
npm run docs:clean
```

### 2. API Documentation (TypeDoc)

Automatically generated API documentation from TypeScript source code.

```bash
# Generate and serve API docs
npm run docs:api:serve # http://localhost:8001

# Build API documentation
npm run docs:api:build # Outputs to docs/api/

# Clean API documentation
npm run docs:api:clean
```

### Documentation Structure

1. **Project Documentation** (`http://localhost:8000`):
   - Getting Started Guide
   - Architecture Overview
   - Development Guidelines
   - Component Documentation
   - Specifications
   - Contributing Guide

2. **API Documentation** (`http://localhost:8001`):
   - TypeScript Interfaces
   - Component APIs
   - Service Documentation
   - Type Definitions
   - Module Documentation

### Development Workflow

1. Start both documentation servers:
   ```bash
   # In terminal 1
   npm run docs:serve      # Project docs on :8000

   # In terminal 2
   npm run docs:api:serve  # API docs on :8001
   ```

2. Make changes:
   - Project docs: Edit markdown files in `docs/`
   - API docs: Update TypeScript comments in source code

3. View changes:
   - Project docs: Auto-reloads on changes
   - API docs: Run `npm run docs:api` to rebuild

### Production Documentation

Our documentation is available online:

- Project Documentation: https://falkicon.github.io/farm
- API Documentation: https://falkicon.github.io/farm/api

## Features

### Frontend
- 🎨 Lit Web Components with TypeScript
- 📱 Responsive design with Tailwind CSS
- 🔄 Type-safe routing with Universal Router
- 📚 Component development with Storybook
- 🎯 State management with reactive stores

### Backend
- 🚀 High-performance Fastify server
- 🔒 Built-in security with Helmet and CORS
- 📝 OpenAPI documentation
- 🔄 Real-time capabilities
- 🗃️ MongoDB with Prisma ORM

### Development
- 📚 Documentation with MkDocs and TypeDoc
- 🧪 Testing with Vitest and Playwright
- 📖 Component library with Storybook
- 🔄 CI/CD with GitHub Actions
- 🛠️ ESLint and Prettier integration

## Documentation

### Getting Started
- [Installation](https://falkicon.github.io/farm/getting-started/installation)
- [Development](https://falkicon.github.io/farm/getting-started/development)
- [Project Structure](https://falkicon.github.io/farm/getting-started/project-structure)

### Architecture
- [Overview](https://falkicon.github.io/farm/architecture/overview)
- [Backend](https://falkicon.github.io/farm/architecture/backend)
- [Frontend](https://falkicon.github.io/farm/architecture/frontend)
- [Shared](https://falkicon.github.io/farm/architecture/shared)

### Development
- [Guidelines](https://falkicon.github.io/farm/development/guidelines)
- [Testing](https://falkicon.github.io/farm/development/testing)

### Components
- [Frontend Components](https://falkicon.github.io/farm/frontend/components/guidelines)
- [Backend API](https://falkicon.github.io/farm/backend/api/guidelines)
- [Database](https://falkicon.github.io/farm/backend/database)

### Specifications
- [Development Environment](https://falkicon.github.io/farm/specs/top-level/development-environment-spec)
- [Documentation System](https://falkicon.github.io/farm/specs/top-level/documentation-system-spec)
- [Module Structure](https://falkicon.github.io/farm/specs/top-level/module-structure-spec)

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://falkicon.github.io/farm/contributing) for details.

## License

This project is licensed under the MIT License - see the [License](https://falkicon.github.io/farm/license) file for details.

## Support

- [Documentation](https://falkicon.github.io/farm)
- [GitHub Issues](https://github.com/Falkicon/farm/issues)
- [Discord Community](https://discord.gg/farm-stack)
