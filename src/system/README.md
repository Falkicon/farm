# System Module

The system module provides a collection of utility components, styles, and functionality for system-level features like
monitoring, status pages, and administrative interfaces.

## Architecture

```
src/system/
├── components/           # System-specific components
│   ├── common/          # Base components and utilities
│   │   └── SystemComponent.ts
│   └── status/          # System status components
│       └── SystemStatusPage.ts
└── styles/              # System-specific styling
    ├── theme.css        # Design tokens and variables (MUST BE LOADED FIRST)
    ├── components.css   # Component-specific styles
    └── layouts.css      # Layout utilities and grids
```

## Components

### SystemComponent (Base Class)

`SystemComponent` serves as the base class for all system-related components. It provides:

- Global style integration (no shadow DOM)
- Base class `system-component` for all system components
- Helper methods for common UI patterns:
  - `renderStatus()`: Status indicators with success/error/warning states
  - `renderInfo()`: Information tooltips
  - `renderMetric()`: Metric displays with labels and values

### SystemStatusPage

A comprehensive system monitoring interface that displays:

- Core service statuses (Backend, Database)
- API feature availability
- Performance metrics
- Memory usage charts
- Environment information
- Version details

## Styling System

### Style Loading Order (Important)

Styles must be loaded in the following order to ensure proper variable inheritance:

1. `theme.css` - Contains CSS variables and design tokens
2. `components.css` - Component-specific styles that use theme variables
3. `layouts.css` - Layout utilities that use theme variables

### Theme Variables (`theme.css`)

Design tokens and semantic variables for:

- Colors (prefixed with `--color-`)
- Typography (prefixed with `--system-font-`)
- Spacing (prefixed with `--system-spacing-`)
- Borders (prefixed with `--system-radius-`)
- Transitions (prefixed with `--system-transition-`)

### Component Styles (`components.css`)

Reusable component styles that depend on theme variables:

- Cards
- Status indicators
- Metrics
- Info tooltips
- Charts

### Layout Utilities (`layouts.css`)

Layout patterns and utilities that depend on theme variables:

- Grid systems
- Section layouts
- Flex utilities
- Responsive breakpoints
- Scrollbar styling

## Usage

### Component Structure

Every system component must follow this structure:

```typescript
@customElement('my-system-component')
export class MySystemComponent extends SystemComponent {
  render() {
    return html`
      <div class="system-layout">
        <!-- Required wrapper -->
        <div class="system-grid">
          <!-- Optional grid container -->
          <div class="system-card">
            <!-- Content container -->
            <!-- Component content -->
          </div>
        </div>
      </div>
    `;
  }
}
```

### CSS Class Hierarchy

1. `system-component` - Added automatically by base class
2. `system-layout` - Required wrapper for system pages
3. `system-grid` - Optional grid container
4. `system-card`, `system-section`, etc. - Content containers

### Styling Guidelines

1. Use the `system-` prefix for all classes
2. Always use semantic variables from `theme.css`
3. Never use hardcoded colors or values
4. Follow the component structure exactly
5. Add wrapper classes in the correct order

### Common Issues

1. **Styles Not Applied**: Ensure theme.css is loaded first
2. **Missing Layout**: Add system-layout wrapper
3. **Variable Conflicts**: Use correct variable prefixes
4. **Component Structure**: Follow the exact nesting order

## Recent Changes

### Refactor (2024-03-11)

1. Created dedicated system module structure
2. Moved system status page from frontend to system module
3. Implemented theme variables and component styles
4. Added chart visualization support
5. Improved accessibility with semantic HTML and ARIA attributes
6. Updated routing to reflect new component location
7. Added strict style loading order requirements
8. Clarified component structure requirements

### Benefits

- Better separation of concerns
- Consistent styling system
- Reusable component patterns
- Improved maintainability
- Scalable architecture for future system features
- Clear documentation of requirements
