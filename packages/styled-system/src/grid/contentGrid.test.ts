import { describe, expect, it } from 'vitest'
import { contentGrid, contentGridStyles } from './contentGrid'

const theme = {
  space: [0, 8, 16, 24, 32],
  breakpoints: { xs: '0px', sm: '600px', md: '840px', lg: '1200px' },
  layout: {
    xs: { content: { columns: 4, margin: 2, gutter: 2, mode: 'fluid' } },
    sm: { content: { columns: 8, margin: 4 } },
    md: { content: { columns: 12, margin: 3, gutter: 3 } },
    lg: { content: { mode: 'fixed', maxWidth: '1200px' } },
  },
}

describe('contentGrid', () => {
  it("writes the theme's content grid per breakpoint, mobile-first", () => {
    expect(contentGrid({ contentGrid: true, theme })).toEqual({
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      columnGap: '16px',
      paddingInline: '16px',
      maxWidth: 'none',
      marginInline: 0,
      '@media (width >= 600px)': {
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
        columnGap: '16px',
        paddingInline: '32px',
        maxWidth: 'none',
        marginInline: 0,
      },
      '@media (width >= 840px)': {
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        columnGap: '24px',
        paddingInline: '24px',
        maxWidth: 'none',
        marginInline: 0,
      },
      '@media (width >= 1200px)': {
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        columnGap: '24px',
        paddingInline: '24px',
        maxWidth: '1200px',
        marginInline: 'auto',
      },
    })
  })

  it('merges per-breakpoint overrides over the theme', () => {
    const styles = contentGridStyles(theme, { md: { columns: 16, gutter: '20px' } })
    expect(styles['@media (width >= 840px)']).toMatchObject({
      gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
      columnGap: '20px',
    })
    expect(styles['@media (width >= 1200px)']).toMatchObject({
      gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
    })
  })

  it('writes nothing without the prop, and only display without layout tokens', () => {
    expect(contentGrid({ theme })).toEqual({})
    expect(contentGridStyles({ breakpoints: ['40em'] }, true)).toEqual({ display: 'grid' })
    expect(contentGridStyles({}, { 0: { columns: 2 } })).toEqual({ display: 'grid' })
  })

  it('leaves out what an incomplete entry does not set, and keeps fixed without maxWidth unbounded', () => {
    expect(contentGridStyles({ breakpoints: { xs: 0 } }, { xs: { mode: 'fixed' } })).toEqual({
      display: 'grid',
      maxWidth: 'none',
      marginInline: 'auto',
    })
  })
})
