import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
} from '@soroush.tech/styled-system'
import { baseTheme } from '../theme/themes'

// The design system's own props over styled-system's: a component's `color` and `bg` read
// `theme.text` and `theme.background` (View's `system()`), not `theme.colors`.
export const DESIGN_SYSTEM_SCALES: Record<string, string> = {
  color: 'text',
  bg: 'background',
  backgroundColor: 'background',
  borderColor: 'border',
}

const parsers = [
  space,
  layout,
  typography,
  color,
  border,
  flexbox,
  position,
  background,
  shadow,
  grid,
]

/**
 * Each styled-system prop that resolves against a theme scale, and that scale - read from
 * the parsers' own configs, so it can't drift from what the props do. A parser's scale the
 * theme doesn't have (`display`, `overflow`) is left out: there are no values to offer.
 */
export function readStyleScales(): Record<string, string> {
  const scales: Record<string, string> = {}
  for (const parser of parsers) {
    // Every parser here is built by `system()`, so it carries its config.
    for (const [prop, config] of Object.entries(parser.config as object)) {
      const { scale } = config as { scale?: string }
      if (scale && scale in baseTheme) scales[prop] = scale
    }
  }
  return { ...scales, ...DESIGN_SYSTEM_SCALES }
}
