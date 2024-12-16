# Image Component

The Image component provides an enhanced image element with additional styling capabilities.

## Class: Image

Extends `FASTElement`

### Properties

- `block?: boolean` - Whether the image should be displayed as a block element
- `bordered?: boolean` - Whether to show a border around the image
- `fit?: ImageFit` - How the image should fit its container
- `shadow?: boolean` - Whether to apply a shadow effect
- `shape?: ImageShape` - Shape of the image container

### Methods

- `blockChanged(prev: boolean, next: boolean)`
- `borderedChanged(prev: boolean, next: boolean)`
- `fitChanged(prev: ImageFit | undefined, next: ImageFit | undefined)`
- `shadowChanged(prev: boolean, next: boolean)`
- `shapeChanged(prev: ImageShape | undefined, next: ImageShape | undefined)`

## Types

### ImageFit

```typescript
type ImageFit = "none" | "center" | "contain" | "cover"
```

### ImageShape

```typescript
type ImageShape = "circular" | "rounded" | "square"
```

## Styles & Template

- `ImageStyles: ElementStyles` - Styles for the image
- `ImageTemplate: ElementViewTemplate<Image>` - Template for rendering the image

## Definition

```typescript
export const ImageDefinition: FASTElementDefinition<typeof Image>
```

## Usage Example

```html
<fluent-image
  src="path/to/image.jpg"
  alt="Description"
  shape="rounded"
  fit="cover"
  shadow
>
</fluent-image>
```
