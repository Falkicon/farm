# Menu Item Component

The MenuItem component represents a selectable item within a menu.

## Class: MenuItem

Extends `FASTElement` and implements `StartEnd` interface

### Properties

- `checked: boolean` - Whether the item is checked
- `disabled: boolean` - Whether the item is disabled
- `hidden: boolean` - Whether the item is hidden
- `role: MenuItemRole` - ARIA role of the menu item
- `submenu: HTMLElement | undefined` - Reference to submenu element

### Methods

- `checkedChanged(prev: boolean, next: boolean)` - Handles checked state changes
- `disabledChanged(prev: boolean | undefined, next: boolean | undefined)` - Handles disabled state changes
- `roleChanged(prev: MenuItemRole | undefined, next: MenuItemRole | undefined)` - Handles role changes
- `setSubmenuPosition()` - Sets submenu positioning
- `toggleHandler(e: Event)` - Handles toggle events

### Event Handlers

- `handleMenuItemClick(e: MouseEvent): boolean`
- `handleMenuItemKeyDown(e: KeyboardEvent): boolean`
- `handleMouseOver(e: MouseEvent): boolean`
- `handleMouseOut(e: MouseEvent): boolean`

## Types

### MenuItemRole

```typescript
type MenuItemRole = "menuitem" | "menuitemcheckbox" | "menuitemradio"
```

### MenuItemOptions

```typescript
type MenuItemOptions = StartEndOptions<MenuItem> & {
    indicator?: StaticallyComposableHTML<MenuItem>;
    submenuGlyph?: StaticallyComposableHTML<MenuItem>;
}
```

## Usage Example

```html
<fluent-menu-item
  role="menuitem"
  checked
>
  <span>Menu Item Text</span>
</fluent-menu-item>
```
