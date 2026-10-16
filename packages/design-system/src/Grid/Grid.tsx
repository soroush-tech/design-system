import type {
  GridProps as SystemGridProps,
  FlexboxProps,
  ContentGridProps,
} from '@soroush.tech/styled-system'
import {
  styled,
  type Theme,
  createShouldForwardProp,
  props,
  grid,
  flexbox,
  space,
  contentGrid,
} from '../index'
import { View, type ViewProps } from '../View'

/** Valid values for the gap / columnGap / rowGap props - derived from theme.space keys. */
export type GapToken = keyof Theme['space']

// gap / columnGap / rowGap need no declaration or wiring here since
// @soroush.tech/styled-system 5.8.0 - they arrive through View's `space` parser
// and `SpaceProps`.
/**
 * `contentGrid` lays the grid out from `theme.layout` - the theme's columns, gutter and margin per
 * breakpoint, or entries merged over them: `contentGrid={{ xl: { columns: 16 } }}`.
 */
export interface GridProps
  extends ViewProps, SystemGridProps<Theme>, FlexboxProps<Theme>, ContentGridProps<Theme> {}

const shouldForwardProp = createShouldForwardProp([...props, 'contentGrid'])

export const Grid = styled(View, {
  name: 'Grid',
  label: 'grid',
  shouldForwardProp,
  // contentGrid first, then `space` again: an explicit gridTemplateColumns, gap or padding
  // prop still wins over the theme's grid.
  systemProps: [contentGrid, grid, flexbox, space],
})<GridProps>({ display: 'grid' })
