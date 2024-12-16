# Switch Component

The Switch component provides a toggleable on/off input styled as a switch.

## Class: Switch

Extends `BaseCheckbox`

### Properties

Inherits all properties from BaseCheckbox

### Constructor

- Initializes element internals and sets up base functionality

## Types

### SwitchLabelPosition

```typescript
type SwitchLabelPosition = "above" | "after" | "before"
```

### SwitchOptions

```typescript
type SwitchOptions = {
    switch?: StaticallyComposableHTML<Switch>;
}
```

## Styles & Template

- `SwitchStyles: ElementStyles` - Styles for the switch
- `SwitchTemplate: ElementViewTemplate<Switch>` - Template for rendering the switch

## Definition

```typescript
export const SwitchDefinition: FASTElementDefinition<typeof Switch>
```

## Usage Example

```html
<fluent-switch
  name="darkMode"
  checked
>
  Dark Mode
</fluent-switch>
```
