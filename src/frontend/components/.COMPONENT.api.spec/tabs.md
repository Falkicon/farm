# Tabs Component

The Tabs component provides a complete tabs interface with panels.

## Class: Tabs

Extends `BaseTabs` and implements `StartEnd` interface

### Properties

- `appearance?: TabsAppearance` - Visual style of the tabs
- `disabled?: boolean` - Whether the tabs are disabled
- `size?: TabsSize` - Size of the tabs

### Methods

- `activeidChanged(oldValue: string, newValue: string)` - Handles active tab ID changes
- `tabsChanged()` - Handles changes to tab collection

## Types

### TabsAppearance

```typescript
type TabsAppearance = "subtle" | "transparent"
```

### TabsSize

```typescript
type TabsSize = "small" | "medium" | "large"
```

### TabsOrientation

```typescript
type TabsOrientation = "horizontal" | "vertical"
```

### TabsOptions

```typescript
type TabsOptions = StartEndOptions<Tabs>
```

## Styles & Template

- `TabsStyles: ElementStyles` - Styles for the tabs
- `TabsTemplate: ElementViewTemplate<Tabs>` - Template for rendering the tabs

## Definition

```typescript
export const TabsDefinition: FASTElementDefinition<typeof Tabs>
```

## Usage Example

```html
<fluent-tabs
  appearance="subtle"
  size="medium"
>
  <fluent-tab id="tab1">Tab 1</fluent-tab>
  <fluent-tab id="tab2">Tab 2</fluent-tab>
  <fluent-tab-panel id="panel1">Content 1</fluent-tab-panel>
  <fluent-tab-panel id="panel2">Content 2</fluent-tab-panel>
</fluent-tabs>
```
