# Shared Code

This folder contains code that is shared between frontend and backend parts of the application. This helps maintain consistency and avoid code duplication.

## Directory Structure

@shared/
├── types/             # Shared TypeScript interfaces and types
├── constants/         # Shared constants and enums
├── utils/            # Shared utility functions
├── validators/       # Shared validation logic
└── models/           # Shared data models

## What Belongs Here

### Types (`types/`)
- API request/response interfaces
- Common data structures
- Shared enums
- Event types

### Constants (`constants/`)
- Configuration values
- Error codes
- Status codes
- Shared magic numbers/strings

### Utils (`utils/`)
- Date formatting
- String manipulation
- Common calculations
- Type guards
- Shared helpers

### Validators (`validators/`)
- Input validation rules
- Schema definitions
- Shared validation functions

### Models (`models/`)
- Shared data models
- Type definitions that match database schemas
- DTOs (Data Transfer Objects)

## Best Practices

1. Keep shared code framework-agnostic
2. Minimize dependencies in shared code
3. Write thorough documentation
4. Include unit tests for shared code
5. Avoid platform-specific code
6. Export everything from index files

## Notes

- Avoid putting UI components here
- Avoid backend-specific logic
- Keep files small and focused
- Use barrel exports (index.ts files)
- Document breaking changes carefully
