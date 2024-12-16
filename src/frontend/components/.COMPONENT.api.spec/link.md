# Link Component

The Link component provides a styled anchor element with enhanced functionality.

## Class: Link

Extends `BaseAnchor`

### Properties

- `appearance?: LinkAppearance` - Visual style of the link
- `inline: boolean` - Whether the link should be displayed inline

### Methods

- `appearanceChanged(prev: LinkAppearance | undefined, next: LinkAppearance | undefined)`
- `inlineChanged(prev: boolean, next: boolean)`

## Types

### LinkAppearance

```typescript
type LinkAppearance = "subtle"
```

### LinkTarget

```typescript
type LinkTarget = "_self" | "_blank" | "_parent" | "_top"
```

## Styles & Template

- `LinkStyles: ElementStyles` - Styles for the link
- `LinkTemplate: ElementViewTemplate<Link>` - Template for rendering the link

## Definition

```typescript
export const LinkDefinition: FASTElementDefinition<typeof Link>
```

## Usage Example

```html
<fluent-link
  href="https://example.com"
  appearance="subtle"
  target="_blank"
>
  Visit Website
</fluent-link>
```
