#!/bin/bash

# Create core directories
mkdir -p src/frontend/core/feature-registry
mkdir -p src/frontend/core/router

# Create feature directories
mkdir -p src/frontend/features/home/components
mkdir -p src/frontend/features/home/templates

# Create shared directories
mkdir -p src/frontend/shared/components
mkdir -p src/frontend/shared/utils
mkdir -p src/frontend/shared/types

# Create test directories
mkdir -p src/frontend/shared/components/__tests__
mkdir -p src/frontend/features/home/__tests__

# Create/move core files
touch src/frontend/core/feature-registry/types.ts
touch src/frontend/core/feature-registry/feature-registry.ts
touch src/frontend/core/router/router-service.ts

# Create/move feature files
touch src/frontend/features/home/index.ts
touch src/frontend/features/home/templates/home-page.ts

# Create shared component files
touch src/frontend/shared/components/app-button.ts
touch src/frontend/shared/components/app-card.ts
touch src/frontend/shared/components/app-input.ts
touch src/frontend/shared/components/index.ts

# Create styles directory and file
mkdir -p src/frontend/styles
touch src/frontend/styles/tailwind.css

# Create docs
mkdir -p docs
touch docs/ARCHITECTURE.md

# Remove old directories if empty
rm -rf src/frontend/components