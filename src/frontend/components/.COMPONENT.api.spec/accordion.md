# Accordion Component

The Accordion component is a vertically stacked set of interactive headings that each reveal a section of content.

## Class: Accordion

Extends `FASTElement`

### Properties

- `expandmode: AccordionExpandMode` - Controls how many panels can be expanded at once
- `accordionItems: Element[]` - Internal array of accordion item elements
- `slottedAccordionItems: HTMLElement[]` - Array of slotted accordion items

### Methods

- `handleChange(source: any, propertyName: string)` - Internal method to handle changes
- `slottedAccordionItemsChanged(oldValue: HTMLElement[], newValue: HTMLElement[])` - Handles changes to slotted items

## Types

### AccordionExpandMode

```typescript
type AccordionExpandMode = "single" | "multi"
```

- `single` - Only one panel can be expanded at a time
- `multi` - Multiple panels can be expanded simultaneously

## Styles & Template

- `accordionStyles: ElementStyles` - Styles for the accordion component
- `accordionTemplate: ElementViewTemplate<Accordion>` - Template for rendering the accordion

## Definition

```typescript
export const accordionDefinition: FASTElementDefinition<typeof Accordion>
```

## Usage Example

```html
<fluent-accordion expandmode="single">
  <fluent-accordion-item>
    <span slot="heading">Panel 1</span>
    Content 1
  </fluent-accordion-item>
  <fluent-accordion-item>
    <span slot="heading">Panel 2</span>
    Content 2
  </fluent-accordion-item>
</fluent-accordion>
```
