# Rating Display Component

The RatingDisplay component provides a read-only display of ratings using icons.

## Class: RatingDisplay

Extends `BaseRatingDisplay`

### Properties

- `color?: RatingDisplayColor` - Color scheme of the rating display
- `compact: boolean` - Whether to use compact layout
- `size?: RatingDisplaySize` - Size of the rating display

### Methods

- `colorChanged(prev: RatingDisplayColor | undefined, next: RatingDisplayColor | undefined)`
- `sizeChanged(prev: RatingDisplaySize | undefined, next: RatingDisplaySize | undefined)`
- `getMaxIcons()` - Override to get maximum number of icons
- `getSelectedValue()` - Override to get selected rating value

## Types

### RatingDisplayColor

```typescript
type RatingDisplayColor = "neutral" | "brand" | "marigold"
```

### RatingDisplaySize

```typescript
type RatingDisplaySize = "small" | "medium" | "large"
```

## Styles & Template

- `RatingDisplayStyles: ElementStyles` - Styles for the rating display
- `RatingDisplayTemplate: ElementViewTemplate<RatingDisplay>` - Template for rendering the rating display

## Definition

```typescript
export const RatingDisplayDefinition: FASTElementDefinition<typeof RatingDisplay>
```

## Usage Example

```html
<fluent-rating-display
  value="4"
  max="5"
  color="brand"
  size="medium"
>
</fluent-rating-display>
```
