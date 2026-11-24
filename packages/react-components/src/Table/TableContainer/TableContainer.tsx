import { styled } from '@soroush.design/react-components'
import { View, type ViewProps } from '@soroush.design/react-components/View'
import type { ComponentConfig } from '@soroush.design/react-theme/theme'

export type TableContainerProps = ViewProps

/**
 * Scroll wrapper for `Table` - wide tables scroll horizontally inside it
 * instead of breaking the page layout. Give it a bounded height to make
 * `Table`'s `hasStickyHeader` stick.
 */
export const TableContainer = styled(View, {
  name: 'TableContainer',
  label: 'TableContainer',
})<TableContainerProps>({
  overflowX: 'auto',
})

declare module '@soroush.design/react-theme/theme' {
  interface ThemeComponents {
    TableContainer?: ComponentConfig
  }
}
