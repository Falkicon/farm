# Badge Component

The Badge component is used to highlight an item, attract attention, or flag status.

## Class: Badge

Extends `FASTElement` and implements `StartEnd` interface

### Properties

- `appearance: BadgeAppearance` - Visual style of the badge
- `color: BadgeColor` - Color scheme of the badge
- `shape?: BadgeShape` - Shape of the badge
- `size?: BadgeSize` - Size of the badge

### Methods

- `appearanceChanged(prev: BadgeAppearance | undefined, next: BadgeAppearance | undefined)`
- `colorChanged(prev: BadgeColor | undefined, next: BadgeColor | undefined)`
- `shapeChanged(prev: BadgeShape | undefined, next: BadgeShape | undefined)`
- `sizeChanged(prev: BadgeSize | undefined, next: BadgeSize | undefined)`

## Types

### BadgeAppearance

```typescript
type BadgeAppearance = "filled" | "ghost" | "outline" | "tint"
```

### BadgeColor

```typescript
type BadgeColor = "brand" | "danger" | "important" | "informative" | "severe" | "subtle" | "success" | "warning"
```

### BadgeShape

```typescript
type BadgeShape = "circular" | "rounded" | "square"
```

### BadgeSize

```typescript
type BadgeSize = "tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large"
```

## Styles & Template

- `BadgeStyles: ElementStyles` - Styles for the badge component
- `BadgeTemplate: ElementViewTemplate<Badge>` - Template for rendering the badge

## Definition

```typescript
export const BadgeDefinition: FASTElementDefinition<typeof Badge>
```

## Usage Example

```html
<fluent-badge
  appearance="filled"
  color="success"
  shape="rounded"
  size="medium"
>
  New
</fluent-badge>
```
