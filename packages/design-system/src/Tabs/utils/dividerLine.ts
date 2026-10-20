import { get, type Theme } from '../../index'
import type { TabsVariants } from '../../theme'

/**
 * The divider - the line along a row of tabs' foot, a column's end side - as an inset shadow,
 * so it adds no size and runs unbroken across the pieces that each draw a stretch of it.
 */
export const getDividerShadow = (theme: Theme, isVertical: boolean, color: string): string => {
  const thin = theme.borderWidths.thin
  return `inset ${isVertical ? `-${thin} 0` : `0 -${thin}`} 0 ${color}`
}

/** The divider's color: the accent in the enclosed look, which outlines the tab in it too. */
export const getDividerColor = (
  theme: Theme,
  variant: keyof TabsVariants,
  color: keyof Theme['palette']
): string =>
  variant === 'enclosed' ? get(theme, `palette.${color}.main`) : get(theme, 'border.light')

/** What a row's piece needs to know to draw its stretch of the divider. */
export interface DividerPieceProps {
  variant: keyof TabsVariants
  color: keyof Theme['palette']
  orientation: 'horizontal' | 'vertical'
  hasDivider: boolean
}

/**
 * The stretch of the divider an enclosed row's piece draws - its content, a scroll button, an
 * end of the list. The enclosed look draws the line piece by piece, so the selected tab can
 * leave its own piece out.
 */
export const getEnclosedPieceStyle = (
  theme: Theme,
  { variant, color, orientation, hasDivider }: DividerPieceProps
) =>
  hasDivider && variant === 'enclosed'
    ? {
        boxShadow: getDividerShadow(
          theme,
          orientation === 'vertical',
          getDividerColor(theme, variant, color)
        ),
      }
    : {}
