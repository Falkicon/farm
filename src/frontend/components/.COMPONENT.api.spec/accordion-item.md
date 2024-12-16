# Accordion Item Component

The AccordionItem component represents an individual expandable/collapsible section within an Accordion.

## Class: AccordionItem

Extends `BaseAccordionItem` and implements `StartEnd` interface

### Properties

- `block: boolean` - Controls block styling
- `markerPosition?: AccordionItemMarkerPosition` - Position of the expand/collapse marker
- `size?: AccordionItemSize` - Size of the accordion item

### Methods

- `blockChanged(prev: boolean, next: boolean)` - Handles changes to block property
- `markerPositionChanged(prev: AccordionItemMarkerPosition | undefined, next: AccordionItemMarkerPosition | undefined)` - Handles changes to marker position
- `sizeChanged(prev: AccordionItemSize | undefined, next: AccordionItemSize | undefined)` - Handles changes to size

## Types

### AccordionItemMarkerPosition

```typescript
type AccordionItemMarkerPosition = "start" | "end"
```

### AccordionItemSize

```typescript
type AccordionItemSize = "small" | "medium" | "large" | "extra-large"
```

### AccordionItemOptions

```typescript
type AccordionItemOptions = StartEndOptions<AccordionItem> & {
    expandedIcon?: StaticallyComposableHTML<AccordionItem>;
    collapsedIcon?: StaticallyComposableHTML<AccordionItem>;
}
```

## Styles & Template

- `accordionItemStyles: ElementStyles` - Styles for the accordion item
- `accordionItemTemplate: ElementViewTemplate<AccordionItem>` - Template for rendering the accordion item

## Definition

```typescript
export const accordionItemDefinition: FASTElementDefinition<typeof AccordionItem>
```

## Usage Example

```html
<fluent-accordion-item>
  <span slot="heading">Heading Text</span>
  <div>Content goes here</div>
</fluent-accordion-item>
```
