# Shared Specifications

## Overview

This document outlines shared specifications and resources used across both frontend and backend components of the Farm project.

## Type Definitions

### Common Types
```typescript
// User related types
type UserRole = 'admin' | 'user' | 'guest';
type UserStatus = 'active' | 'inactive' | 'suspended';

// Data types
type ID = string;
type Timestamp = number;
type ISO8601Date = string;

// API related
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ContentType = 'application/json' | 'multipart/form-data' | 'text/plain';
```

## Constants

### System Constants
```typescript
const API_VERSION = 'v1';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const TOKEN_EXPIRY = 24 * 60 * 60; // 24 hours
```

### Error Codes
```typescript
enum ErrorCode {
  UNAUTHORIZED = 'ERR_UNAUTHORIZED',
  NOT_FOUND = 'ERR_NOT_FOUND',
  VALIDATION_FAILED = 'ERR_VALIDATION_FAILED',
  SERVER_ERROR = 'ERR_SERVER_ERROR'
}
```

## Utilities

### Validation Functions
```typescript
interface ValidationRule {
  type: string;
  message: string;
  validate: (value: any) => boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
```

### Date Utilities
```typescript
interface DateFormat {
  format: string;
  locale: string;
}

interface TimeZone {
  id: string;
  offset: number;
}
```

## Configuration

### Environment Variables
```typescript
interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  API_URL: string;
  DEBUG_MODE: boolean;
}
```

### Feature Flags
```typescript
interface FeatureFlags {
  enableNewUI: boolean;
  enableBetaFeatures: boolean;
  maintenanceMode: boolean;
}
```

## Security

### Authentication
```typescript
interface AuthToken {
  token: string;
  expires: number;
  refreshToken: string;
}
```

### Encryption
- Encryption standards
- Key management
- Secure storage

## Logging

### Log Levels
```typescript
enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}
```

### Log Format
```typescript
interface LogEntry {
  timestamp: ISO8601Date;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}
