# Base Rating Display Component

The BaseRatingDisplay component provides foundational functionality for displaying ratings.

## Class: BaseRatingDisplay

Extends `FASTElement`

### Properties

- `count?: number` - Number of ratings
- `iconViewBox?: string` - ViewBox attribute for rating icons
- `max?: number` - Maximum rating value
- `value?: number` - Current rating value
- `formattedCount: string` - Formatted display of rating count

### Methods

- `generateIcons(): string` - Generates rating icons based on value
- `getMaxIcons(): number` - Gets maximum number of icons to display
- `getSelectedValue(): number` - Gets the currently selected rating value

### Internal Properties

- `elementInternals: ElementInternals` - Provides access to element internals
- `slottedIcon: HTMLElement[]` - Slotted icon elements

### Event Handlers

- `slottedIconChanged()` - Handles changes to slotted icons

## Usage Example

```typescript
class CustomRatingDisplay extends BaseRatingDisplay {
  // Extend with additional functionality
}
```
