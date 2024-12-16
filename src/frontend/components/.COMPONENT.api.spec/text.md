# Text Component

The Text component provides styled text with various formatting options.

## Class: Text

Extends `FASTElement`

### Properties

- `align?: TextAlign` - Text alignment
- `block: boolean` - Whether to display as block element
- `font?: TextFont` - Font family
- `italic: boolean` - Whether text is italicized
- `nowrap: boolean` - Whether to prevent text wrapping
- `size?: TextSize` - Text size
- `strikethrough: boolean` - Whether text has strikethrough
- `truncate: boolean` - Whether to truncate overflow text
- `underline: boolean` - Whether text is underlined
- `weight?: TextWeight` - Font weight

### Methods

- `alignChanged(prev: TextAlign | undefined, next: TextAlign | undefined)`
- `fontChanged(prev: TextFont | undefined, next: TextFont | undefined)`
- `sizeChanged(prev: TextSize | undefined, next: TextSize | undefined)`
- `weightChanged(prev: TextWeight | undefined, next: TextWeight | undefined)`

## Types

### TextAlign

```typescript
type TextAlign = "start" | "end" | "center" | "justify"
```

### TextFont

```typescript
type TextFont = "base" | "numeric" | "monospace"
```

### TextSize

```typescript
type TextSize = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "1000"
```

### TextWeight

```typescript
type TextWeight = "medium" | "regular" | "semibold" | "bold"
```

## Styles & Template

- `TextStyles: ElementStyles` - Styles for the text
- `TextTemplate: ElementViewTemplate<Text>` - Template for rendering the text

## Definition

```typescript
export const TextDefinition: FASTElementDefinition<typeof Text>
```

## Usage Example

```html
<fluent-text
  size="400"
  weight="semibold"
  align="center"
>
  Styled Text Content
</fluent-text>
```
