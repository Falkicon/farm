# Base Button Component

The BaseButton component provides core button functionality and form association capabilities.

## Class: BaseButton

Extends `FASTElement`

### Properties

- `autofocus: boolean` - Whether the button should be focused on page load
- `disabled?: boolean` - Whether the button is disabled
- `disabledFocusable: boolean` - Whether the button can be focused when disabled
- `formAction?: string` - URL for form submission
- `formEnctype?: string` - Form data encoding type
- `formMethod?: string` - HTTP method for form submission
- `formNoValidate?: boolean` - Skip form validation on submit
- `formTarget?: ButtonFormTarget` - Target for form submission
- `name?: string` - Name of the button
- `type: ButtonType` - Type of button
- `value?: string` - Value associated with the button
- `tabIndex: number` - Tab order of the button

### Methods

- `clickHandler(e: Event): boolean | void` - Handles click events
- `keypressHandler(e: KeyboardEvent): boolean | void` - Handles keypress events
- `resetForm()` - Resets associated form
- `press()` - Protected method to handle button press

### Form Association

- `static formAssociated = true` - Indicates form association capability
- `form: HTMLFormElement | null` - Associated form element
- `labels: ReadonlyArray<Node>` - Associated label elements

### Internal Methods

- `formDisabledCallback(disabled: boolean)` - Handles form disabled state changes
- `typeChanged(previous: ButtonType, next: ButtonType)` - Handles button type changes

## Usage Example

```typescript
class CustomButton extends BaseButton {
  // Extend with additional functionality
}
```
