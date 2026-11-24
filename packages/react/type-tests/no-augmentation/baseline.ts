// Without an augmentation, `brand` is not a color: the checks in ../checks.ts pass only
// because of the declare module block in the other programs.
import { styled } from '@soroush.design/react'
import type { ButtonColor } from '@soroush.design/react/Button'
import { baseTheme, createTheme, useTheme } from '@soroush.design/react/theme'

// @ts-expect-error -- 'brand' is not a palette color
export const colorOfButton: ButtonColor = 'brand'
// @ts-expect-error -- the palette has no `brand`
export const Box = styled('div')(({ theme }) => ({ color: theme.palette.brand.main }))
// @ts-expect-error -- the palette has no `brand`
export const useBrand = (): string => useTheme().palette.brand.main

// A component the library does not type is not on `components` until an app registers it.
// @ts-expect-error -- no entry point of the library, and no augmentation, names `Nonexistent`
export const unknownComponent = createTheme(baseTheme, { components: { Nonexistent: {} } })
