# Usage

## Import per component

Every component ships on its own subpath, so bundlers tree-shake by construction:

```tsx
import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
```

The barrel export carries the styling engine and theme helpers:

```tsx
import { styled, css } from '@soroush.tech/design-system'
import { createTheme, type Theme } from '@soroush.tech/design-system/theme'
```

## Style props

Components accept styled-system props resolved against theme scales - space, layout,
typography, flexbox, border, and position:

```tsx
<Flex flexDirection="column" gap={3} p={4} maxWidth="40rem" mx="auto">
  <Typography variant="h2">Title</Typography>
  <Typography color="secondary">Body copy.</Typography>
  <Button variant="contained" color="primary" mt={2}>
    Continue
  </Button>
</Flex>
```

Numbers resolve against `theme.space`; named keys resolve against their scale
(`color="secondary"` reads `theme.text.secondary`). Responsive arrays work on every style
prop: `px={[2, 3, 5]}` applies per breakpoint.

## Layout primitives

Prefer `View`, `Flex`, and `Typography` over raw `div` and `p` - they carry the style-prop
surface and keep markup theme-aware. See each component's page for its full prop reference.
