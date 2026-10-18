import { describe, expect, it } from 'vitest'
import { layoutFrame, layoutGrid, layoutGridStyles, span } from './layoutGrid'

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
  boxSizing: 'border-box',
  width: '100%',
  paddingInline: margin,
  maxWidth: maxWidth ?? 'none',
  marginInline: maxWidth ? 'auto' : 0,
})

const columns = (count: number, gutter: string) => ({
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

  it('holds an entry from its breakpoint up, like any responsive prop', () => {
    const styles = layoutGridStyles(theme, { lg: { columns: 16 } })
    expect(styles['@media (width >= 1200px)']).toEqual(block(16, '24px', '24px', '1200px'))
    // xl keeps the 16 columns; only the theme's own xl change (its max width) is added.
    expect(styles['@media (width >= 1600px)']).toEqual(block(16, '24px', '24px', '1600px'))
  })

  it('writes a block only where something changes, until a later entry replaces it', () => {
    const sparse = { ...theme, layout: { xs: theme.layout.xs } }
    const styles = layoutGridStyles(sparse, { sm: { columns: 6 }, lg: { columns: 2 } })
    expect(styles['@media (width >= 600px)']).toMatchObject({
      gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    })
    // md inherits sm's block through the min-width query.
    expect(styles['@media (width >= 840px)']).toBeUndefined()
    expect(styles['@media (width >= 1200px)']).toMatchObject({
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    })
  })

  it('applies a field at every breakpoint, the theme still changing what it does not set', () => {
    const sparse = { ...theme, layout: { xs: theme.layout.xs, md: theme.layout.md } }
    expect(layoutGridStyles(sparse, { margin: 1 })).toEqual({
      display: 'grid',
      ...block(4, '16px', '8px'),
      '@media (width >= 840px)': block(12, '24px', '8px'),
    })
  })

  it('writes nothing without the prop, only display without layout tokens', () => {
    expect(layoutGrid({ theme })).toEqual({})
    expect(layoutGridStyles({ breakpoints: ['40em'] }, true)).toEqual({ display: 'grid' })
    expect(layoutGridStyles({}, { constructor: { columns: 2 } })).toEqual({ display: 'grid' })
  })

  it('leaves out what an entry does not set, and keeps fixed without maxWidth unbounded', () => {
    expect(layoutGridStyles({ breakpoints: { xs: 0 } }, { xs: { mode: 'fixed' } })).toEqual({
      display: 'grid',
      boxSizing: 'border-box',
      width: '100%',
      maxWidth: 'none',
      marginInline: 0,
    })
  })

  it('gives a fixed frame the full width, capped by its max width and centred', () => {
    // Without the width, a grid or flex item would size to its content.
    expect(layoutGridStyles(theme, true)['@media (width >= 1200px)']).toMatchObject({
      width: '100%',
      maxWidth: '1200px',
      marginInline: 'auto',
    })
  })
})

describe('gap as the gutter', () => {
  it('sets the column gap at every breakpoint from one value', () => {
    const styles = layoutGridStyles(theme, true, 1)
    expect(styles).toMatchObject(columns(4, '8px'))
    expect(styles['@media (width >= 840px)']).toMatchObject(columns(12, '8px'))
    expect(styles['@media (width >= 1600px)']).toMatchObject(columns(12, '8px'))
  })

  it("keeps the theme's gutter below the first breakpoint an object names", () => {
    const styles = layoutGridStyles(theme, true, { md: 4 })
    expect(styles).toMatchObject(columns(4, '16px'))
    expect(styles['@media (width >= 600px)']).toMatchObject(columns(8, '16px'))
    expect(styles['@media (width >= 840px)']).toMatchObject(columns(12, '32px'))
    expect(styles['@media (width >= 1200px)']).toMatchObject({ columnGap: '32px' })
  })

  it('maps an array by position, skipping nulls and positions past the last breakpoint', () => {
    const styles = layoutGridStyles(theme, true, [1, null, 3])
    expect(styles).toMatchObject({ columnGap: '8px' })
    // sm has no value of its own: xs's carries up.
    expect(styles['@media (width >= 600px)']).toMatchObject({ columnGap: '8px' })
    expect(styles['@media (width >= 840px)']).toMatchObject({ columnGap: '24px' })
    const single = { ...theme, breakpoints: { xs: '0px' } }
    expect(layoutGridStyles(single, true, [1, 2])).toMatchObject({ columnGap: '8px' })
  })

  it('maps an array like styled-system when the first breakpoint does not start at 0', () => {
    // Position 0 is then the base below `sm` - the plain `gap` covers it - and position 1 is sm.
    const scale = {
      space: theme.space,
      breakpoints: { sm: '600px', md: '840px' },
      layout: { sm: { content: { columns: 8, gutter: 2 } }, md: { content: { columns: 12 } } },
    }
    const shifted = layoutGridStyles(scale, true, [1, 2])
    expect(shifted['@media (width >= 600px)']).toMatchObject({ columnGap: '16px' })
    expect(shifted['@media (width >= 840px)']).toMatchObject({ columnGap: '16px' })
    // A null position keeps the base value, as the row half of `gap` does.
    const held = layoutGridStyles(scale, true, [1, null, 3])
    expect(held['@media (width >= 600px)']).toMatchObject({ columnGap: '8px' })
    expect(held['@media (width >= 840px)']).toMatchObject({ columnGap: '24px' })
    expect(layoutGridStyles(scale, true, [null, 2])['@media (width >= 600px)']).toMatchObject({
      columnGap: '16px',
    })
  })

  it('resolves fractional steps of an object scale, as the space parser does', () => {
    const fractional = {
      space: { 0: 0, 0.125: '1px', 0.5: '4px', 1: '8px' },
      breakpoints: { xs: '0px' },
      layout: { xs: { content: { columns: 4, margin: 0.5 } } },
    }
    expect(layoutGridStyles(fractional, true, 0.125)).toMatchObject({
      columnGap: '1px',
      paddingInline: '4px',
    })
  })

  it('reads columnGap over gap on a grid, and falls back to the theme without either', () => {
    expect(layoutGrid({ layout: true, theme, gap: 1, columnGap: 4 })).toMatchObject({
      columnGap: '32px',
    })
    expect(layoutGrid({ layout: true, theme, gap: 1 })).toMatchObject({ columnGap: '8px' })
    expect(layoutGridStyles(theme, true, null)).toEqual(layoutGridStyles(theme, true))
  })
})

describe('layoutGrid / layoutFrame', () => {
  it('splits the layout grid into its columns and its frame, with nothing written twice', () => {
    expect(layoutGrid({ layout: true, theme })).toEqual({
      display: 'grid',
      ...columns(4, '16px'),
      '@media (width >= 600px)': columns(8, '16px'),
      '@media (width >= 840px)': columns(12, '24px'),
      '@media (width >= 1200px)': columns(12, '24px'),
      '@media (width >= 1600px)': columns(12, '24px'),
    })
    expect(layoutFrame({ layout: true, theme })).toEqual({
      ...frame('16px'),
      '@media (width >= 600px)': frame('32px'),
      '@media (width >= 840px)': frame('24px'),
      '@media (width >= 1200px)': frame('24px', '1200px'),
      '@media (width >= 1600px)': frame('24px', '1600px'),
    })
  })

  it('takes the same values on a frame: fields everywhere, entries from their breakpoint up', () => {
    const styles = layoutFrame({ layout: { maxWidth: '1280px', md: { margin: 0 } }, theme })
    expect(styles).not.toHaveProperty('display')
    expect(styles['@media (width >= 840px)']).toEqual(frame('0px'))
    expect(styles['@media (width >= 1200px)']).toEqual(frame('0px', '1280px'))
  })
})

describe('span', () => {
  it('writes the grid column per breakpoint', () => {
    expect(span({ span: { xs: 4, md: 6 }, theme })).toEqual({
      gridColumn: 'span 4',
      '@media (width >= 840px)': { gridColumn: 'span 6' },
    })
  })

  it('takes the whole row with "full", whatever the column count', () => {
    expect(span({ span: 'full', theme })).toEqual({ gridColumn: '1 / -1' })
  })
})
