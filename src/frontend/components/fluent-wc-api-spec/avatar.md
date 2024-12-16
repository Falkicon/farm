# Avatar Component

The Avatar component is a graphical representation of a user or entity that can display an image, initials, or icon.

## Class: Avatar

Extends `BaseAvatar`

### Properties

- `appearance?: AvatarAppearance` - Visual appearance of the avatar
- `color?: AvatarColor` - Color scheme of the avatar
- `colorId?: AvatarNamedColor` - Specific named color for the avatar
- `static colors` - Array of available color names

### Methods

- `generateColor()` - Internal method to generate avatar color
- `generateInitials()` - Internal method to generate initials from name
- `handleChange(source: any, propertyName: string)` - Internal method to handle changes

## Types

### AvatarAppearance

```typescript
type AvatarAppearance = "ring" | "shadow" | "ring-shadow"
```

### AvatarActive

```typescript
type AvatarActive = "active" | "inactive"
```

### AvatarShape

```typescript
type AvatarShape = "circular" | "square"
```

### AvatarSize

```typescript
type AvatarSize = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128
```

### AvatarNamedColor

Available named colors for the avatar (includes colors like "anchor", "beige", "blue", etc.)

## Styles & Template

- `AvatarStyles: ElementStyles` - Styles for the avatar component
- `AvatarTemplate: ElementViewTemplate<Avatar>` - Template for rendering the avatar

## Definition

```typescript
export const AvatarDefinition: FASTElementDefinition<typeof Avatar>
```

## Usage Example

```html
<fluent-avatar
  name="John Doe"
  size="48"
  appearance="ring"
  color="blue"
>
</fluent-avatar>
```
