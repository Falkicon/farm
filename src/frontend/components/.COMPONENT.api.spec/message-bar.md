# Message Bar Component

The MessageBar component displays status, warning, or error messages.

## Class: MessageBar

Extends `FASTElement`

### Properties

- `intent?: MessageBarIntent` - Type of message to display
- `layout?: MessageBarLayout` - Layout style of the message bar
- `shape?: MessageBarShape` - Shape of the message bar

### Methods

- `dismissMessageBar()` - Dismisses the message bar
- `intentChanged(prev: MessageBarIntent | undefined, next: MessageBarIntent | undefined)`
- `layoutChanged(prev: MessageBarLayout | undefined, next: MessageBarLayout | undefined)`
- `shapeChanged(prev: MessageBarShape | undefined, next: MessageBarShape | undefined)`

## Types

### MessageBarIntent

```typescript
type MessageBarIntent = "success" | "warning" | "error" | "info"
```

### MessageBarLayout

```typescript
type MessageBarLayout = "multiline" | "singleline"
```

### MessageBarShape

```typescript
type MessageBarShape = "rounded" | "square"
```

## Styles & Template

- `MessageBarStyles: ElementStyles` - Styles for the message bar
- `MessageBarTemplate: ElementViewTemplate<MessageBar>` - Template for rendering the message bar

## Definition

```typescript
export const MessageBarDefinition: FASTElementDefinition<typeof MessageBar>
```

## Usage Example

```html
<fluent-message-bar
  intent="warning"
  layout="multiline"
  shape="rounded"
>
  <span>Warning: Please review your input and try again.</span>
</fluent-message-bar>
```
