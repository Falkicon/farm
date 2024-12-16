# Base Tablist Component

The BaseTablist component provides foundational functionality for tab navigation systems.

## Class: BaseTablist

Extends `FASTElement`

### Properties

- `activeid: string` - ID of the active tab
- `activetab: HTMLElement` - Reference to the active tab element
- `disabled: boolean` - Whether the tablist is disabled
- `orientation: TablistOrientation` - Orientation of the tablist
- `tabs: HTMLElement[]` - Collection of tab elements

### Methods

- `adjust(adjustment: number)` - Adjusts the selected tab by index
- `setTabs()` - Protected method to set up tab elements
- `activeidChanged(oldValue: string, newValue: string)` - Handles active tab ID changes
- `disabledChanged(prev: boolean, next: boolean)` - Handles disabled state changes
- `orientationChanged(prev: TablistOrientation, next: TablistOrientation)` - Handles orientation changes
- `tabsChanged()` - Handles changes to tab collection

### Internal Properties

- `elementInternals: ElementInternals` - Provides access to element internals

### Lifecycle Methods

- `connectedCallback()` - Called when element is inserted into DOM

## Usage Example

```typescript
class CustomTablist extends BaseTablist {
  // Extend with additional functionality
}
```
