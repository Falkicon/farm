# Menu Component

The Menu component provides a list of commands or options that users can choose from.

## Class: Menu

Extends `FASTElement`

### Properties

- `closeOnScroll?: boolean` - Whether to close menu on scroll
- `openOnContext?: boolean` - Whether to open on context menu
- `openOnHover?: boolean` - Whether to open on hover
- `persistOnItemClick?: boolean` - Whether to stay open after item click
- `split?: boolean` - Whether the menu is split
- `primaryAction: HTMLSlotElement` - Primary action slot reference
- `slottedMenuList: MenuList[]` - Slotted menu list elements
- `slottedTriggers: HTMLElement[]` - Slotted trigger elements

### Methods

- `closeMenu(event?: Event)` - Closes the menu
- `openMenu(e?: Event)` - Opens the menu
- `toggleMenu()` - Toggles menu state
- `focusMenuList()` - Focuses the menu list
- `focusTrigger()` - Focuses the trigger element
- `setComponent()` - Sets up component
- `toggleHandler(e: Event)` - Handles toggle events
- `menuKeydownHandler(e: KeyboardEvent): boolean | void` - Handles menu keydown events
- `triggerKeydownHandler(e: KeyboardEvent): boolean | void` - Handles trigger keydown events

### Lifecycle Methods

- `connectedCallback()` - Called when element is inserted into DOM
- `disconnectedCallback()` - Called when element is removed from DOM

## Styles & Template

- `MenuStyles: ElementStyles` - Styles for the menu
- `MenuTemplate: ElementViewTemplate<Menu>` - Template for rendering the menu

## Definition

```typescript
export const MenuDefinition: FASTElementDefinition<typeof Menu>
```

## Usage Example

```html
<fluent-menu>
  <fluent-button slot="trigger">Open Menu</fluent-button>
  <fluent-menu-list>
    <fluent-menu-item>Option 1</fluent-menu-item>
    <fluent-menu-item>Option 2</fluent-menu-item>
  </fluent-menu-list>
</fluent-menu>
```
