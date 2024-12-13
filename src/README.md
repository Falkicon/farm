# FARM Stack API Documentation

Welcome to the FARM Stack API documentation. This documentation is automatically generated from the TypeScript source code using TypeDoc.

## Documentation Sections

- **Modules** - List of all modules and their exports
- **Classes** - All classes with their methods and properties
- **Interfaces** - Type definitions and interfaces

## Core APIs

### Frontend
- Components and Web Elements
- State Management
- Routing System
- API Integration

### Backend
- Server Configuration
- API Endpoints
- Database Integration
- Security Features

### Shared
- Common Types
- Utility Functions
- Constants
- Validation Schemas

## Using the Documentation

1. **Navigation**: Use the sidebar to browse through different sections
2. **Search**: Use the search bar to find specific items
3. **Breadcrumbs**: Navigate back through the hierarchy

## Contributing

To contribute to this documentation:

1. Add TypeDoc comments to your code:
```typescript
/**
 * @module MyModule
 * @description Module description
 */

/**
 * Interface description
 * @interface MyInterface
 */
export interface MyInterface {
  /**
   * Property description
   * @type {string}
   */
  property: string;
}
```

2. Generate documentation:
```bash
npm run docs:api
```

3. Preview changes:
```bash
npm run docs:api:serve
```

For more information, see our [Contributing Guide](https://falkicon.github.io/farm/contributing).
