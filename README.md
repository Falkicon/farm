# FARM

**F**ull Stack • **A**PI-first • **R**eactive • **M**odern Web Platform

[![Documentation Status](https://github.com/Falkicon/farm/actions/workflows/docs.yml/badge.svg)](https://github.com/Falkicon/farm/actions/workflows/docs.yml)

A production-ready full-stack TypeScript boilerplate combining Lit Web Components, Fastify, and modern web platform features. Built for developers who want a robust, scalable, and type-safe foundation for their web applications.

[View Documentation](https://falkicon.github.io/farm/)

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

You can generate and serve the documentation locally:

```bash
# Generate and serve documentation
npm run docs

# Start Storybook for component development
npm run storybook
```

## Development

FARM provides a comprehensive development environment:

```bash
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
