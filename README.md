# FabricMill

Modern web application boilerplate with TypeScript, Web Components (Lit), and Fastify.

## Features

- 🚀 **Frontend**: Lit components with TypeScript and Vite
- 🛠️ **Backend**: Fastify server with TypeScript
- 🎨 **Styling**: TailwindCSS for utility-first styling
- 📝 **Type Safety**: Full TypeScript support
- 🧪 **Testing**: Vitest for unit tests, Playwright for E2E
- 📚 **Documentation**: TypeDoc for API documentation
- 🔒 **Security**: Helmet for HTTP security headers
- 🌐 **API**: RESTful endpoints with Zod validation
- 🗄️ **Database**: Prisma ORM for type-safe database access

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- A modern terminal:
  - **Windows**: Windows Terminal with PowerShell 7+
  - **macOS**: Terminal.app or iTerm2
  - **Linux**: Any modern terminal emulator

## Quick Start

1. Clone and install:
```bash
git clone https://github.com/yourusername/fabricmill.git
cd fabricmill
npm install
```

2. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Health Check: http://localhost:8000/api/health

## Development Workflow

### Common Commands

```bash
# Start development servers
npm run dev

# If you encounter port conflicts
npm run kill-ports
npm run dev

# Build for production
npm run build

# Run tests
npm test                # Unit tests
npm run test:ui        # E2E tests

# Code quality
npm run lint          # Check code
npm run format        # Format code

# Documentation
npm run docs         # Generate and serve docs
```

### Port Management

The project uses the following ports by default:
- 3000: Frontend development server
- 8000: Backend API server
- 8080: Documentation server

If you encounter port conflicts:
1. Run `npm run kill-ports` to clear the ports
2. Start again with `npm run dev`

The `kill-ports` utility is cross-platform compatible and works on:
- Windows (using PowerShell commands)
- macOS/Linux (using `lsof` and `kill`)

### Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Update the following variables:
```env
NODE_ENV=development
DATABASE_URL="your-database-url"
```

## Project Structure

```
fabricmill/
├── src/
│   ├── frontend/           # Frontend application code
│   │   ├── components/     # Reusable Lit components
│   │   ├── features/       # Feature-specific components
│   │   ├── shared/        # Shared utilities and config
│   │   └── styles/        # Global styles and Tailwind
│   │
│   └── backend/           # Backend application code
│       ├── routes/        # API route handlers
│       ├── services/      # Business logic
│       └── utils/         # Utility functions
│
├── scripts/              # Development and build scripts
├── public/              # Static assets
├── docs/               # Generated documentation
└── tests/              # Test files
```

## Cross-Platform Development

This project is designed to work consistently across all platforms:

### Windows
- Use Windows Terminal with PowerShell 7+ for best experience
- All scripts are PowerShell-compatible
- Line endings are automatically handled

### macOS/Linux
- Use your preferred terminal
- All scripts work with bash/zsh
- Native package management supported

### VSCode Configuration
- Recommended extensions are pre-configured
- Consistent formatting across platforms
- Integrated terminal settings included

## Configuration Files

- `.env` - Environment variables
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `.vscode/settings.json` - Editor settings
- `.cursorrules` - Cursor IDE configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Port Conflicts
```bash
# Clear any processes using the development ports
npm run kill-ports

# If still having issues, check manually:
# Windows (PowerShell):
Get-NetTCPConnection -LocalPort 3000,8000

# macOS/Linux:
lsof -i :3000,8000
```

### Development Server Issues
1. Clear ports (as above)
2. Remove node_modules: `npm clean-install`
3. Clear Vite cache: `npm run clean`
4. Restart development servers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.