import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Grid } from '../Grid'

describe('Grid', () => {
  // ─── children ────────────────────────────────────────────────────────────────

  describe('children', () => {
    it('renders text children', () => {
      renderWithTheme(<Grid>Grid Child</Grid>)
      expect(screen.getByText('Grid Child')).toBeInTheDocument()
    })

    it('renders multiple element children', () => {
      renderWithTheme(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      )
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })
  })

  // ─── display: grid ───────────────────────────────────────────────────────────

  describe('display', () => {
    it('applies display: grid by default', () => {
      renderWithTheme(<Grid>layout</Grid>)
      expect(screen.getByText('layout')).toHaveStyle({ display: 'grid' })
    })
  })

  // ─── gap (theme.space scale) ─────────────────────────────────────────────────

  describe('gap - theme.space scale', () => {
    it.each([
      [1, '8px'],
      [2, '16px'],
      [3, '24px'],
      [4, '32px'],
    ] as const)('gap={%s} resolves to %s', (token, px) => {
      renderWithTheme(<Grid gap={token}>{px}</Grid>)
      expect(screen.getByText(px)).toHaveStyle({ gap: px })
    })

    it('gap={0} resolves to 0', () => {
      renderWithTheme(<Grid gap={0}>zero</Grid>)
      expect(screen.getByText('zero')).toHaveStyle({ gap: '0' })
    })
  })

  // ─── grid layout props ────────────────────────────────────────────────────────

  describe('grid layout props', () => {
    it('applies gridTemplateColumns', () => {
      renderWithTheme(<Grid gridTemplateColumns="1fr 2fr">columns</Grid>)
      expect(screen.getByText('columns')).toHaveStyle({
        gridTemplateColumns: '1fr 2fr',
      })
    })

    it('applies gridTemplateRows', () => {
      renderWithTheme(<Grid gridTemplateRows="100px auto">rows</Grid>)
      expect(screen.getByText('rows')).toHaveStyle({ gridTemplateRows: '100px auto' })
    })

    it('applies gridAutoFlow', () => {
      renderWithTheme(<Grid gridAutoFlow="column">flow</Grid>)
      expect(screen.getByText('flow')).toHaveStyle({ gridAutoFlow: 'column' })
    })
  })

  // ─── inherited View props ────────────────────────────────────────────────────

  describe('inherited View props', () => {
    it('applies space props from theme scale', () => {
      renderWithTheme(<Grid p={2}>padded</Grid>)
      expect(screen.getByText('padded')).toHaveStyle({ padding: '16px' })
    })

    it('applies layout width prop', () => {
      renderWithTheme(<Grid width="400px">sized</Grid>)
      expect(screen.getByText('sized')).toHaveStyle({ width: '400px' })
    })
  })

  // ─── HTML attribute passthrough ───────────────────────────────────────────────

  describe('HTML attribute passthrough', () => {
    it('forwards className prop', () => {
      renderWithTheme(<Grid className="my-grid">classed</Grid>)
      expect(screen.getByText('classed')).toHaveClass('my-grid')
    })

    it('forwards data attributes', () => {
      renderWithTheme(<Grid data-testid="test-grid">data</Grid>)
      expect(screen.getByTestId('test-grid')).toBeInTheDocument()
    })

    it('forwards style prop', () => {
      renderWithTheme(<Grid style={{ opacity: 0.5 }}>styled</Grid>)
      expect(screen.getByText('styled')).toHaveStyle({ opacity: '0.5' })
    })

    it('does not forward gap as an HTML attribute', () => {
      renderWithTheme(<Grid gap={2}>no-attr</Grid>)
      expect(screen.getByText('no-attr')).not.toHaveAttribute('gap')
    })
  })

  // ─── layout (theme.layout) ──────────────────────────────────────────────

  describe('layout (theme.layout)', () => {
    // jsdom applies media queries against its 1024px window: the computed style is the md entry
    // (12 columns, a 24px margin and gutter).
    it("lays the grid out from the theme's layout entry for the window", () => {
      renderWithTheme(<Grid layout>content</Grid>)
      const grid = screen.getByText('content')
      expect(getComputedStyle(grid).gridTemplateColumns).toBe('repeat(12, minmax(0px, 1fr))')
      expect(grid).toHaveStyle({ columnGap: '24px', paddingInline: '24px' })
      expect(grid).not.toHaveAttribute('layout')
    })

    // The base rule only - from the next breakpoint up the layout's blocks win, so the layout
    // owns the column tracks and the inline padding.
    it('lets gridTemplateColumns and padding props reach the base breakpoint only', () => {
      renderWithTheme(
        <Grid layout gridTemplateColumns="1fr 1fr" px={1}>
          content
        </Grid>
      )
      const grid = screen.getByText('content')
      const className = [...grid.classList].at(-1)!
      const baseRule = [...document.styleSheets]
        .flatMap((sheet) => [...sheet.cssRules])
        .find((rule) => rule instanceof CSSStyleRule && rule.selectorText === `.${className}`)
      expect(baseRule?.cssText).toContain('grid-template-columns: 1fr 1fr')
      expect(baseRule?.cssText).toContain('padding-left: 8px')
      // At the md window the layout's tracks and margin win.
      expect(getComputedStyle(grid).gridTemplateColumns).toBe('repeat(12, minmax(0px, 1fr))')
      expect(grid).toHaveStyle({ paddingLeft: '24px' })
    })

    it('takes its gap as the gutter at every breakpoint, rows included', () => {
      renderWithTheme(
        <Grid layout gap={1}>
          gapped
        </Grid>
      )
      const grid = screen.getByText('gapped')
      expect(grid).toHaveStyle({ columnGap: '8px', rowGap: '8px' })
      const className = [...grid.classList].at(-1)!
      const css = [...document.styleSheets]
        .flatMap((sheet) => [...sheet.cssRules])
        .map((rule) => rule.cssText)
        .filter((text) => text.includes(className))
        .join('\n')
      // No breakpoint brings the theme's 16px / 24px gutter back. The base rule writes its row and
      // column gaps together as `gap`.
      expect(css.match(/(?:column-)?gap: [^;]+/g)).toEqual([
        'gap: 8px',
        ...Array(4).fill('column-gap: 8px'),
      ])
    })

    it('writes the frame once: View draws it, Grid adds only the columns', () => {
      renderWithTheme(<Grid layout>framed</Grid>)
      const className = [...screen.getByText('framed').classList].at(-1)!
      const css = [...document.styleSheets]
        .flatMap((sheet) => [...sheet.cssRules])
        .map((rule) => rule.cssText)
        .filter((text) => text.includes(className))
        .join('\n')
      // The base rule and one block per later breakpoint of the base theme.
      expect(css.match(/padding-inline/g)).toHaveLength(5)
      expect(css.match(/grid-template-columns/g)).toHaveLength(5)
    })
  })
})
