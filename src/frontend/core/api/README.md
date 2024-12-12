# Frontend API Layer

## Overview

This module implements a standardized interface between UI components and backend services, promoting modularity, reusability, and flexibility. It decouples the frontend UI from backend details, allowing for easier updates, feature toggling, and experimentation with different user experiences.

## Implementation Status

✅ = Implemented | 🚧 = In Progress | ❌ = Not Started

### Core Features

- ✅ HTTP Methods (GET, POST, PUT, DELETE, PATCH)
- ✅ Error Handling
- ✅ Type Safety
- ✅ Configuration System
- ✅ Query Parameter Support
- ✅ Response Parsing
- ✅ Caching System

### Interceptors

- ✅ Interceptor System
- ✅ Authentication Interceptor
- ✅ Logging Interceptor
- ✅ Retry Interceptor

### Testing

- ✅ Unit Tests
- ✅ Integration Tests
- ✅ Utility Tests
- 🚧 E2E Tests

### Components

- ✅ Data Table Component
- ✅ Form Component
- ✅ File Upload Component
- ✅ Feature Registry Integration

## Directory Structure

```
src/frontend/core/api/
├── README.md                    # This file
├── frontend-api.ts             # Main API module
├── types/                      # Type definitions
│   ├── index.ts               # Core types
│   └── generated/             # Auto-generated types
├── interceptors/              # Request/Response interceptors
│   ├── index.ts              # Interceptor manager
│   └── auth.ts               # Authentication interceptor
├── utils/                    # Utility functions
│   ├── transforms.ts         # Data transformation utilities
│   └── cache.ts             # Caching system
├── config/                   # Configuration
│   ├── index.ts             # Config management
│   └── environments/        # Environment-specific configs
└── __tests__/               # Test files
    ├── frontend-api.test.ts
    ├── utils.test.ts
    └── integration/
        └── api.test.ts
```

## Installation

Add the following dependencies to your `package.json`:

```
{
  "dependencies": {
    "@fastify/cors": "^10.0.1",
    "@fastify/helmet": "^13.0.0",
    "zod": "^3.23.8",
    "@sentry/browser": "^7.0.0",
    "localforage": "^1.10.0",
    "msw": "^2.0.0"
  },
  "devDependencies": {
    "vitest": "^1.6.0",
    "@playwright/test": "^1.49.1",
    "@storybook/web-components": "^7.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "typedoc": "^0.25.0"
  }
}
```

## Usage Examples

### Basic API Calls

```typescript
import { FrontendAPI } from './core/api/frontend-api';

const api = FrontendAPI.getInstance();

// GET request with query parameters
const users = await api.get<User[]>('/api/users', {
  query: { role: 'admin', status: 'active' },
});

// POST request with data
const newUser = await api.post<User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com',
});
```

### Using with Components

```typescript
// Data Table Component
<data-table
  .config=${{
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' }
    ],
    endpoint: '/api/users',
    pageSize: 10
  }}
></data-table>
```

### Using Interceptors

```typescript
// Authentication
const authInterceptor = AuthInterceptor.getInstance();
authInterceptor.setAuthToken('your-token');

// Custom Interceptor
class LoggingInterceptor implements RequestInterceptor {
  async onRequest(config: RequestConfig) {
    console.log('Request:', config);
    return config;
  }
}

api.addRequestInterceptor(new LoggingInterceptor());
```

### Using the Cache

```typescript
const cache = APICache.getInstance();

// Cache response
cache.set('users', response, 5 * 60 * 1000); // 5 minutes

// Get cached response
const cachedResponse = cache.get('users');
```

## Configuration

### Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:8000
VITE_API_VERSION=v1
VITE_ENABLE_MOCKS=false
```

### TypeScript Configuration

Ensure your `tsconfig.json` includes:

```
{
  "compilerOptions": {
    "strict": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  }
}
```

## Testing

```
bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## Security Considerations

- ✅ CORS handling
- ✅ Authentication tokens
- ✅ XSS prevention
- ✅ CSRF protection
- 🚧 Rate limiting
- 🚧 API key rotation

## Performance Optimizations

- ✅ Request caching
- ✅ Response parsing
- ✅ Query parameter handling
- 🚧 Request batching
- 🚧 Response streaming

## Contributing

1. Follow TypeScript best practices
2. Write tests for new functionality
3. Update documentation
4. Follow the established patterns

## TODO

1. Implement remaining interceptors:

   - Logging interceptor
   - Retry interceptor
   - Rate limiting interceptor

2. Add more components:

   - Form components
   - File upload components
   - Error boundary components

3. Enhance testing:

   - Add more E2E tests
   - Add performance tests
   - Add load tests

4. Improve documentation:
   - Add API documentation
   - Add component storybook
   - Add performance guidelines
