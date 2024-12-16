# Tab Panel Component

The TabPanel component represents the content panel associated with a tab.

## Class: TabPanel

Extends `FASTElement`

## Styles & Template

- `TabPanelStyles: ElementStyles` - Styles for the tab panel
- `TabPanelTemplate: ElementViewTemplate<TabPanel>` - Template for rendering the tab panel

## Definition

```typescript
export const TabPanelDefinition: FASTElementDefinition<typeof TabPanel>
```

## Usage Example

```html
<fluent-tab-panel
  id="panel1"
  role="tabpanel"
  aria-labelledby="tab1"
>
  Panel 1 Content
</fluent-tab-panel>
```
