import { styled } from '@soroush.design/react-theme'
import { View, type ViewProps } from '../View'
import type { ComponentConfig } from '@soroush.design/react-theme/theme'

export type QuoteProps = ViewProps

/** A View with a 2px primary left-border - used for terminal readouts and markdown blockquotes. */
export const Quote = styled(View, { name: 'Quote', label: 'Quote' })(({ theme }) => ({
  borderLeft: `2px solid ${theme.border.primary}`,
}))

declare module '@soroush.design/react-theme/theme' {
  interface ThemeComponents {
    Quote?: ComponentConfig
  }
}
