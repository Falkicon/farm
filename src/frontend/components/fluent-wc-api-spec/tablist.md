# Tablist Component

The Tablist component provides a container for a set of tabs.

## Class: Tablist

Extends `BaseTablist`

### Properties

- `appearance?: TablistAppearance` - Visual style of the tablist
- `size?: TablistSize` - Size of the tablist

### Methods

- `activeidChanged(oldValue: string, newValue: string)` - Handles active tab ID changes
- `appearanceChanged(prev: TablistAppearance, next: TablistAppearance)` - Handles appearance changes
- `sizeChanged(prev: TablistSize, next: TablistSize)` - Handles size changes
- `tabsChanged()` - Handles changes to tab collection

## Types

### TablistAppearance

```typescript
type TablistAppearance = "subtle" | "transparent"
```

### TablistSize

```typescript
type TablistSize = "small" | "medium" | "large"
```

### TablistOrientation

```typescript
type TablistOrientation = "horizontal" | "vertical"
```

## Styles & Template

- `TablistStyles: ElementStyles` - Styles for the tablist
- `TablistTemplate: ViewTemplate<Tablist>` - Template for rendering the tablist

## Definition

```typescript
export const TablistDefinition: FASTElementDefinition<typeof Tablist>
```

## Usage Example

```html
<fluent-tablist
  appearance="subtle"
  size="medium"
  orientation="horizontal"
>
  <fluent-tab>Tab 1</fluent-tab>
  <fluent-tab>Tab 2</fluent-tab>
</fluent-tablist>
```
