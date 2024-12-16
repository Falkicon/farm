# Drawer Component

The Drawer component provides a sliding panel that can appear from the edge of the screen.

## Class: Drawer

Extends `FASTElement`

### Properties

- `ariaDescribedby?: string` - ID of element describing the drawer
- `ariaLabelledby?: string` - ID of element labeling the drawer
- `dialog: HTMLDialogElement` - Reference to native dialog element
- `position: DrawerPosition` - Position from which the drawer appears
- `size: DrawerSize` - Size of the drawer
- `type: DrawerType` - Type of drawer behavior

### Methods

- `show()` - Shows the drawer
- `hide()` - Hides the drawer
- `clickHandler(event: Event): boolean` - Handles click events
- `emitBeforeToggle()` - Emits event before visibility changes
- `emitToggle()` - Emits event when visibility changes

## Types

### DrawerPosition

```typescript
type DrawerPosition = "start" | "end"
```

### DrawerSize

```typescript
type DrawerSize = "small" | "medium" | "large" | "full"
```

### DrawerType

```typescript
type DrawerType = "modal" | "non-modal" | "inline"
```

## Styles & Template

- `DrawerStyles: ElementStyles` - Styles for the drawer
- `DrawerTemplate: ElementViewTemplate<Drawer>` - Template for rendering the drawer

## Definition

```typescript
export const DrawerDefinition: FASTElementDefinition<typeof Drawer>
```

## Usage Example

```html
<fluent-drawer
  type="modal"
  position="end"
  size="medium"
>
  <h2>Drawer Title</h2>
  <p>Drawer content goes here.</p>
  <button onclick="this.parentElement.hide()">Close</button>
</fluent-drawer>
```
