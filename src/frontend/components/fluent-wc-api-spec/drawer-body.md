# Drawer Body Component

The DrawerBody component provides the content container for a drawer.

## Class: DrawerBody

Extends `FASTElement`

## Styles & Template

- `DrawerBodyStyles: ElementStyles` - Styles for the drawer body
- `DrawerBodyTemplate: ElementViewTemplate<DrawerBody>` - Template for rendering the drawer body

## Definition

```typescript
export const DrawerBodyDefinition: FASTElementDefinition<typeof DrawerBody>
```

## Usage Example

```html
<fluent-drawer>
  <fluent-drawer-body>
    <h2>Drawer Title</h2>
    <p>Drawer content goes here.</p>
  </fluent-drawer-body>
</fluent-drawer>
```
