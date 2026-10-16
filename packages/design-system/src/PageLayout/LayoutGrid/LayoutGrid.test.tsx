import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { baseTheme, ThemeProvider, type Theme } from '../../theme'
import { LayoutGrid } from './LayoutGrid'

// A theme with only a base entry, so jsdom sees one layout whatever its window width.
const theme = {
  ...baseTheme,
  layout: {
    base: { bars: {}, panels: {}, content: { columns: 6, margin: 2, gutter: 3, mode: 'fluid' } },
  },
} as Theme

const renderGrid = (ui: ReactNode) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('LayoutGrid', () => {
  it('lays its items on the theme columns with the gutter between them', () => {
    renderGrid(<LayoutGrid>cells</LayoutGrid>)
    const cells = screen.getByText('cells')
    expect(cells).toHaveStyle({ display: 'grid', columnGap: '24px' })
    // jest-dom's toHaveStyle skips grid-template-*, so it is read from the computed style.
    expect(getComputedStyle(cells).gridTemplateColumns).toBe('repeat(6, minmax(0, 1fr))')
  })

  it('lets gridTemplateColumns and gap props win', () => {
    renderGrid(
      <LayoutGrid gridTemplateColumns="1fr 1fr" columnGap={1}>
        cells
      </LayoutGrid>
    )
    const cells = screen.getByText('cells')
    expect(cells).toHaveStyle({ columnGap: '8px' })
    expect(getComputedStyle(cells).gridTemplateColumns).toBe('1fr 1fr')
  })

  it('passes HTML attributes through', () => {
    renderGrid(<LayoutGrid data-testid="grid">cells</LayoutGrid>)
    expect(screen.getByTestId('grid')).toBeInTheDocument()
  })
})
