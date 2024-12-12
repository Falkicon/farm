# FARM

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

## Quick Start

### Prerequisites
- Node.js >= 22.0.0
- npm >= 10.0.0
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Falkicon/farm.git
cd farm

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

Your application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Documentation: http://localhost:8000/documentation

## Documentation

FARM comes with comprehensive documentation:

- **[Getting Started Guide](https://falkicon.github.io/farm/)** - First steps and basic concepts
- **[API Documentation](https://falkicon.github.io/farm/modules.html)** - Detailed API reference
- **[Component Library](https://falkicon.github.io/farm/modules.html)** - UI component documentation
- **[Architecture Guide](https://falkicon.github.io/farm/modules.html)** - System design and patterns
- **[Storybook](http://localhost:6006)** - Interactive component development environment

You can generate and serve the documentation locally:

```bash
# Generate and serve documentation
npm run docs

# Start Storybook development server (port 6006)
npm run storybook

# Build static Storybook site
npm run build-storybook

# Serve built Storybook (port 6006)
npm run serve-storybook
```

## Development

FARM provides a comprehensive development environment:

```bash
# Start development servers
npm run dev          # Main app (port 3000)
npm run storybook    # Storybook (port 6006)

# Start development server with hot reload
npm run dev

# Run unit and integration tests
npm test

# Run end-to-end tests
npm run test:e2e

# Build for production (outputs to /dist)
npm run build

# Lint and format code
npm run lint
npm run format

# Clean up build artifacts
npm run clean
```

For database management:
```bash
# Deploy database migrations
npm run migrate:deploy

# Seed database with initial data
npm run db:seed
```

## License

MIT © [FARM](LICENSE)
