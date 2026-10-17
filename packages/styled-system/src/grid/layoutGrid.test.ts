import { describe, expect, it } from 'vitest'
import { layoutFlex, layoutFrame, layoutGrid, layoutGridStyles, span } from './layoutGrid'

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

const frame = (margin: string, maxWidth?: string) => ({
  paddingInline: margin,
  maxWidth: maxWidth ?? 'none',
  marginInline: maxWidth ? `max(0px, calc((100% - ${maxWidth}) / 2))` : 0,
})

const columns = (count: number, gutter: string) => ({
  '--layout-columns': count,
  '--layout-gutter': gutter,
  gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
  columnGap: gutter,
})

const block = (count: number, gutter: string, margin: string, maxWidth?: string) => ({
  ...columns(count, gutter),
  ...frame(margin, maxWidth),
})

describe('layoutGridStyles', () => {
  it("writes the theme's layout grid per breakpoint, mobile-first", () => {
    expect(layoutGridStyles(theme, true)).toEqual({
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

  it('applies a field at every breakpoint, the theme still changing what it does not set', () => {
    const sparse = { ...theme, layout: { xs: theme.layout.xs, md: theme.layout.md } }
    expect(layoutGridStyles(sparse, { gutter: '20px' })).toEqual({
      display: 'grid',
      ...block(4, '20px', '16px'),
      '@media (width >= 600px)': block(4, '20px', '16px'),
      '@media (width >= 840px)': block(12, '20px', '24px'),
      '@media (width >= 1200px)': block(12, '20px', '24px'),
      '@media (width >= 1600px)': block(12, '20px', '24px'),
    })
  })

  it('applies an entry under a breakpoint name on top of the fields, there only', () => {
    const styles = layoutGridStyles(theme, { gutter: 4, md: { columns: 6, gutter: 1 } })
    expect(styles).toMatchObject(block(4, '32px', '16px'))
    expect(styles['@media (width >= 600px)']).toEqual(block(8, '32px', '32px'))
    expect(styles['@media (width >= 840px)']).toEqual(block(6, '8px', '24px'))
    expect(styles['@media (width >= 1200px)']).toEqual(block(12, '32px', '24px', '1200px'))
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
      marginInline: 0,
    })
  })

  it('centres a fixed frame with computed margins, so a grid or flex item still stretches', () => {
    // `auto` inline margins shrink a grid or flex item to its content.
    const styles = layoutGridStyles(theme, true)
    expect(styles['@media (width >= 1200px)']).toMatchObject({
      maxWidth: '1200px',
      marginInline: 'max(0px, calc((100% - 1200px) / 2))',
    })
  })
})

describe('layoutGrid / layoutFrame', () => {
  it('splits the layout grid into its columns and its frame, with nothing written twice', () => {
    const grid = layoutGrid({ layout: true, theme })
    const frameOnly = layoutFrame({ layout: true, theme })
    expect(grid).toEqual({
      display: 'grid',
      ...columns(4, '16px'),
      '@media (width >= 600px)': columns(8, '16px'),
      '@media (width >= 840px)': columns(12, '24px'),
      '@media (width >= 1200px)': columns(12, '24px'),
      '@media (width >= 1600px)': columns(12, '24px'),
    })
    expect(frameOnly).toEqual({
      ...frame('16px'),
      '@media (width >= 600px)': frame('32px'),
      '@media (width >= 840px)': frame('24px'),
      '@media (width >= 1200px)': frame('24px', '1200px'),
      '@media (width >= 1600px)': frame('24px', '1600px'),
    })
  })

  it('takes the same values on a frame: fields everywhere, entries at their breakpoint', () => {
    const styles = layoutFrame({ layout: { maxWidth: '1280px', md: { margin: 0 } }, theme })
    expect(styles).not.toHaveProperty('display')
    expect(styles['@media (width >= 840px)']).toEqual(frame('0px'))
    expect(styles['@media (width >= 1200px)']).toEqual(frame('24px', '1280px'))
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

  it("keeps a field's gutter in --layout-gutter at every breakpoint, for the children's span", () => {
    const styles = layoutFlex({ layout: { gutter: 4 }, theme })
    expect(styles).toMatchObject({ '--layout-gutter': '32px' })
    expect(styles['@media (width >= 840px)']).toMatchObject({
      '--layout-columns': 12,
      '--layout-gutter': '32px',
    })
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

  it('takes the whole row with "full", whatever the column count', () => {
    expect(span({ span: { xs: 'full', md: 6 }, theme })).toMatchObject({
      gridColumn: '1 / -1',
      flex: '0 0 100%',
      '@media (width >= 840px)': { gridColumn: 'span 6' },
    })
  })
})
