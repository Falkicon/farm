# Tab Component

The Tab component represents a selectable tab within a tablist.

## Class: Tab

Extends `FASTElement` and implements `StartEnd` interface

### Properties

- `disabled: boolean` - Whether the tab is disabled

### Lifecycle Methods

- `connectedCallback()` - Called when element is inserted into DOM

## Types

### TabOptions

```typescript
type TabOptions = StartEndOptions<Tab>
```

## Styles & Template

- `TabStyles: ElementStyles` - Styles for the tab
- `TabTemplate: ElementViewTemplate<Tab>` - Template for rendering the tab

## Definition

```typescript
export const TabDefinition: FASTElementDefinition<typeof Tab>
```

## Usage Example

```html
<fluent-tab
  id="tab1"
  aria-controls="panel1"
>
  Tab 1
</fluent-tab>
```
