# Text Area Component

The TextArea component provides a multiline text input field.

## Class: TextArea

Extends `BaseTextArea`

### Properties

- `appearance: TextAreaAppearance` - Visual style of the text area
- `block: boolean` - Whether to display as block element
- `size?: TextAreaSize` - Size of the text area

### Methods

- `appearanceChanged(prev: TextAreaAppearance | undefined, next: TextAreaAppearance | undefined)`
- `blockChanged()` - Handles block property changes
- `sizeChanged(prev: TextAreaSize | undefined, next: TextAreaSize | undefined)`

## Types

### TextAreaAppearance

```typescript
type TextAreaAppearance = "outline" | "filled-lighter" | "filled-darker"
```

### TextAreaSize

```typescript
type TextAreaSize = "small" | "medium" | "large"
```

### TextAreaAutocomplete

```typescript
type TextAreaAutocomplete = "on" | "off"
```

## Styles & Template

- `TextAreaStyles: ElementStyles` - Styles for the text area
- `TextAreaTemplate: ElementViewTemplate<TextArea>` - Template for rendering the text area

## Definition

```typescript
export const TextAreaDefinition: FASTElementDefinition<typeof TextArea>
```

## Usage Example

```html
<fluent-text-area
  appearance="outline"
  size="medium"
  placeholder="Enter text here..."
>
</fluent-text-area>
```
