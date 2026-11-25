import { styled } from '@soroush.design/react'
import { Typography, type TypographyProps } from '@soroush.design/react/Typography'

export type ChipProps = TypographyProps

const ChipRoot = styled(Typography, { label: 'Chip' })(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  paddingTop: theme.space[0.5],
  paddingBottom: theme.space[0.5],
  paddingLeft: theme.space[2],
  paddingRight: theme.space[2],
  border: `1px solid ${theme.border.light}`,
  // The pill shape is the component's identity; radii tokens top out at rounded-rect.
  borderRadius: '999px',
  lineHeight: theme.lineHeights.none,
  whiteSpace: 'nowrap',
}))

/**
 * A small pill-shaped label for compact metadata - version badges, statuses, counts.
 * Renders through Typography, so every Typography prop (variant, color, spacing) applies.
 * Incubating: the API may change before promotion into the design system.
 */
export function Chip({ as = 'span', variant = 'caption', ...rest }: Readonly<ChipProps>) {
  return <ChipRoot as={as} variant={variant} {...rest} />
}
