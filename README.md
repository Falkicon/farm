<!-- @cursor-nocursor-start -->

# FARM Web Application Boilerplate

**F**ull Stack • **A**PI-first • **R**eactive • **M**odern Web Platform

> ⚠️ **Alpha Status**: This project is currently in alpha. While the core features are functional, APIs and architecture may change significantly between versions. Use in production at your own risk.

<!-- Status -->
[![Documentation](https://img.shields.io/badge/Documentation-passing-brightgreen.svg)](https://github.com/Falkicon/farm/actions/workflows/docs.yml)
[![Tests](https://img.shields.io/badge/Tests-passing-brightgreen.svg)](https://github.com/Falkicon/farm/actions/workflows/test.yml)
[![Build](https://img.shields.io/badge/Build-passing-brightgreen.svg)](https://github.com/Falkicon/farm/actions/workflows/build.yml)
[![E2E](https://img.shields.io/badge/E2E-passing-brightgreen.svg)](https://github.com/Falkicon/farm/actions/workflows/e2e.yml)
[![CodeQL](https://img.shields.io/badge/CodeQL-passing-brightgreen.svg)](https://github.com/Falkicon/farm/actions/workflows/codeql.yml)

<!-- Project Info -->
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/badge/npm-0.0.1-green.svg)](https://www.npmjs.com/package/farm)
[![codecov](https://img.shields.io/badge/codecov-unknown-lightgrey.svg)](https://codecov.io/gh/Falkicon/farm)

<!-- Tech Stack -->
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://falkicon.github.io/farm/storybook)

<!-- Development -->
[![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A production-ready full-stack TypeScript boilerplate combining Lit Web Components, Fastify, and modern web platform features. Built for developers who want a robust, scalable, and type-safe foundation for their web applications.

<!-- [View Documentation](https://falkicon.github.io/farm/) -->


<img src="README-banner.png" alt="FARM - Full Stack • API-first • Reactive • Modern Web Platform" width="100%" />

## Features

### Frontend
- 🎨 Modern UI with Lit Web Components and Tailwind CSS
- ⚡ Hot Module Replacement for rapid development
- 📚 Component development with Storybook
- 🔄 Reactive state management

### Backend
- 🚀 High-performance Fastify server
- 🔍 API-first development approach
- 💾 Type-safe Prisma database integration
- 📊 Built-in system metrics and monitoring

### Developer Experience
- 🔒 End-to-end TypeScript
- 📝 Comprehensive TypeDoc documentation
- 🧪 Testing with Vitest & Playwright
- 🔄 GitHub Actions CI/CD workflow
- 📦 Modern development tooling (Vite, ESLint, Prettier)

<!-- @cursor-nocursor-end -->

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
npm run lint:fix

# Type checking
npm run validate

# Run tests
npm run test
```

#### 2. Development Servers
```bash
# Start all development servers
npm run dev          # Starts both frontend (:3000) and backend (:8000)

# Start individual servers
npm run dev:frontend # Frontend on port 3000
npm run dev:backend  # Backend on port 8000
npm run storybook    # Storybook on port 6006
```

#### 3. Testing
```bash
# Run test suites
npm run test           # Run unit tests with Vitest
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate coverage report
npm run test:e2e      # Run Playwright E2E tests
npm run test:e2e:ui   # Run E2E tests with UI
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

##### Project Documentation (MkDocs)
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

##### API Documentation (TypeDoc)
```bash
# Generate and serve API docs
npm run docs:api       # Generate API docs
npm run docs:api:serve # Serve on http://localhost:8001

# Clean documentation
npm run docs:clean
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

### Production Documentation

Our documentation is available online:

- Project Documentation: https://falkicon.github.io/farm
- API Documentation: https://falkicon.github.io/farm/api

## Contributing

Please see our [Contributing Guide](https://falkicon.github.io/farm/contributing) for details.

## License

MIT © [FARM](LICENSE)

## Support

- [Documentation](https://falkicon.github.io/farm)
- [GitHub Issues](https://github.com/Falkicon/farm/issues)
- [Discord Community](https://discord.gg/farm-stack)
