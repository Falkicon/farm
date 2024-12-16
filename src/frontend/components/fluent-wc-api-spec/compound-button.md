# Compound Button Component

The CompoundButton component extends the standard button with support for secondary content.

## Class: CompoundButton

Extends `Button`

### Properties

Inherits all properties from Button component, with the same appearance, shape, and size options.

## Types

### CompoundButtonAppearance

```typescript
type CompoundButtonAppearance = "primary" | "outline" | "subtle" | "transparent"
```

### CompoundButtonShape

```typescript
type CompoundButtonShape = "circular" | "rounded" | "square"
```

### CompoundButtonSize

```typescript
type CompoundButtonSize = "small" | "medium" | "large"
```

## Styles & Template

- `CompoundButtonStyles: ElementStyles` - Styles for the compound button
- `CompoundButtonTemplate: ElementViewTemplate<CompoundButton>` - Template for rendering the compound button

## Definition

```typescript
export const CompoundButtonDefinition: FASTElementDefinition<typeof CompoundButton>
```

## Usage Example

```html
<fluent-compound-button appearance="primary">
  Primary Text
  <span slot="description">Secondary description text</span>
</fluent-compound-button>
```
