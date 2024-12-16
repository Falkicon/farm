# Label Component

The Label component provides a styled label element for form controls.

## Class: Label

Extends `FASTElement`

### Properties

- `disabled: boolean` - Whether the label is disabled
- `required: boolean` - Whether to show required indicator
- `size?: LabelSize` - Size of the label
- `weight?: LabelWeight` - Font weight of the label

### Methods

- `disabledChanged(prev: boolean | undefined, next: boolean | undefined)`
- `sizeChanged(prev: LabelSize | undefined, next: LabelSize | undefined)`
- `weightChanged(prev: LabelWeight | undefined, next: LabelWeight | undefined)`

## Types

### LabelSize

```typescript
type LabelSize = "small" | "medium" | "large"
```

### LabelWeight

```typescript
type LabelWeight = "regular" | "semibold"
```

## Styles & Template

- `LabelStyles: ElementStyles` - Styles for the label
- `LabelTemplate: ElementViewTemplate<Label>` - Template for rendering the label

## Definition

```typescript
export const LabelDefinition: FASTElementDefinition<typeof Label>
```

## Usage Example

```html
<fluent-label
  size="medium"
  weight="semibold"
  required
>
  Form Field Label
</fluent-label>
```
