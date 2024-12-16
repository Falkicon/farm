# Text Input Component

The TextInput component provides a single-line text input field.

## Class: TextInput

Extends `BaseTextInput` and implements `StartEnd` interface

### Properties

- `appearance?: TextInputAppearance` - Visual style of the input
- `controlSize?: TextInputControlSize` - Size of the input control

### Methods

- `appearanceChanged(prev: TextInputAppearance | undefined, next: TextInputAppearance | undefined)`
- `controlSizeChanged(prev: TextInputControlSize | undefined, next: TextInputControlSize | undefined)`

## Types

### TextInputAppearance

```typescript
type TextInputAppearance = "outline" | "underline" | "filled-lighter" | "filled-darker"
```

### TextInputControlSize

```typescript
type TextInputControlSize = "small" | "medium" | "large"
```

### TextInputType

```typescript
type TextInputType = "email" | "password" | "tel" | "text" | "url"
```

### TextInputOptions

```typescript
type TextInputOptions = StartEndOptions<TextInput>
```

## Styles & Template

- `TextInputStyles: ElementStyles` - Styles for the text input
- `TextInputTemplate: ElementViewTemplate<TextInput>` - Template for rendering the text input

## Definition

```typescript
export const TextInputDefinition: FASTElementDefinition<typeof TextInput>
```

## Usage Example

```html
<fluent-text-input
  appearance="outline"
  control-size="medium"
  type="text"
  placeholder="Enter text..."
>
</fluent-text-input>
```
