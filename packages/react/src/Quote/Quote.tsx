import { styled } from '../style/styled'
import { withRootOverrides } from '../style/withRootOverrides'
import { View, type ViewProps } from '../View'

export type QuoteProps = ViewProps

/** A View with a 2px primary left-border - used for terminal readouts and markdown blockquotes. */
const QuoteRoot = styled(View, { name: 'Quote', label: 'Quote' })(({ theme }) => ({
  borderLeft: `2px solid ${theme.border.primary}`,
}))

export const Quote = withRootOverrides(QuoteRoot)
