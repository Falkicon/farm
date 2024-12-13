# Testing Guidelines

This folder contains all test-related files for our web application. We use Vitest for unit/integration testing and
Playwright for E2E testing.

## Directory Structure

@tests/ ├── unit/ # Unit tests for components and utilities ├── integration/ # Integration tests for API endpoints ├──
e2e/ # End-to-end tests with Playwright ├── mocks/ # Mock data and services └── setup/ # Test setup and utility
functions

## Running Tests

# Run all tests

npm run test

# Run unit tests only

npm run test:unit

# Run integration tests only

npm run test:integration

# Run e2e tests

npm run test:e2e

# Run tests in watch mode

npm run test:watch

## Writing Tests

### File Naming Convention

- Test files should end with `.test.ts`
- E2E test files should end with `.spec.ts`
- Place tests close to the code they're testing
- Use descriptive names that indicate what's being tested

### Unit Tests Example

import { expect, describe, it } from 'vitest';

describe('ComponentName', () => { it('should do something specific', () => { // Your test here }); });

### Integration Tests Example

import { expect, describe, it } from 'vitest';

describe('API: /endpoint', () => { it('should handle the request correctly', async () => { // Your test here }); });

### E2E Tests Example

import { test, expect } from '@playwright/test';

test('user flow description', async ({ page }) => { // Your test here });

## Best Practices

1. Follow the AAA pattern (Arrange, Act, Assert)
2. Keep tests focused and isolated
3. Use meaningful test descriptions
4. Mock external dependencies
5. Avoid test interdependence
6. Write both positive and negative test cases
7. Keep setup/teardown clean

## Mocking

Use the `mocks/` directory for:

- API response mocks
- Service mocks
- Test data factories
- Fixture files

## Coverage

Coverage reports are generated in the `coverage/` directory. Aim for:

- Statements: >80%
- Branches: >80%
- Functions: >80%
- Lines: >80%

## Debugging Tests

1. Use `test.only()` or `describe.only()` to run specific tests
2. Use `console.log()` or debugger statements
3. Check the `setup/` directory for helper functions

## CI Integration

Tests are automatically run in CI:

- On pull requests
- On merge to main branch
- Nightly for E2E tests

For more detailed information, refer to our main documentation.
