import type {
  GridProps as SystemGridProps,
  FlexboxProps,
  LayoutGridProps,
} from '@soroush.design/styled-system'
import { styled } from '@soroush.design/react-theme'
import { type Theme } from '@soroush.design/react-theme/theme'
import { createShouldForwardProp, props, grid, flexbox, layoutGrid, space } from '../index'
import { View, type ViewProps } from '../View'
import type { ComponentConfig } from '@soroush.design/react-theme/theme'

/** Valid values for the gap / columnGap / rowGap props - derived from theme.space keys. */
export type GapToken = keyof Theme['space']

// gap / columnGap / rowGap need no declaration or wiring here since
// @soroush.design/styled-system 5.8.0 - they arrive through View's `space` parser
// and `SpaceProps`.
/**
 * `layout` lays the grid out from `theme.layout` - the theme's columns, gutter and margin per
 * breakpoint, its own at every breakpoint (`layout={{ maxWidth: '1280px' }}`), or its own from
 * a named breakpoint up: `layout={{ lg: { columns: 16 } }}`. View draws the frame (margin, max
 * width); Grid adds the columns. The gutter is the grid's own `gap` / `columnGap` where it sets
 * one - single or responsive - and the theme's elsewhere; rows take `gap` or `rowGap`.
 */
export interface GridProps
  extends
    Omit<ViewProps, 'layout'>,
    SystemGridProps<Theme>,
    FlexboxProps<Theme>,
    LayoutGridProps<Theme> {}

const shouldForwardProp = createShouldForwardProp([...props, 'layout'])

export const Grid = styled(View, {
  name: 'Grid',
  label: 'grid',
  shouldForwardProp,
  systemProps: [layoutGrid, grid, flexbox, space],
})<GridProps>({ display: 'grid' })

declare module '@soroush.design/react-theme/theme' {
  interface ThemeComponents {
    Grid?: ComponentConfig
  }
}
