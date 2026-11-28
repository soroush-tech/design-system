import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../../theme/ThemeProvider'
import { baseTheme, type Theme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Accordion } from '../Accordion'
import { AccordionSummary } from '../AccordionSummary'
import { AccordionActions } from './AccordionActions'
import { themeWith } from '../../utils/test/themeWith'
import { lastColor, overrides } from '../../utils/test/overrides'

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
    const theme = themeWith({ AccordionActions: { styleOverrides: { root: { opacity: 0.9 } } } })
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

describe('AccordionActions overrides', () => {
  it('puts the style, class name and attributes of the root slot on its root', () => {
    renderWithTheme(
      <Accordion>
        <AccordionSummary>Title</AccordionSummary>
        <AccordionActions
          data-testid="actions"
          slotProps={{
            root: {
              className: 'slot',
              style: overrides.first,
              'data-mark': 'a',
              'aria-label': 'Actions',
            },
          }}
        >
          Save
        </AccordionActions>
      </Accordion>
    )
    const actions = screen.getByTestId('actions')
    expect(actions).toHaveClass('slot')
    expect(actions).toHaveAttribute('data-mark', 'a')
    expect(actions).toHaveAttribute('aria-label', 'Actions')
    expect(lastColor(actions)).toBe('rgb(1, 2, 3)')
  })

  it('lets the style prop win over slotProps.root.style, and joins the class names', () => {
    renderWithTheme(
      <Accordion>
        <AccordionSummary>Title</AccordionSummary>
        <AccordionActions
          data-testid="actions"
          className="own"
          style={[false, overrides.second]}
          slotProps={{ root: { className: 'slot', style: overrides.first } }}
        >
          Save
        </AccordionActions>
      </Accordion>
    )
    const actions = screen.getByTestId('actions')
    expect(actions).toHaveClass('slot', 'own')
    expect(lastColor(actions)).toBe('rgb(4, 5, 6)')
  })
})
