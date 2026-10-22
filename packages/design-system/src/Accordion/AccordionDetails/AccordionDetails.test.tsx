import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../../theme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Accordion } from '../Accordion'
import { AccordionSummary } from '../AccordionSummary'
import { AccordionDetails } from './AccordionDetails'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const view = (hasGutters?: boolean) => (
  <Accordion hasGutters={hasGutters}>
    <AccordionSummary>Title</AccordionSummary>
    <AccordionDetails data-testid="details" className="extra">
      Body
    </AccordionDetails>
  </Accordion>
)

describe('AccordionDetails', () => {
  it('holds what the accordion opens, with a class name and a test id', () => {
    renderWithTheme(view())
    expect(screen.getByTestId('details')).toHaveTextContent('Body')
    expect(screen.getByTestId('details')).toHaveClass('extra')
  })

  it('pads at the sides, and not without gutters', () => {
    const { unmount } = renderWithTheme(view())
    expect(screen.getByTestId('details')).toHaveStyle({ paddingLeft: baseTheme.space[2] })
    unmount()
    renderWithTheme(view(false))
    expect(screen.getByTestId('details')).toHaveStyle({ paddingLeft: '0px' })
  })

  it('styles its root from styleOverrides', () => {
    const theme = createTheme(baseTheme, {
      components: { AccordionDetails: { styleOverrides: { root: { opacity: 0.9 } } } },
    })
    render(view(), { wrapper: withTheme(theme) })
    expect(screen.getByTestId('details')).toHaveStyle({ opacity: '0.9' })
  })

  it('needs an Accordion around it', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderWithTheme(<AccordionDetails>Body</AccordionDetails>)).toThrow(
      'An AccordionDetails must be inside an Accordion.'
    )
    vi.restoreAllMocks()
  })
})
