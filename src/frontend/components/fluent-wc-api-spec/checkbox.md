# Checkbox Component

The Checkbox component provides a selectable input that can be toggled on/off or indeterminate.

## Class: Checkbox

Extends `BaseCheckbox`

### Properties

- `indeterminate?: boolean` - Whether the checkbox is in an indeterminate state
- `shape?: CheckboxShape` - Shape of the checkbox
- `size?: CheckboxSize` - Size of the checkbox

### Methods

- `toggleChecked(force?: boolean)` - Toggles the checked state
- `setAriaChecked(value?: boolean)` - Sets the ARIA checked state

## Types

### CheckboxShape

```typescript
type CheckboxShape = "circular" | "square"
```

### CheckboxSize

```typescript
type CheckboxSize = "medium" | "large"
```

### CheckboxOptions

```typescript
type CheckboxOptions = {
    checkedIndicator?: StaticallyComposableHTML<Checkbox>;
    indeterminateIndicator?: StaticallyComposableHTML<Checkbox>;
}
```

## Styles & Template

- `CheckboxStyles: ElementStyles` - Styles for the checkbox
- `CheckboxTemplate: ElementViewTemplate<Checkbox>` - Template for rendering the checkbox

## Definition

```typescript
export const CheckboxDefinition: FASTElementDefinition<typeof Checkbox>
```

## Usage Example

```html
<fluent-checkbox
  shape="square"
  size="medium"
>
  Check me
</fluent-checkbox>
```
