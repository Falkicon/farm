# Divider Component

The Divider component provides a visual separator between content sections.

## Class: Divider

Extends `BaseDivider`

### Properties

- `alignContent?: DividerAlignContent` - Alignment of content within the divider
- `appearance?: DividerAppearance` - Visual style of the divider
- `inset?: boolean` - Whether the divider is inset from the edges

### Methods

- `alignContentChanged(prev: DividerAlignContent | undefined, next: DividerAlignContent | undefined)`
- `appearanceChanged(prev: DividerAppearance | undefined, next: DividerAppearance | undefined)`
- `insetChanged(prev: boolean, next: boolean)`

## Types

### DividerAlignContent

```typescript
type DividerAlignContent = "center" | "start" | "end"
```

### DividerAppearance

```typescript
type DividerAppearance = "strong" | "brand" | "subtle"
```

### DividerOrientation

```typescript
type DividerOrientation = "horizontal" | "vertical"
```

## Styles & Template

- `DividerStyles: ElementStyles` - Styles for the divider
- `DividerTemplate: ElementViewTemplate<Divider>` - Template for rendering the divider

## Definition

```typescript
export const DividerDefinition: FASTElementDefinition<typeof Divider>
```

## Usage Example

```html
<fluent-divider
  appearance="subtle"
  align-content="center"
  orientation="horizontal"
>
  <span>Section Divider</span>
</fluent-divider>
```
