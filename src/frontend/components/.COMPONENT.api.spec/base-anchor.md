# Base Anchor Component

The BaseAnchor component provides core anchor/link functionality that can be extended by other components.

## Class: BaseAnchor

Extends `FASTElement`

### Properties

- `download?: string` - Specifies that the target will be downloaded
- `href?: string` - The URL that the hyperlink points to
- `hreflang?: string` - Language of the linked resource
- `ping?: string` - URLs to ping when following the link
- `referrerpolicy?: string` - Referrer policy for the link
- `rel: string` - Relationship between the current document and linked resource
- `target?: AnchorTarget` - Where to display the linked resource
- `type?: string` - MIME type of the linked resource

### Methods

- `clickHandler(e: PointerEvent): boolean` - Internal handler for click events
- `keydownHandler(e: KeyboardEvent): boolean | void` - Handles keyboard interactions
- `handleChange(source: any, propertyName: string)` - Internal method for handling changes

### Lifecycle Methods

- `connectedCallback()` - Called when element is inserted into DOM
- `disconnectedCallback()` - Called when element is removed from DOM

## Usage Example

```typescript
class CustomAnchor extends BaseAnchor {
  // Extend with additional functionality
}
```
