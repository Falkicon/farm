# Menu List Component

The MenuList component provides a container for menu items.

## Class: MenuList

Extends `FASTElement`

### Properties

- `items: HTMLElement[]` - Collection of menu items
- `menuItems: Element[] | undefined` - Collection of menu item elements

### Methods

- `focus()` - Focuses the menu list
- `handleChange(source: any, propertyName: string)` - Handles changes
- `handleFocusOut(e: FocusEvent)` - Handles focus out events
- `handleMenuKeyDown(e: KeyboardEvent): void | boolean` - Handles keydown events
- `isMenuItemElement(el: Element): el is HTMLElement` - Type guard for menu items
- `isNestedMenu(): boolean` - Checks if menu is nested
- `setItems()` - Sets up menu items

### Change Detection

- `itemsChanged(oldValue: HTMLElement[], newValue: HTMLElement[])` - Handles items changes

### Lifecycle Methods

- `connectedCallback()` - Called when element is inserted into DOM
- `disconnectedCallback()` - Called when element is removed from DOM

## Usage Example

```html
<fluent-menu-list>
  <fluent-menu-item>Option 1</fluent-menu-item>
  <fluent-menu-item>Option 2</fluent-menu-item>
  <fluent-menu-item>Option 3</fluent-menu-item>
</fluent-menu-list>
```
