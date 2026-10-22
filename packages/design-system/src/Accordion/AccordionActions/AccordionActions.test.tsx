import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../../theme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Accordion } from '../Accordion'
import { AccordionSummary } from '../AccordionSummary'
import { AccordionActions } from './AccordionActions'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const view = (hasGutters?: boolean) => (
  <Accordion hasGutters={hasGutters}>
    <AccordionSummary>Title</AccordionSummary>
    <AccordionActions data-testid="actions" className="extra">
      <button type="button">Save</button>
    </AccordionActions>
  </Accordion>
)

describe('AccordionActions', () => {
  it('holds its buttons at the end of a row, with a class name and a test id', () => {
    renderWithTheme(view())
    const actions = screen.getByTestId('actions')
    expect(actions).toHaveClass('extra')
    expect(actions).toHaveStyle({ display: 'flex', justifyContent: 'flex-end' })
    expect(actions).toContainElement(screen.getByText('Save'))
  })

  it('pads at the sides, and not without gutters', () => {
    const { unmount } = renderWithTheme(view())
    expect(screen.getByTestId('actions')).toHaveStyle({ paddingLeft: baseTheme.space[2] })
    unmount()
    renderWithTheme(view(false))
    expect(screen.getByTestId('actions')).toHaveStyle({ paddingLeft: '0px' })
  })

  it('styles its root from styleOverrides', () => {
    const theme = createTheme(baseTheme, {
      components: { AccordionActions: { styleOverrides: { root: { opacity: 0.9 } } } },
    })
    render(view(), { wrapper: withTheme(theme) })
    expect(screen.getByTestId('actions')).toHaveStyle({ opacity: '0.9' })
  })

  it('needs an Accordion around it', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderWithTheme(<AccordionActions>Save</AccordionActions>)).toThrow(
      'An AccordionActions must be inside an Accordion.'
    )
    vi.restoreAllMocks()
  })
})
