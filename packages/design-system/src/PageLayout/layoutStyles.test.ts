import { describe, expect, it } from 'vitest'
import { baseTheme, type LayoutEntry, type Theme } from '../theme'
import { layoutEntries, layoutLength, layoutStyles } from './layoutStyles'

const entry: LayoutEntry = {
  bars: {},
  panels: {},
  content: { columns: 2, margin: 1, gutter: 1, mode: 'fluid' },
}

describe('layoutEntries', () => {
  it("merges baseTheme's entries mobile-first, each with its media rule", () => {
    const entries = layoutEntries(baseTheme)
    expect(entries.map(([media]) => media)).toEqual([
      null,
      '@media screen and (min-width: 600px)',
      '@media screen and (min-width: 1200px)',
      '@media screen and (min-width: 1600px)',
    ])
    const [, tablet] = entries[1]
    expect(tablet.bars).toEqual({ bottom: 8 })
    expect(tablet.panels.start).toEqual({ mode: 'collapsed', width: '280px', railWidth: 9 })
    expect(tablet.content).toEqual({ columns: 8, margin: 4, gutter: 2, mode: 'fluid' })
    const [, wide] = entries[3]
    expect(wide.bars).toEqual({ top: 8, bottom: 0 })
    expect(wide.content).toEqual({
      columns: 16,
      margin: 3,
      gutter: 3,
      mode: 'fixed',
      maxWidth: '1600px',
    })
  })

  it('skips breakpoints without an entry and adds a panel the base lacks', () => {
    const theme = {
      ...baseTheme,
      layout: { base: entry, web: { panels: { end: { mode: 'inline' } } } },
    } as Theme
    const entries = layoutEntries(theme)
    expect(entries).toHaveLength(2)
    expect(entries[1][1].panels).toEqual({ start: undefined, end: { mode: 'inline' } })
  })
})

describe('layoutLength', () => {
  it.each([
    [9, '72px'],
    [0, '0px'],
    ['280px', '280px'],
    [undefined, '0px'],
  ])('resolves %s to %s', (value, length) => {
    expect(layoutLength(baseTheme, value)).toBe(length)
  })
})

describe('layoutStyles', () => {
  it('puts the base entry at the top level and each breakpoint in its media block', () => {
    const theme = { ...baseTheme, layout: { base: entry, wide: { content: { columns: 3 } } } }
    expect(layoutStyles(theme as Theme, ({ content }) => ({ order: content.columns }))).toEqual({
      order: 2,
      '@media screen and (min-width: 1600px)': { order: 3 },
    })
  })
})
