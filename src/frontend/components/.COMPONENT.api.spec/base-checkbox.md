# Base Checkbox Component

The BaseCheckbox component provides foundational checkbox functionality with form association capabilities.

## Class: BaseCheckbox

Extends `FASTElement`

### Properties

- `autofocus: boolean` - Whether the checkbox should be focused on page load
- `checked: boolean` - The checked state of the checkbox
- `disabled?: boolean` - Whether the checkbox is disabled
- `name: string` - Name of the form control
- `required: boolean` - Whether the checkbox is required
- `initialValue: string` - Initial value of the checkbox
- `initialChecked?: boolean` - Initial checked state
- `value: string` - Current value of the checkbox

### Methods

- `checkValidity(): boolean` - Checks if the checkbox is valid
- `reportValidity(): boolean` - Reports validity state
- `setCustomValidity(message: string)` - Sets custom validation message
- `toggleChecked(force?: boolean)` - Toggles checked state

### Form Association

- `static formAssociated: boolean` - Indicates form association capability
- `form: HTMLFormElement | null` - Associated form element
- `labels: ReadonlyArray<HTMLLabelElement>` - Associated label elements
- `validationMessage: string` - Current validation message
- `validity: ValidityState` - Validation state
- `willValidate: boolean` - Whether the element will be validated

### Event Handlers

- `clickHandler(e: MouseEvent): boolean | void` - Handles click events
- `inputHandler(e: InputEvent): boolean | void` - Handles input events
- `keydownHandler(e: KeyboardEvent): boolean | void` - Handles keydown events
- `keyupHandler(e: KeyboardEvent): boolean | void` - Handles keyup events

## Usage Example

```typescript
class CustomCheckbox extends BaseCheckbox {
  // Extend with additional functionality
}
```
