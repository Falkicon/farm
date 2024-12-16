# Tooltip Component

The Tooltip component provides contextual information in a floating element.

## Class: Tooltip

Extends `FASTElement`

### Properties

- `anchor: string` - ID of the element the tooltip is anchored to
- `delay?: number` - Delay before showing tooltip
- `id: string` - Unique identifier for the tooltip
- `positioning?: TooltipPositioningOption` - Position relative to anchor

### Methods

- `showTooltip(delay?: number)` - Shows the tooltip
- `hideTooltip(delay?: number)` - Hides the tooltip
- `blurAnchorHandler()` - Handles anchor blur events
- `focusAnchorHandler()` - Handles anchor focus events
- `mouseenterAnchorHandler()` - Handles anchor mouse enter
- `mouseleaveAnchorHandler()` - Handles anchor mouse leave

## Types

### TooltipPositioningOption

```typescript
type TooltipPositioningOption = {
    'above-start': "block-start span-inline-end";
    'above': "block-start";
    'above-end': "block-start span-inline-start";
    'below-start': "block-end span-inline-end";
    'below': "block-end";
    'below-end': "block-end span-inline-start";
    'before-top': "inline-start span-block-end";
    'before': "inline-start";
    'before-bottom': "inline-start span-block-start";
    'after-top': "inline-end span-block-end";
    'after': "inline-end";
    'after-bottom': "inline-end span-block-start";
}
```

## Styles & Template

- `TooltipStyles: ElementStyles` - Styles for the tooltip
- `TooltipTemplate: ViewTemplate<Tooltip>` - Template for rendering the tooltip

## Definition

```typescript
export const TooltipDefinition: FASTElementDefinition<typeof Tooltip>
```

## Usage Example

```html
<fluent-button id="button1">Hover Me</fluent-button>
<fluent-tooltip
  anchor="button1"
  positioning="above"
  delay="300"
>
  Tooltip Content
</fluent-tooltip>
```
