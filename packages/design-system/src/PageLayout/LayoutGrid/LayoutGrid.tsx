import { styled, grid, space } from '../../index'
import { Grid, type GridProps } from '../../Grid'
import { layoutLength, layoutStyles } from '../layoutStyles'

export type LayoutGridProps = GridProps

/**
 * A `Grid` on the theme's content columns: each breakpoint's
 * `theme.layout.*.content.columns` equal tracks, its `gutter` between them.
 * Place items with `gridColumn` (`'span 4'`, `'1 / -1'`, ...). `grid` and
 * `space` come last, so a `gridTemplateColumns` or `gap` prop still wins.
 */
export const LayoutGrid = styled(Grid, {
  name: 'LayoutGrid',
  label: 'LayoutGrid',
  systemProps: [grid, space],
})<LayoutGridProps>(({ theme }) =>
  layoutStyles(theme, ({ content: { columns, gutter } }) => ({
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    columnGap: layoutLength(theme, gutter),
  }))
)
