# Utility Types and Constants

## Display Utilities

```typescript
function display(displayValue: CSSDisplayPropertyValue): string
```

## Media Query Behaviors

### MatchMediaBehavior

Base class for media query-based behaviors.

```typescript
abstract class MatchMediaBehavior implements HostBehavior {
    constructor(query: MediaQueryList);
    protected abstract constructListener(controller: HostController): MediaQueryListListener;
}
```

### MatchMediaStyleSheetBehavior

Behavior for applying styles based on media queries.

```typescript
class MatchMediaStyleSheetBehavior extends MatchMediaBehavior {
    constructor(query: MediaQueryList, styles: ElementStyles);
    static with(query: MediaQueryList): (styles: ElementStyles) => MatchMediaStyleSheetBehavior;
}
```

## Theme Management

```typescript
function setTheme(theme: Theme | null, node?: Document | HTMLElement): void
function setThemeFor(element: HTMLElement, theme: Theme | null): void // @deprecated
```

## Validation

```typescript
const ValidationFlags = {
    badInput: "bad-input",
    customError: "custom-error",
    patternMismatch: "pattern-mismatch",
    rangeOverflow: "range-overflow",
    rangeUnderflow: "range-underflow",
    stepMismatch: "step-mismatch",
    tooLong: "too-long",
    tooShort: "too-short",
    typeMismatch: "type-mismatch",
    valueMissing: "value-missing",
    valid: "valid"
};
```

## Z-Index Constants

```typescript
const zIndexBackground = "var(--zIndexBackground)"
const zIndexContent = "var(--zIndexContent)"
const zIndexDebug = "var(--zIndexDebug)"
const zIndexFloating = "var(--zIndexFloating)"
const zIndexMessages = "var(--zIndexMessages)"
const zIndexOverlay = "var(--zIndexOverlay)"
const zIndexPopup = "var(--zIndexPopup)"
const zIndexPriority = "var(--zIndexPriority)"
```

## Design Tokens

### Border Radius
```typescript
const borderRadiusNone = "var(--borderRadiusNone)"
const borderRadiusSmall = "var(--borderRadiusSmall)"
const borderRadiusMedium = "var(--borderRadiusMedium)"
const borderRadiusLarge = "var(--borderRadiusLarge)"
const borderRadiusXLarge = "var(--borderRadiusXLarge)"
const borderRadiusCircular = "var(--borderRadiusCircular)"
```

### Duration
```typescript
const durationUltraFast = "var(--durationUltraFast)"
const durationFaster = "var(--durationFaster)"
const durationFast = "var(--durationFast)"
const durationNormal = "var(--durationNormal)"
const durationSlow = "var(--durationSlow)"
const durationSlower = "var(--durationSlower)"
const durationUltraSlow = "var(--durationUltraSlow)"
```

### Typography
```typescript
const fontFamilyBase = "var(--fontFamilyBase)"
const fontFamilyMonospace = "var(--fontFamilyMonospace)"
const fontFamilyNumeric = "var(--fontFamilyNumeric)"
```

### Stroke Width
```typescript
const strokeWidthThin = "var(--strokeWidthThin)"
const strokeWidthThick = "var(--strokeWidthThick)"
const strokeWidthThicker = "var(--strokeWidthThicker)"
const strokeWidthThickest = "var(--strokeWidthThickest)"
