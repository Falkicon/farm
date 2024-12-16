# Progress Bar Component

The ProgressBar component provides a visual indicator of progress or loading state.

## Class: ProgressBar

Extends `BaseProgressBar`

### Properties

- `shape?: ProgressBarShape` - Shape of the progress bar
- `thickness?: ProgressBarThickness` - Thickness of the progress bar

### Methods

- `shapeChanged(prev: ProgressBarShape | undefined, next: ProgressBarShape | undefined)`
- `thicknessChanged(prev: ProgressBarThickness | undefined, next: ProgressBarThickness | undefined)`

## Types

### ProgressBarShape

```typescript
type ProgressBarShape = "rounded" | "square"
```

### ProgressBarThickness

```typescript
type ProgressBarThickness = "medium" | "large"
```

### ProgressBarValidationState

```typescript
type ProgressBarValidationState = "success" | "warning" | "error"
```

## Styles & Template

- `ProgressBarStyles: ElementStyles` - Styles for the progress bar
- `ProgressBarTemplate: ElementViewTemplate<ProgressBar>` - Template for rendering the progress bar

## Definition

```typescript
export const ProgressBarDefinition: FASTElementDefinition<typeof ProgressBar>
```

## Usage Example

```html
<fluent-progress-bar
  min="0"
  max="100"
  value="75"
  shape="rounded"
  thickness="medium"
>
</fluent-progress-bar>
```
