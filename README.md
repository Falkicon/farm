# Web Application Boilerplate

A modern web application boilerplate with TypeScript, Web Components, and Fastify.

## Features

- TypeScript for type-safe development
- Web Components with FAST Element & Fluent UI
- Fastify backend with Prisma ORM
- Vite for fast development and building
- Tailwind CSS for styling
- Full testing setup with Vitest and Playwright
- ESLint and Prettier for code quality
- Automated CI with GitHub Actions

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

- `pnpm dev` - Start development servers
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm test:ui` - Run E2E tests
- `pnpm lint` - Lint code
- `pnpm format` - Format code
- `pnpm docs` - Generate documentation

## Project Structure

- `/src/frontend` - Frontend code
- `/src/backend` - Backend code
- `/src/shared` - Shared utilities and types
- `/src/tests` - Test files
- `/public` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 