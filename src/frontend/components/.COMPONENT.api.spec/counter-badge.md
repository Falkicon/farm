# Counter Badge Component

The CounterBadge component displays a numerical value or status indicator.

## Class: CounterBadge

Extends `FASTElement` and implements `StartEnd` interface

### Properties

- `appearance?: CounterBadgeAppearance` - Visual style of the badge
- `color?: CounterBadgeColor` - Color scheme of the badge
- `count: number` - Numerical value to display
- `dot: boolean` - Whether to display as a dot instead of a number
- `overflowCount: number` - Maximum value before showing overflow indicator
- `shape?: CounterBadgeShape` - Shape of the badge
- `showZero: boolean` - Whether to show when count is zero
- `size?: CounterBadgeSize` - Size of the badge

### Methods

- `setCount(): string | void` - Internal method to format count display
- `appearanceChanged(prev: CounterBadgeAppearance | undefined, next: CounterBadgeAppearance | undefined)`
- `colorChanged(prev: CounterBadgeColor | undefined, next: CounterBadgeColor | undefined)`
- `dotChanged(prev: boolean | undefined, next: boolean | undefined)`
- `shapeChanged(prev: CounterBadgeShape | undefined, next: CounterBadgeShape | undefined)`
- `sizeChanged(prev: CounterBadgeSize | undefined, next: CounterBadgeSize | undefined)`

## Types

### CounterBadgeAppearance

```typescript
type CounterBadgeAppearance = "filled" | "ghost"
```

### CounterBadgeColor

```typescript
type CounterBadgeColor = "brand" | "danger" | "important" | "informative" | "severe" | "subtle" | "success" | "warning"
```

### CounterBadgeShape

```typescript
type CounterBadgeShape = "circular" | "rounded"
```

### CounterBadgeSize

```typescript
type CounterBadgeSize = "tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large"
```

## Usage Example

```html
<fluent-counter-badge
  appearance="filled"
  color="brand"
  count="5"
  shape="circular"
  size="medium"
>
</fluent-counter-badge>
```
