# Base Progress Bar Component

The BaseProgressBar component provides foundational functionality for progress indicators.

## Class: BaseProgressBar

Extends `FASTElement`

### Properties

- `max?: number` - Maximum value of the progress bar
- `min?: number` - Minimum value of the progress bar
- `value?: number` - Current value of the progress bar
- `validationState: ProgressBarValidationState | null` - Current validation state
- `percentComplete: number` - Computed percentage of completion

### Methods

- `maxChanged(prev: number | undefined, next: number | undefined)` - Handles max value changes
- `minChanged(prev: number | undefined, next: number | undefined)` - Handles min value changes
- `valueChanged(prev: number | undefined, next: number | undefined)` - Handles value changes
- `validationStateChanged(prev: ProgressBarValidationState | undefined, next: ProgressBarValidationState | undefined)` - Handles validation state changes

### Internal Properties

- `elementInternals: ElementInternals` - Provides access to element internals

## Usage Example

```typescript
class CustomProgressBar extends BaseProgressBar {
  // Extend with additional functionality
}
```
