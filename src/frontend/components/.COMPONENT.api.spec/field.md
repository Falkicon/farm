# Field Component

The Field component provides a container for form inputs with labels and validation messages.

## Class: Field

Extends `BaseField`

### Properties

- `labelPosition: FieldLabelPosition` - Position of the field label

## Types

### FieldLabelPosition

```typescript
type FieldLabelPosition = "above" | "after" | "before"
```

## Styles & Template

- `FieldStyles: ElementStyles` - Styles for the field
- `FieldTemplate: ElementViewTemplate` - Template for rendering the field

## Definition

```typescript
export const FieldDefinition: FASTElementDefinition<typeof Field>
```

## Usage Example

```html
<fluent-field label-position="above">
  <label>Field Label</label>
  <fluent-text-input></fluent-text-input>
  <span>Helper text or validation message</span>
</fluent-field>
```
