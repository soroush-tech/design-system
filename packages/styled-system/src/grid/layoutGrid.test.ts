import { describe, expect, it } from 'vitest'
import { layoutFlex, layoutGrid, layoutGridStyles, span } from './layoutGrid'

const theme = {
  space: [0, 8, 16, 24, 32],
  breakpoints: { xs: '0px', sm: '600px', md: '840px', lg: '1200px', xl: '1600px' },
  layout: {
    xs: { content: { columns: 4, margin: 2, gutter: 2, mode: 'fluid' } },
    sm: { content: { columns: 8, margin: 4 } },
    md: { content: { columns: 12, margin: 3, gutter: 3 } },
    lg: { content: { mode: 'fixed', maxWidth: '1200px' } },
    xl: { content: { maxWidth: '1600px' } },
  },
}

const block = (columns: number, gutter: string, margin: string, maxWidth?: string) => ({
  '--layout-columns': columns,
  '--layout-gutter': gutter,
  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  columnGap: gutter,
  paddingInline: margin,
  maxWidth: maxWidth ?? 'none',
  marginInline: maxWidth ? 'auto' : 0,
})

describe('layoutGrid', () => {
  it("writes the theme's layout grid per breakpoint, mobile-first", () => {
    expect(layoutGrid({ layout: true, theme })).toEqual({
      display: 'grid',
      ...block(4, '16px', '16px'),
      '@media (width >= 600px)': block(8, '16px', '32px'),
      '@media (width >= 840px)': block(12, '24px', '24px'),
      '@media (width >= 1200px)': block(12, '24px', '24px', '1200px'),
      '@media (width >= 1600px)': block(12, '24px', '24px', '1600px'),
    })
  })

  it('applies an override at the breakpoint it names only', () => {
    const styles = layoutGridStyles(theme, { lg: { columns: 16, gutter: '20px' } })
    expect(styles['@media (width >= 1200px)']).toEqual(block(16, '20px', '24px', '1200px'))
    // xl is back to the theme.
    expect(styles['@media (width >= 1600px)']).toEqual(block(12, '24px', '24px', '1600px'))
  })

  it('restores the theme at the next breakpoint even when the theme has no entry there', () => {
    const sparse = { ...theme, layout: { xs: theme.layout.xs } }
    const styles = layoutGridStyles(sparse, { sm: { columns: 6 } })
    expect(styles['@media (width >= 600px)']).toMatchObject({ '--layout-columns': 6 })
    expect(styles['@media (width >= 840px)']).toMatchObject({ '--layout-columns': 4 })
    expect(styles['@media (width >= 1200px)']).toBeUndefined()
  })

  it('writes nothing without the prop, only display without layout tokens', () => {
    expect(layoutGrid({ theme })).toEqual({})
    expect(layoutGridStyles({ breakpoints: ['40em'] }, true)).toEqual({ display: 'grid' })
    expect(layoutGridStyles({}, { constructor: { columns: 2 } })).toEqual({ display: 'grid' })
  })

  it('leaves out what an entry does not set, and keeps fixed without maxWidth unbounded', () => {
    expect(layoutGridStyles({ breakpoints: { xs: 0 } }, { xs: { mode: 'fixed' } })).toEqual({
      display: 'grid',
      maxWidth: 'none',
      marginInline: 'auto',
    })
  })
})

describe('layoutFlex', () => {
  it('draws the same grid on a wrapping flex row, without column tracks', () => {
    const styles = layoutFlex({ layout: true, theme })
    expect(styles).toMatchObject({
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      '--layout-columns': 4,
      columnGap: '16px',
    })
    expect(styles.gridTemplateColumns).toBeUndefined()
    expect(styles['@media (width >= 840px)']).toMatchObject({ '--layout-columns': 12 })
  })
})

describe('span', () => {
  it('writes the grid column and the flex basis from the layout grid, per breakpoint', () => {
    const styles = span({ span: { xs: 4, md: 6 }, theme })
    expect(styles).toEqual({
      gridColumn: 'span 4',
      flex: '0 0 calc((100% - (var(--layout-columns) - 1) * var(--layout-gutter)) / var(--layout-columns) * 4 + 3 * var(--layout-gutter))',
      '@media (width >= 840px)': {
        gridColumn: 'span 6',
        flex: '0 0 calc((100% - (var(--layout-columns) - 1) * var(--layout-gutter)) / var(--layout-columns) * 6 + 5 * var(--layout-gutter))',
      },
    })
  })
})
