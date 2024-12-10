# Project Boilerplate Specification

This specification describes the structure and components required for a baseline project boilerplate. The goal is to minimize repetitive setup when initiating a new web application project. By duplicating this repository, you should have a working starting point with common tools, configurations, and scripts already in place.

## Overview

The boilerplate provides a foundation for both frontend and backend development. It ensures modern standards, security, performance considerations, testing, and documentation capabilities are ready out-of-the-box.

## Core Features

- **Frontend Stack**:  
  - TypeScript for strongly typed development.  
  - Web Components as a framework-agnostic approach for UI.  
  - FAST Element & Fluent UI Web Components (v3) for standard UI components.  
  - Vite for fast development and efficient bundling.  
  - Universal Router for client-side routing.  
  - Tailwind CSS for rapid styling.  
  - Zod for runtime schema validation.

- **Backend Stack**:  
  - Node.js (LTS) as the runtime environment.  
  - Fastify for a performant and extensible HTTP server.  
  - Prisma as the ORM for database interactions.  
  - PostgreSQL as the primary database.  
  - Helmet.js and compression middleware for security and performance.  
  - Basic CORS, Content Security Policy, and rate-limiting configurations.

- **Development Tools**:  
  - pnpm as the package manager.  
  - ESLint + Prettier for code quality and formatting.  
  - Vitest for unit testing.  
  - Playwright for end-to-end testing.  
  - GitHub Actions for continuous integration.  
  - JSDoc + TypeDoc for generating developer documentation.

- **Implementation Considerations**:  
  - CORS configuration pre-enabled.  
  - CSP setup for enhanced security.  
  - Rate limiting to prevent abuse.  
  - Image optimization and lazy loading for performance.  
  - Code splitting for scalable frontend delivery.

## Optional Capabilities (Commented Out)

The boilerplate’s configuration files should list optional packages without installing them, making it easy to integrate additional features later by simply uncommenting the relevant dependencies. These optional capabilities include:

- **PWA & Offline**: Vite PWA plugin, Workbox, Service Workers, PWA manifests, and caching strategies for offline support.
- **AI/ML Stack**: LangChain.js, ChromaDB, Pinecone Vector Database, OpenAI GPT-4, embeddings, and Hugging Face Transformers for AI-driven features.
- **Performance & Scaling**: Redis for caching and Docker for containerization.
- **Authentication & Security**: JWT, OAuth 2.0, OIDC support.
- **Development & Testing Enhancements**: MSW for mocking APIs.
- **API Documentation**: OpenAPI/Swagger generation and UI.
- **Observability & Monitoring**: OpenTelemetry, Prometheus, Grafana for metrics; Sentry and DataDog for error tracking and performance insights.

## Directory Structure

- **/src/frontend**: Contains the frontend entry points, components, and related assets.
- **/src/backend**: Contains server code, routes, plugins, and Prisma schema files.
- **/src/shared**: Utilities, types, and other shared code used across frontend and backend.
- **/src/tests**: Unit, integration, and E2E tests.
- **/public**: Publicly accessible static assets.
- **/.github/workflows**: CI configuration files.
- **Configuration Files**: Include tsconfig, ESLint, Prettier, Vite config, and other essential config files in the project root.

## Required Scripts

- **dev**: Starts local development servers (frontend and backend as needed).
- **build**: Produces a production-ready build of the frontend (and potentially backend).
- **preview**: Previews the production build locally.
- **start**: Runs the built backend server in production mode.
- **test**: Runs unit and integration tests.
- **test:ui**: Executes end-to-end tests.
- **lint**: Checks code quality with ESLint.
- **format**: Formats code with Prettier.
- **docs**: Generates documentation from source comments.

## CI/CD Integration

Use GitHub Actions to automate testing, linting, and building on each push or pull request. Adjust the CI pipeline to add more steps as the project grows.

## Documentation

Use JSDoc and TypeDoc to generate reference documentation. Maintain a README and high-level architecture overview to guide new contributors and explain design decisions.

---

This specification ensures a new project starts with a robust, modern, and maintainable configuration. Optional features can be integrated easily, reducing initial complexity while preserving flexibility.
