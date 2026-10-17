import type { FlexboxProps, LayoutGridProps } from '@soroush.tech/styled-system'
import {
  styled,
  type Theme,
  createShouldForwardProp,
  props,
  flexbox,
  layoutFlex,
  space,
} from '../index'
import { View, type ViewProps } from '../View'

/** Valid values for the gap prop - derived from theme.space keys. */
export type GapToken = keyof Theme['space']

// `gap` needs no declaration or wiring here since @soroush.tech/styled-system 5.8.0 -
// it arrives through View's `space` parser and `SpaceProps`.
/**
 * `layout` lays a wrapping row out from `theme.layout` - the theme's gutter and margin per
 * breakpoint, with `--layout-columns` / `--layout-gutter` for the children's `span`. Entries
 * work as on `Grid`: `layout={{ gutter: 8 }}` at every breakpoint, `{ md: { gutter: 4 } }` at one.
 */
export interface FlexProps extends ViewProps, FlexboxProps<Theme>, LayoutGridProps<Theme> {}

const shouldForwardProp = createShouldForwardProp([...props, 'layout'])

export const Flex = styled(View, {
  name: 'Flex',
  label: 'flex',
  shouldForwardProp,
  // layout first, then `space` again: flexbox, gap and padding props still win.
  systemProps: [layoutFlex, flexbox, space],
})<FlexProps>({ display: 'flex', flexDirection: 'column' })
