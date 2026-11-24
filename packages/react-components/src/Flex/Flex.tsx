import type { FlexboxProps } from '@soroush.design/styled-system'
import { styled } from '@soroush.design/react-theme'
import { type Theme } from '@soroush.design/react-theme/theme'
import { createShouldForwardProp, props, flexbox, space } from '../index'
import { View, type ViewProps } from '../View'
import type { ComponentConfig } from '@soroush.design/react-theme/theme'

/** Valid values for the gap prop - derived from theme.space keys. */
export type GapToken = keyof Theme['space']

// `gap` needs no declaration or wiring here since @soroush.design/styled-system 5.8.0 -
// it arrives through View's `space` parser and `SpaceProps`.
/**
 * `layout` puts the flex container on the page frame, as on any View: the theme's margin and
 * max width per breakpoint. The flexbox stays as set - a column by default, a row with
 * `flexDirection="row"`. Columns are Grid's: content on the page columns uses `<Grid layout>`.
 */
export interface FlexProps extends ViewProps, FlexboxProps<Theme> {}

const shouldForwardProp = createShouldForwardProp([...props, 'layout'])

export const Flex = styled(View, {
  name: 'Flex',
  label: 'flex',
  shouldForwardProp,
  systemProps: [flexbox, space],
})<FlexProps>({ display: 'flex', flexDirection: 'column' })

declare module '@soroush.design/react-theme/theme' {
  interface ThemeComponents {
    Flex?: ComponentConfig
  }
}
