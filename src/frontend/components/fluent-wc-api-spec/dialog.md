# Dialog Component

The Dialog component provides a modal or non-modal dialog window.

## Class: Dialog

Extends `FASTElement`

### Properties

- `ariaDescribedby?: string` - ID of element describing the dialog
- `ariaLabelledby?: string` - ID of element labeling the dialog
- `dialog: HTMLDialogElement` - Reference to native dialog element
- `type: DialogType` - Type of dialog behavior

### Methods

- `show()` - Shows the dialog
- `hide()` - Hides the dialog
- `clickHandler(event: Event): boolean` - Handles click events
- `emitBeforeToggle()` - Emits event before visibility changes
- `emitToggle()` - Emits event when visibility changes

## Types

### DialogType

```typescript
type DialogType = "modal" | "non-modal" | "alert"
```

## Styles & Template

- `DialogStyles: ElementStyles` - Styles for the dialog
- `DialogTemplate: ElementViewTemplate<Dialog>` - Template for rendering the dialog

## Definition

```typescript
export const DialogDefinition: FASTElementDefinition<typeof Dialog>
```

## Usage Example

```html
<fluent-dialog type="modal">
  <h2>Dialog Title</h2>
  <p>Dialog content goes here.</p>
  <button onclick="this.parentElement.hide()">Close</button>
</fluent-dialog>
```
