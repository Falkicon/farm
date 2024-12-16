# Menu Button Component

The MenuButton component provides a button that can trigger a menu.

## Class: MenuButton

Extends `Button`

### Properties

Inherits all properties from Button component, with the same appearance, shape, and size options.

## Types

### MenuButtonAppearance

```typescript
type MenuButtonAppearance = "primary" | "outline" | "subtle" | "transparent"
```

### MenuButtonShape

```typescript
type MenuButtonShape = "circular" | "rounded" | "square"
```

### MenuButtonSize

```typescript
type MenuButtonSize = "small" | "medium" | "large"
```

## Styles & Template

- `MenuButtonTemplate: ElementViewTemplate<MenuButton>` - Template for rendering the menu button

## Definition

```typescript
export const MenuButtonDefinition: FASTElementDefinition<typeof MenuButton>
```

## Usage Example

```html
<fluent-menu-button
  appearance="primary"
  shape="rounded"
  size="medium"
>
  Menu Options
</fluent-menu-button>
```
