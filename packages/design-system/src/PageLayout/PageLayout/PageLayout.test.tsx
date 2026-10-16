import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { baseTheme, ThemeProvider, type LayoutEntry, type Theme } from '../../theme'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { PageLayout, type PageLayoutProps } from './PageLayout'

// A theme with only a base entry, so jsdom sees one layout whatever its window width.
const renderAt = (base: LayoutEntry, props: Partial<PageLayoutProps> = {}) =>
  render(
    <ThemeProvider theme={{ ...baseTheme, layout: { base } } as Theme}>
      <PageLayout {...props}>content</PageLayout>
    </ThemeProvider>
  )

// jest-dom's toHaveStyle skips grid-template-*, so the tracks are read from the computed style.
const tracks = (element: Element) => {
  const style = getComputedStyle(element)
  return [style.gridTemplateColumns, style.gridTemplateRows]
}

const content: LayoutEntry['content'] = { columns: 4, margin: 2, gutter: 2, mode: 'fluid' }
const panel = { width: '280px', railWidth: 9 } as const

describe('PageLayout', () => {
  describe('regions', () => {
    it('renders the bars, panels and content in reading order', () => {
      renderWithTheme(
        <PageLayout topBar="top" startPanel="start" endPanel="end" bottomBar="bottom">
          content
        </PageLayout>
      )
      const root = screen.getByText('content').parentElement!
      expect([...root.children].map((child) => child.textContent)).toEqual([
        'top',
        'start',
        'content',
        'end',
        'bottom',
      ])
    })

    it('renders only the content when no region is passed', () => {
      renderWithTheme(<PageLayout>content</PageLayout>)
      expect(screen.getByText('content').parentElement!.children).toHaveLength(1)
    })
  })

  describe('grid tracks', () => {
    it('sizes bars and inline panels from the layout entry', () => {
      renderAt(
        {
          bars: { top: 8, bottom: '3rem' },
          panels: { start: { ...panel, mode: 'inline' }, end: { ...panel, mode: 'collapsed' } },
          content,
        },
        { topBar: 'top', bottomBar: 'bottom', startPanel: 'start', endPanel: 'end' }
      )
      expect(tracks(screen.getByText('content').parentElement!)).toEqual([
        '280px minmax(0, 1fr) 72px',
        '64px minmax(0, 1fr) 3rem',
      ])
    })

    it('gives absent regions and overlay or hidden panels no track', () => {
      renderAt(
        {
          bars: { top: 8 },
          panels: { start: { ...panel, mode: 'overlay' }, end: { ...panel, mode: 'hidden' } },
          content,
        },
        { startPanel: 'start', endPanel: 'end' }
      )
      expect(tracks(screen.getByText('content').parentElement!)).toEqual([
        '0px minmax(0, 1fr) 0px',
        '0px minmax(0, 1fr) 0px',
      ])
    })

    it('fills the viewport by default and lets a minHeight prop win', () => {
      const { rerender } = renderWithTheme(<PageLayout>content</PageLayout>)
      expect(screen.getByText('content').parentElement).toHaveStyle({ minHeight: '100dvh' })
      rerender(<PageLayout minHeight="20rem">content</PageLayout>)
      expect(screen.getByText('content').parentElement).toHaveStyle({ minHeight: '20rem' })
    })
  })

  describe('bars', () => {
    it('shows a bar with a height and hides one at 0 or unset', () => {
      renderAt(
        { bars: { top: 8, bottom: 0 }, panels: {}, content },
        {
          topBar: 'top',
          bottomBar: 'bottom',
        }
      )
      expect(screen.getByText('top')).toHaveStyle({ display: 'block', gridArea: 'top' })
      expect(screen.getByText('bottom')).toHaveStyle({ display: 'none' })
    })
  })

  describe('panels', () => {
    it.each([
      ['inline', 'block'],
      ['collapsed', 'block'],
      ['hidden', 'none'],
    ] as const)('lays a %s panel in its track (display %s)', (mode, display) => {
      renderAt(
        { bars: {}, panels: { start: { ...panel, mode } }, content },
        { startPanel: 'start' }
      )
      expect(screen.getByText('start')).toHaveStyle({ display, position: 'static', width: 'auto' })
    })

    it('hides a panel the layout has no entry for', () => {
      renderAt({ bars: {}, panels: {}, content }, { endPanel: 'end' })
      expect(screen.getByText('end')).toHaveStyle({ display: 'none' })
    })

    it('shows an overlay panel over the page only while open', () => {
      const base: LayoutEntry = {
        bars: {},
        panels: { start: { ...panel, mode: 'overlay' }, end: { ...panel, mode: 'overlay' } },
        content,
      }
      renderAt(base, { startPanel: 'start', endPanel: 'end', openPanels: { start: true } })
      expect(screen.getByText('start')).toHaveStyle({
        display: 'block',
        position: 'absolute',
        width: '280px',
        insetInlineStart: '0px',
        zIndex: String(baseTheme.zOrder.drawer),
      })
      expect(screen.getByText('end')).toHaveStyle({ display: 'none', insetInlineEnd: '0px' })
    })
  })

  describe('content', () => {
    it('pads fluid content by the margin and spans the space', () => {
      renderAt({ bars: {}, panels: {}, content })
      expect(screen.getByText('content')).toHaveStyle({
        paddingInline: '16px',
        maxWidth: 'none',
        gridArea: 'content',
      })
    })

    it('centres fixed content at its max width', () => {
      renderAt({ bars: {}, panels: {}, content: { ...content, mode: 'fixed', maxWidth: '1200px' } })
      expect(screen.getByText('content')).toHaveStyle({ maxWidth: '1200px', marginInline: 'auto' })
    })

    it('leaves fixed content without a max width unbounded', () => {
      renderAt({ bars: {}, panels: {}, content: { ...content, mode: 'fixed' } })
      expect(screen.getByText('content')).toHaveStyle({ maxWidth: 'none' })
    })
  })

  it('passes HTML attributes through to the root', () => {
    renderWithTheme(
      <PageLayout data-testid="page" aria-label="Page">
        content
      </PageLayout>
    )
    expect(screen.getByTestId('page')).toHaveAttribute('aria-label', 'Page')
  })
})
