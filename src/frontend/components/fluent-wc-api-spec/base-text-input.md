# Base Text Input Component

The BaseTextInput component provides foundational functionality for single-line text input fields.

## Class: BaseTextInput

Extends `FASTElement`

### Properties

- `autocomplete?: string` - Autocomplete behavior
- `autofocus: boolean` - Whether the input should be focused on load
- `currentValue: string` - Current input value
- `dirname?: string` - Text direction
- `disabled?: boolean` - Whether the input is disabled
- `list: string` - ID of associated datalist
- `maxlength: number` - Maximum length of input
- `minlength: number` - Minimum length of input
- `multiple: boolean` - Whether multiple values are allowed
- `name: string` - Name of the form control
- `pattern: string` - Pattern for validation
- `placeholder: string` - Placeholder text
- `readOnly?: boolean` - Whether the input is read-only
- `required: boolean` - Whether the input is required
- `size: number` - Visual size of the input
- `type: TextInputType` - Type of input
- `value: string` - Input value

### Methods

- `checkValidity(): boolean` - Checks if the input is valid
- `reportValidity(): boolean` - Reports validity state
- `select()` - Selects all text
- `setCustomValidity(message: string)` - Sets custom validation message

### Event Handlers

- `beforeinputHandler(e: InputEvent): boolean | void`
- `changeHandler(e: InputEvent): boolean | void`
- `inputHandler(e: InputEvent): boolean | void`
- `keydownHandler(e: KeyboardEvent): boolean | void`

### Form Association

- `static formAssociated = true`
- `form: HTMLFormElement | null`
- `validationMessage: string`
- `validity: ValidityState`
- `willValidate: boolean`

## Usage Example

```typescript
class CustomTextInput extends BaseTextInput {
  // Extend with additional functionality
}
```
