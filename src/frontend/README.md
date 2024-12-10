# Frontend Directory

This directory contains all frontend-related code for our web application, built with Lit components and TypeScript.

## Directory Structure

frontend/
├── core/                  # Core application functionality
│   ├── error/            # Error handling and boundaries
│   ├── feature-registry/ # Feature registration system
│   ├── performance/      # Performance monitoring
│   └── router/           # Routing implementation
│
├── features/             # Feature-based components
│   └── home/            # Home feature example
│
├── shared/               # Shared utilities and components
│   ├── base/            # Base component classes
│   ├── components/      # Reusable UI components
│   └── testing/         # Test utilities and helpers
│
└── styles/              # Global styles and Tailwind CSS

## Key Components

### Core
- `ErrorBoundary`: Handles component-level error catching
- `FeatureRegistry`: Manages feature registration and routing
- `ComponentMonitor`: Tracks component performance metrics
- `RouterService`: Handles application routing

### Features
Each feature should:
- Be self-contained
- Have its own routes
- Include necessary components
- Implement the Feature interface

### Shared Components
- `BaseComponent`: Extended by all components
- Common UI components (buttons, cards, inputs)
- Includes tests and documentation

## Development Guidelines

1. **Component Creation**
   - Extend BaseComponent for new components
   - Include unit tests
   - Follow accessibility guidelines

2. **Feature Development**
   - Register new features in FeatureRegistry
   - Keep features isolated
   - Include feature-specific routes

3. **Styling**
   - Use Tailwind CSS utilities
   - Follow design system guidelines
   - Keep styles modular

4. **Testing**
   - Write unit tests for components
   - Include accessibility tests
   - Use provided test utilities

## Best Practices

- Follow component-based architecture
- Maintain type safety
- Keep components small and focused
- Document public APIs
- Include error handling
- Monitor performance