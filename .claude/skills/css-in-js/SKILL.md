---
name: css-in-js
description: CSS-in-JS and styled-system conventions for this design system. Use when writing or reviewing code in packages/react/, when building design system components, or when the user asks about styling patterns.
argument-hint: [component-name or filename]
paths: 'packages/react/**'
metadata:
  internal: true
---

## Canonical reference

Read `packages/react/src/Avatar/Avatar.tsx` before writing any new component - it is the correct styled-system pattern.

---

## Rules

### 0. All engine imports come from the package's own styling system - never from the underlying packages

Inside `packages/react/`, every styling primitive is imported from the package's own modules or from `@soroush.design/styled-system`, never from the engine's packages:

```ts
// ✗
import { styled } from '@umber-style/styled'
import { css, keyframes } from '@umber-style/react'
import { system, variant, compose, layout, color } from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'

// ✓ (a component's file: relative paths into the package)
import { styled, css, keyframes } from '../style/styled'
import { useTheme } from '../theme/hooks/useTheme'
import { system, variant, compose, layout, color } from '@soroush.design/styled-system'
import { createShouldForwardProp } from '@soroush.design/styled-system/should-forward-prop'
```

An app or another package imports the same names from `@soroush.design/react` (`styled`, `css`, `keyframes`, `Global`, `useTheme`) and `@soroush.design/styled-system`. `packages/react/src/style/` (`engine.ts`, `styled.ts`), `src/theme/engine.ts` and `src/engine/` are the seam to the styling engine: nothing else imports it.

---

### 1. styled-system functions over custom theme-accessing functions

| Need                            | Use                                                               |
| ------------------------------- | ----------------------------------------------------------------- |
| Custom prop → theme scale       | `system({ gap: { property: 'gap', scale: 'space' } })`            |
| Shape / state variants          | `variant({ prop, variants: { key: { cssProperty: themeKey } } })` |
| Font weight, letter spacing     | `typography()` + prop default in wrapper                          |
| Static styles (no theme access) | Plain object - no function                                        |

`variant()` resolves string keys against theme scales automatically: `{ borderRadius: 'md' }` → `theme.radii.md`.

### 2. Static base styles - no function unless theme access is required

```ts
// ✗
const baseStyles = ({ theme }: { theme: Theme }) => ({ display: 'inline-flex' })
// ✓
const baseStyles = { display: 'inline-flex', textTransform: 'uppercase' as const }
```

### 3. Theme = design tokens only

Component-specific config stays in the component file. If only one component uses a value, it does not belong in `themes.ts`.

### 4. All variants must occupy equal space

Use transparent borders on borderless variants - never remove the border entirely.

```ts
contained: {
  border: `${theme.borderWidths.thin} solid transparent`
}
outlined: {
  border: `${theme.borderWidths.thin} solid ${main}`
}
text: {
  border: `${theme.borderWidths.thin} solid transparent`
}
```

### 5. Resolve styled-system prop name conflicts with a minimal wrapper

```ts
// Button's `size` conflicts with layout's size → width+height shorthand
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const safeLayout = ({ size: _size, ...rest }: object) => layout(rest)
```

Do not rename the public API - fix the conflict internally.

### 6. Typography defaults as overridable props

```ts
// ✓ - resolved through typography() against theme scales; user can override
export function Button({ fontWeight = 'bold', letterSpacing = 'tight', ...rest }) {
  return <ButtonRoot fontWeight={fontWeight} letterSpacing={letterSpacing} {...rest} />
}
```

---

If `$ARGUMENTS` names a file or component, read it and report which rules pass and which fail, with corrected code for each violation. Otherwise apply to the code being discussed.
