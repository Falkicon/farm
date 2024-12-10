# Web Application Boilerplate

A modern web application boilerplate with TypeScript, Lit Components, and Fastify.

## Features

- TypeScript for type-safe development
- Lit Components for lightweight, performant web components
- Fastify backend with Prisma ORM
- Vite for fast development and building
- Tailwind CSS for styling
- Comprehensive testing with Vitest and Playwright
- ESLint and Prettier for code quality
- Automated CI with GitHub Actions
- TypeDoc for API documentation
- Component development tools and utilities

## Prerequisites

- Node.js 18 or later
- PostgreSQL database
- pnpm (recommended) or npm

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
4. Initialize the database:
   ```bash
   pnpm prisma db push
   ```
5. Start the development server:
   ```bash
   pnpm dev
   ```

## Available Scripts

- `pnpm dev` - Start development servers (frontend: 3000, backend: 8000)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run unit and integration tests
- `pnpm test:ui` - Run E2E tests with Playwright
- `pnpm lint` - Lint code with ESLint
- `pnpm format` - Format code with Prettier
- `pnpm docs` - Generate TypeDoc documentation
- `pnpm clean` - Clean build artifacts and caches

## Project Structure

- `/src/frontend` - Frontend code using Lit Components
  - `/components` - Reusable UI components
  - `/features` - Feature-based components
  - `/shared` - Shared utilities and types
  - `/styles` - Global styles and Tailwind configuration
- `/src/backend` - Fastify backend code
  - `/controllers` - Request handlers
  - `/routes` - API routes
  - `/services` - Business logic
- `/src/shared` - Shared code between frontend and backend
- `/src/tests` - Test files and utilities
- `/public` - Static assets
- `/docs` - Documentation files

## Testing

- Unit tests with Vitest
- Component testing with @open-wc/testing
- E2E tests with Playwright
- Accessibility testing included
- Test utilities and helpers provided

## Documentation

- Component documentation in `/docs/COMPONENTS.md`
- Architecture overview in `/docs/ARCHITECTURE.md`
- API documentation generated with TypeDoc
- Comprehensive testing guidelines in `/src/tests/README.md`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 