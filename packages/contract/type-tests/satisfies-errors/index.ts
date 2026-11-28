// What the app checks its components against: a misspelt owner-state field, slot or default prop
// is an error. Needs no registered theme.
import type { ThemeComponents } from '@gild-ui/react'

export const ownerState = {
  Tabs: {
    styleOverrides: {
      // @ts-expect-error -- the owner state has fullWidth, not fullwidth
      root: ({ ownerState }) => ({ opacity: ownerState.fullwidth ? 1 : 0.9 }),
    },
  },
} satisfies ThemeComponents

export const slot = {
  Tabs: {
    styleOverrides: {
      // @ts-expect-error -- Tabs has no slot named indicater
      indicater: { height: 2 },
    },
  },
} satisfies ThemeComponents

export const defaults = {
  Tabs: {
    // @ts-expect-error -- orientation is horizontal or vertical
    defaultProps: { orientation: 'diagonal' },
  },
} satisfies ThemeComponents
