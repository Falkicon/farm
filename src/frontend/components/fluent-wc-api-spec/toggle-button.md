# Toggle Button Component

The ToggleButton component provides a button that can be toggled between pressed and unpressed states.

## Class: ToggleButton

Extends `Button`

### Properties

- `mixed?: boolean` - Whether the button is in a mixed state
- `pressed: boolean` - Whether the button is pressed

### Methods

- `press()` - Override to handle press state
- `pressedChanged()` - Internal method to handle pressed state changes
- `mixedChanged()` - Internal method to handle mixed state changes

### Lifecycle Methods

- `connectedCallback()` - Called when element is inserted into DOM

## Types

### ToggleButtonAppearance

```typescript
type ToggleButtonAppearance = "primary" | "outline" | "subtle" | "transparent"
```

### ToggleButtonShape

```typescript
type ToggleButtonShape = "circular" | "rounded" | "square"
```

### ToggleButtonSize

```typescript
type ToggleButtonSize = "small" | "medium" | "large"
```

## Styles & Template

- `ToggleButtonStyles: ElementStyles` - Styles for the toggle button
- `ToggleButtonTemplate: ElementViewTemplate<ToggleButton>` - Template for rendering the toggle button

## Definition

```typescript
export const ToggleButtonDefinition: FASTElementDefinition<typeof ToggleButton>
```

## Usage Example

```html
<fluent-toggle-button
  appearance="primary"
  shape="rounded"
  size="medium"
>
  Toggle Me
</fluent-toggle-button>
```
