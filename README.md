# FabricMill

[![Documentation Status](https://github.com/yourusername/fabricmill/actions/workflows/docs.yml/badge.svg)](https://github.com/yourusername/fabricmill/actions/workflows/docs.yml)

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

### Documentation

The project uses TypeDoc to generate comprehensive API documentation. Access the documentation in three ways:

1. **Local Development**:
```bash
# Generate and serve documentation
npm run docs

# Access at http://localhost:8080
```

2. **Static Build**:
```bash
# Generate documentation only
npm run docs:build

# Output in ./docs directory
```

3. **Online Documentation**:
- Visit [https://yourusername.github.io/fabricmill](https://yourusername.github.io/fabricmill)
- Updated automatically on main branch changes

### Documentation Structure

- **Frontend**
  - Components API
  - Router Configuration
  - State Management
  - Event System

- **Backend**
  - API Routes
  - Middleware
  - Services
  - Configuration
  - Database Schema

- **System**
  - Status Pages
  - Monitoring
  - Performance Metrics

### Writing Documentation

Follow these guidelines when documenting code:

```typescript
/**
 * Component/function description
 *
 * @group Category
 * @category Subcategory
 *
 * @example
 * ```typescript
 * // Usage example
 * ```
 *
 * @remarks
 * Additional details or implementation notes
 */
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
```ini
DATABASE_URL=postgresql://user:password@localhost:5432/fabricmill
NODE_ENV=development
```

## Project Structure

```
fabricmill/
├── src/
│   ├── frontend/           # Frontend application code
│   │   ├── components/     # Reusable Lit components
│   │   ├── features/       # Feature-specific components
│   │   ├── shared/         # Shared utilities and config
│   │   └── styles/         # Global styles and Tailwind
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

## Platform-Specific Considerations

### Windows (PowerShell)

When running on Windows systems, consider the following best practices:

- Suppress Node.js experimental warnings:
```powershell
$env:NODE_NO_WARNINGS = 1
```

- Handle npm output properly:
```powershell
$process = Start-Process -FilePath "npm" -ArgumentList "install" `
    -NoNewWindow -PassThru -Wait `
    -RedirectStandardOutput "output.log" `
    -RedirectStandardError "error.log"

if ($process.ExitCode -ne 0) {
    $errorLog = Get-Content "error.log" -Raw
    throw "Command failed with exit code $($process.ExitCode)`n$errorLog"
}
```

- Clean up temporary files:
```powershell
try {
    # Your code here
}
finally {
    Remove-Item -ErrorAction SilentlyContinue "*.log"
}
```

- Use proper string formatting:
  - Use `$($variable)` for complex expressions
  - Use backticks (\`) for line continuation
  - Use here-strings for multiline text

### Development Environment

- Vite Configuration:
  - No separate `@types/vite` package needed
  - Path aliases in `vite.config.ts` should match `tsconfig.json`
  - Use forward slashes in path configurations for cross-platform compatibility

- TypeScript Configuration:
  - Use `moduleResolution: "bundler"` for Vite projects
  - Ensure path aliases are consistent across all config files
  - Include necessary `types` array in tsconfig.json

### Cross-Platform Compatibility

- Use path separators appropriately:
  - Configuration files: Always use forward slashes (/)
  - Runtime path operations: Use `path.join()` or `path.resolve()`
  - Scripts: Use platform-specific separators

- Process execution:
  - Windows: Use `Start-Process` with proper arguments
  - Unix: Use direct command execution
  - Consider using cross-platform npm scripts when possible

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

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
