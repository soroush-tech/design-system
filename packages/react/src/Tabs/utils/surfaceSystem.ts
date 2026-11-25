'use client'

import { system } from '@soroush.design/styled-system'

/** `bg` → `theme.background`, `borderRadius` → `theme.radii`: a tab strip's or a panel's surface. */
export const surfaceSystem = system({
  bg: { property: 'backgroundColor', scale: 'background' },
  borderRadius: { property: 'borderRadius', scale: 'radii' },
})
