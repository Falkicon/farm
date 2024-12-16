# Button Component

The Button component provides a clickable button element with various appearance options.

## Class: Button

Extends `BaseButton` and implements `StartEnd` interface

### Properties

- `appearance?: ButtonAppearance` - Visual style of the button
- `iconOnly: boolean` - Whether the button contains only an icon
- `shape?: ButtonShape` - Shape of the button
- `size?: ButtonSize` - Size of the button

### Methods

- `appearanceChanged(prev: ButtonAppearance | undefined, next: ButtonAppearance | undefined)`
- `iconOnlyChanged(prev: boolean, next: boolean)`
- `shapeChanged(prev: ButtonShape | undefined, next: ButtonShape | undefined)`
- `sizeChanged(prev: ButtonSize | undefined, next: ButtonSize | undefined)`

## Types

### ButtonAppearance

```typescript
type ButtonAppearance = "primary" | "outline" | "subtle" | "transparent"
```

### ButtonShape

```typescript
type ButtonShape = "circular" | "rounded" | "square"
```

### ButtonSize

```typescript
type ButtonSize = "small" | "medium" | "large"
```

## Styles & Template

- `ButtonStyles: ElementStyles` - Styles for the button
- `ButtonTemplate: ElementViewTemplate<Button>` - Template for rendering the button

## Definition

```typescript
export const ButtonDefinition: FASTElementDefinition<typeof Button>
```

## Usage Example

```html
<fluent-button
  appearance="primary"
  shape="rounded"
  size="medium"
>
  Click Me
</fluent-button>
```
