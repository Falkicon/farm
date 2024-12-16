# Base Divider Component

The BaseDivider component provides foundational functionality for creating visual separators.

## Class: BaseDivider

Extends `FASTElement`

### Properties

- `orientation?: DividerOrientation` - The orientation of the divider (horizontal/vertical)
- `role: DividerRole` - ARIA role of the divider

### Methods

- `orientationChanged(previous: DividerRole | undefined, next: DividerRole | undefined)` - Handles orientation changes
- `roleChanged(previous: string | null, next: string | null)` - Handles role changes

### Lifecycle Methods

- `connectedCallback()` - Called when element is inserted into DOM

### Internal Properties

- `elementInternals: ElementInternals` - Provides access to element internals

## Usage Example

```typescript
class CustomDivider extends BaseDivider {
  // Extend with additional functionality
}
```

Note: This is a base component typically used as a foundation for building more specific divider implementations.
