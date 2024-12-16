# Anchor Button Component

The AnchorButton component combines the styling of a button with the functionality of an anchor/link element.

## Class: AnchorButton

Extends `BaseAnchor` and implements `StartEnd` interface

### Properties

- `appearance?: AnchorButtonAppearance` - Visual appearance of the button
- `iconOnly: boolean` - Whether the button contains only an icon
- `shape?: AnchorButtonShape` - Shape of the button
- `size?: AnchorButtonSize` - Size of the button

### Methods

- `appearanceChanged(prev: AnchorButtonAppearance | undefined, next: AnchorButtonAppearance | undefined)`
- `iconOnlyChanged(prev: boolean, next: boolean)`
- `shapeChanged(prev: AnchorButtonShape | undefined, next: AnchorButtonShape | undefined)`
- `sizeChanged(prev: AnchorButtonSize | undefined, next: AnchorButtonSize | undefined)`

## Types

### AnchorButtonAppearance

```typescript
type AnchorButtonAppearance = "primary" | "outline" | "subtle" | "transparent"
```

### AnchorButtonShape

```typescript
type AnchorButtonShape = "circular" | "rounded" | "square"
```

### AnchorButtonSize

```typescript
type AnchorButtonSize = "small" | "medium" | "large"
```

### AnchorTarget

```typescript
type AnchorTarget = "_self" | "_blank" | "_parent" | "_top"
```

## Styles & Template

- `AnchorButtonTemplate: ElementViewTemplate<AnchorButton>` - Template for rendering the anchor button

## Definition

```typescript
export const AnchorButtonDefinition: FASTElementDefinition<typeof AnchorButton>
```

## Usage Example

```html
<fluent-anchor-button
  appearance="primary"
  href="https://example.com"
  target="_blank"
>
  Visit Website
</fluent-anchor-button>
```
