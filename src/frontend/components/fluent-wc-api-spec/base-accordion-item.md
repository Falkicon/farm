# Base Accordion Item Component

The BaseAccordionItem component serves as the foundation for accordion items, providing core functionality for expandable/collapsible sections.

## Class: BaseAccordionItem

Extends `FASTElement`

### Properties

- `disabled: boolean` - Whether the accordion item is disabled
- `expanded: boolean` - Whether the accordion item is expanded
- `headinglevel: 1 | 2 | 3 | 4 | 5 | 6` - The heading level for accessibility
- `id: string` - Unique identifier for the accordion item
- `expandbutton: HTMLElement` - Internal reference to the expand/collapse button

### Methods

- `disabledChanged(prev: boolean, next: boolean)` - Handles changes to disabled state
- `expandedChanged(prev: boolean, next: boolean)` - Handles changes to expanded state

### Internal Properties

- `elementInternals: ElementInternals` - Provides access to element internals

## Usage Example

```typescript
class CustomAccordionItem extends BaseAccordionItem {
  // Extend with additional functionality
}
```

Note: This is a base component typically used as a foundation for building more specific accordion item implementations rather than being used directly.
