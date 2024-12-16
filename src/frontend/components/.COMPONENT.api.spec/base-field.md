# Base Field Component

The BaseField component provides foundational functionality for form field containers.

## Class: BaseField

Extends `FASTElement`

### Properties

- `input: SlottableInput` - The input element contained in the field
- `labelSlot: Node[]` - Slotted label elements
- `messageSlot: Element[]` - Slotted message elements
- `slottedInputs: SlottableInput[]` - All slotted input elements

### Methods

- `setStates()` - Internal method to set component states
- `setValidationStates()` - Sets validation-related states

### Event Handlers

- `changeHandler(e: Event): boolean | void` - Handles change events
- `clickHandler(e: MouseEvent): boolean | void` - Handles click events
- `focusinHandler(e: FocusEvent): boolean | void` - Handles focus in events
- `focusoutHandler(e: FocusEvent): boolean | void` - Handles focus out events
- `invalidHandler(e: Event): boolean | void` - Handles invalid events

### Change Detection

- `inputChanged(prev: SlottableInput | undefined, next: SlottableInput | undefined)` - Handles input changes
- `labelSlotChanged(prev: Node[], next: Node[])` - Handles label slot changes
- `messageSlotChanged(prev: Element[], next: Element[])` - Handles message slot changes
- `slottedInputsChanged(prev: SlottableInput[] | undefined, next: SlottableInput[] | undefined)` - Handles slotted inputs changes

## Usage Example

```typescript
class CustomField extends BaseField {
  // Extend with additional functionality
}
```
