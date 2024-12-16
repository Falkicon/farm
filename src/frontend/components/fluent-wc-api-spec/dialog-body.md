# Dialog Body Component

The DialogBody component provides the content container for a dialog.

## Class: DialogBody

Extends `FASTElement`

### Properties

- `noTitleAction: boolean` - Whether to hide the title action area

## Styles & Template

- `DialogBodyStyles: ElementStyles` - Styles for the dialog body
- `DialogBodyTemplate: ElementViewTemplate` - Template for rendering the dialog body

## Definition

```typescript
export const DialogBodyDefinition: FASTElementDefinition<typeof DialogBody>
```

## Usage Example

```html
<fluent-dialog>
  <fluent-dialog-body>
    <h2>Dialog Title</h2>
    <p>Dialog content goes here.</p>
  </fluent-dialog-body>
</fluent-dialog>
```
