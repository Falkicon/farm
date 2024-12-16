# Spinner Component

The Spinner component provides a visual loading indicator.

## Class: Spinner

Extends `BaseSpinner`

### Properties

- `appearance?: SpinnerAppearance` - Visual style of the spinner
- `size?: SpinnerSize` - Size of the spinner

### Methods

- `appearanceChanged(prev: SpinnerAppearance | undefined, next: SpinnerAppearance | undefined)`
- `sizeChanged(prev: SpinnerSize | undefined, next: SpinnerSize | undefined)`

## Types

### SpinnerAppearance

```typescript
type SpinnerAppearance = "primary" | "inverted"
```

### SpinnerSize

```typescript
type SpinnerSize = "tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large" | "huge"
```

## Styles & Template

- `SpinnerStyles: ElementStyles` - Styles for the spinner
- `SpinnerTemplate: ViewTemplate<Spinner>` - Template for rendering the spinner

## Definition

```typescript
export const SpinnerDefinition: FASTElementDefinition<typeof Spinner>
```

## Usage Example

```html
<fluent-spinner
  appearance="primary"
  size="medium"
>
</fluent-spinner>
```
