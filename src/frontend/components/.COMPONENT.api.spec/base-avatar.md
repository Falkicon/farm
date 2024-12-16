# Base Avatar Component

The BaseAvatar component provides foundational avatar functionality for displaying user or entity representations.

## Class: BaseAvatar

Extends `FASTElement`

### Properties

- `active?: AvatarActive` - Activity state of the avatar
- `initials?: string` - Initials to display when no image is available
- `name?: string` - Name associated with the avatar

### Internal Properties

- `elementInternals: ElementInternals` - Provides access to element internals

### Constructor

- Initializes element internals and sets up base functionality

## Usage Example

```typescript
class CustomAvatar extends BaseAvatar {
  // Extend with additional functionality
}
```

Note: This is a base component typically used as a foundation for building more specific avatar implementations.
