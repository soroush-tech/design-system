import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../../theme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Accordion } from '../Accordion'
import { AccordionSummary, type AccordionSummaryProps } from './AccordionSummary'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const view = (props: Partial<AccordionSummaryProps> = {}) => (
  <Accordion>
    <AccordionSummary data-testid="summary" {...props}>
      Title
    </AccordionSummary>
  </Accordion>
)

describe('AccordionSummary', () => {
  it('is a button in a heading of the third level, saying what it is given', () => {
    renderWithTheme(view())
    expect(screen.getByRole('heading', { level: 3 })).toContainElement(
      screen.getByRole('button', { name: 'Title' })
    )
  })

  it('takes the level of its heading from its props, or the theme', () => {
    const { unmount } = renderWithTheme(view({ headingLevel: 2 }))
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    unmount()
    const theme = createTheme(baseTheme, {
      components: { AccordionSummary: { defaultProps: { headingLevel: 5 } } },
    })
    const { unmount: unmountThemed } = render(view(), { wrapper: withTheme(theme) })
    expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument()
    unmountThemed()
    render(view({ headingLevel: 1 }), { wrapper: withTheme(theme) })
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('draws an icon that is hidden from assistive technology, or the one it is given', () => {
    const { unmount } = renderWithTheme(view())
    const button = screen.getByRole('button')
    expect(button.querySelector('svg')).toBeInTheDocument()
    expect(button.lastElementChild).toHaveAttribute('aria-hidden', 'true')
    unmount()
    renderWithTheme(view({ expandIcon: <b data-testid="own">v</b> }))
    expect(screen.getByTestId('own')).toBeInTheDocument()
  })

  it('turns its icon over as it opens', () => {
    renderWithTheme(view())
    const icon = screen.getByRole('button').lastElementChild
    expect(icon).toHaveStyle({ transform: 'none' })
    fireEvent.click(screen.getByRole('button'))
    expect(icon).toHaveStyle({ transform: 'rotate(180deg)' })
  })

  it('takes a class name and a test id on its heading', () => {
    renderWithTheme(view({ className: 'extra' }))
    expect(screen.getByTestId('summary')).toHaveClass('extra')
  })

  it('styles each slot from styleOverrides', () => {
    const theme = createTheme(baseTheme, {
      components: {
        AccordionSummary: {
          styleOverrides: {
            root: { opacity: 0.9 },
            button: { opacity: 0.8 },
            content: { opacity: 0.7 },
            icon: { opacity: 0.6 },
          },
        },
      },
    })
    render(view(), { wrapper: withTheme(theme) })
    const button = screen.getByRole('button')
    expect(screen.getByTestId('summary')).toHaveStyle({ opacity: '0.9' })
    expect(button).toHaveStyle({ opacity: '0.8' })
    expect(button.firstElementChild).toHaveStyle({ opacity: '0.7' })
    expect(button.lastElementChild).toHaveStyle({ opacity: '0.6' })
  })

  it('needs an Accordion around it', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderWithTheme(<AccordionSummary>Title</AccordionSummary>)).toThrow(
      'An AccordionSummary must be inside an Accordion.'
    )
    vi.restoreAllMocks()
  })
})
