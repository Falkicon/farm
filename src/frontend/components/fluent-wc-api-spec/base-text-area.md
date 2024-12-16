# Base Text Area Component

The BaseTextArea component provides foundational functionality for multiline text input fields.

## Class: BaseTextArea

Extends `FASTElement`

### Properties

- `autocomplete?: TextAreaAutocomplete` - Autocomplete behavior
- `autoResize: boolean` - Whether the textarea auto-resizes
- `defaultValue: string` - Default value of the textarea
- `dirName?: string` - Directionality of writing
- `disabled: boolean` - Whether the textarea is disabled
- `displayShadow: boolean` - Whether to display shadow styling
- `maxLength?: number` - Maximum length of input
- `minLength?: number` - Minimum length of input
- `name: string` - Name of the form control
- `placeholder?: string` - Placeholder text
- `readOnly: boolean` - Whether the textarea is read-only
- `required: boolean` - Whether the textarea is required
- `resize: TextAreaResize` - Resize behavior
- `value: string` - Current value of the textarea

### Methods

- `checkValidity(): boolean` - Checks if the textarea is valid
- `reportValidity(): boolean` - Reports validity state
- `select()` - Selects all text
- `setCustomValidity(message: string | null)` - Sets custom validation message

### Form Association

- `static formAssociated = true` - Indicates form association capability
- `form: HTMLFormElement | null` - Associated form element
- `labels: NodeList` - Associated label elements
- `validationMessage: string` - Current validation message
- `validity: ValidityState` - Validation state
- `willValidate: boolean` - Whether the element will be validated

## Usage Example

```typescript
class CustomTextArea extends BaseTextArea {
  // Extend with additional functionality
}
```
