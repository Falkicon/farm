# Radio Component

The Radio component provides a selectable radio button input.

## Class: Radio

Extends `BaseCheckbox`

### Properties

Inherits properties from BaseCheckbox

### Methods

- `toggleChecked(force?: boolean)` - Toggles checked state
- `setFormValue()` - Internal method to set form value
- `setValidity()` - Internal method to set validity state
- `disabledChanged(prev: boolean | undefined, next: boolean | undefined)` - Handles disabled state changes
- `requiredChanged()` - Handles required state changes

### Lifecycle Methods

- `connectedCallback()` - Called when element is inserted into DOM

### Types

### RadioControl

```typescript
type RadioControl = Pick<HTMLInputElement, 'checked' | 'disabled' | 'focus' | 'setAttribute' | 'getAttribute'>
```

### RadioOptions

```typescript
type RadioOptions = {
    checkedIndicator?: StaticallyComposableHTML<Radio>;
}
```

## Styles & Template

- `RadioStyles: ElementStyles` - Styles for the radio button
- `RadioTemplate: ElementViewTemplate<Radio>` - Template for rendering the radio button

## Definition

```typescript
export const RadioDefinition: FASTElementDefinition<typeof Radio>
```

## Usage Example

```html
<fluent-radio
  name="options"
  value="option1"
  checked
>
  Radio Option
</fluent-radio>
```
