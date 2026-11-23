import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { useState, type ReactNode } from 'react'
import { ThemeProvider } from '../../theme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { AccordionDetails } from '../AccordionDetails'
import { AccordionSummary } from '../AccordionSummary'
import { Accordion, type AccordionProps, type AccordionTransitionProps } from './Accordion'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const standard = baseTheme.transitions.duration.standard
const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms))
const button = () => screen.getByRole('button', { name: 'Title' })
// Closed, the region is hidden from the accessibility tree - and so has no name: it is looked for there.
const region = () => screen.getByRole('region', { hidden: true })

const view = (props: Partial<AccordionProps> = {}) => (
  <Accordion data-testid="accordion" {...props}>
    <AccordionSummary>Title</AccordionSummary>
    <AccordionDetails>Body</AccordionDetails>
  </Accordion>
)

// A press, then the time the region takes to move: the state it settles in.
const press = () => {
  fireEvent.click(button())
  tick(standard + 1)
}

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('Accordion', () => {
  describe('the summary and the region', () => {
    it('is a button in a heading, and a region it names, which it controls', () => {
      renderWithTheme(view())
      expect(screen.getByRole('heading', { level: 3 })).toContainElement(button())
      expect(button()).toHaveAttribute('aria-controls', region().id)
      expect(region()).toHaveAttribute('aria-labelledby', button().id)
      press()
      expect(screen.getByRole('region', { name: 'Title' })).toBe(region())
    })

    it('is closed at first: hidden, and not expanded', () => {
      renderWithTheme(view())
      expect(button()).toHaveAttribute('aria-expanded', 'false')
      expect(region()).not.toBeVisible()
      expect(screen.getByText('Body')).toBeInTheDocument()
    })

    it('opens and closes as the summary is pressed', () => {
      const onChange = vi.fn()
      renderWithTheme(view({ onChange }))
      press()
      expect(button()).toHaveAttribute('aria-expanded', 'true')
      expect(region()).toBeVisible()
      expect(onChange).toHaveBeenLastCalledWith(expect.anything(), true)
      press()
      expect(button()).toHaveAttribute('aria-expanded', 'false')
      expect(region()).not.toBeVisible()
      expect(onChange).toHaveBeenLastCalledWith(expect.anything(), false)
    })

    it('keeps the summary first and puts the rest in the region', () => {
      renderWithTheme(
        <Accordion>
          <AccordionSummary>Title</AccordionSummary>
          <AccordionDetails>One</AccordionDetails>
          <AccordionDetails>Two</AccordionDetails>
        </Accordion>
      )
      expect(region()).toHaveTextContent('OneTwo')
      expect(region()).not.toContainElement(button())
    })
  })

  describe('open or closed', () => {
    it('is open at once with defaultExpanded', () => {
      renderWithTheme(view({ defaultExpanded: true }))
      expect(button()).toHaveAttribute('aria-expanded', 'true')
      expect(region()).toBeVisible()
    })

    it("is the owner's with isExpanded: it asks, and does not move itself", () => {
      const onChange = vi.fn()
      const { rerender } = renderWithTheme(view({ isExpanded: false, onChange }))
      press()
      expect(onChange).toHaveBeenCalledWith(expect.anything(), true)
      expect(button()).toHaveAttribute('aria-expanded', 'false')
      rerender(view({ isExpanded: true, onChange }))
      tick(standard + 1)
      expect(button()).toHaveAttribute('aria-expanded', 'true')
    })

    it('works for an owner that keeps the state', () => {
      function Owned() {
        const [isExpanded, setIsExpanded] = useState(false)
        return view({ isExpanded, onChange: (_event, next) => setIsExpanded(next) })
      }
      renderWithTheme(<Owned />)
      press()
      expect(button()).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('disabled', () => {
    it('stays as it is, its summary off', () => {
      const onChange = vi.fn()
      renderWithTheme(view({ disabled: true, onChange }))
      expect(button()).toBeDisabled()
      fireEvent.click(button())
      expect(onChange).not.toHaveBeenCalled()
      expect(button()).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('gutters', () => {
    it('pads the summary at the sides, and not without them', () => {
      const { unmount } = renderWithTheme(view())
      expect(button()).toHaveStyle({ paddingLeft: baseTheme.space[2] })
      unmount()
      renderWithTheme(view({ hasGutters: false }))
      expect(button()).toHaveStyle({ paddingLeft: '0px' })
    })
  })

  describe('transition', () => {
    it('opens and closes the region by the transition it is given', () => {
      const shown: boolean[] = []
      function Instant({ isShown, children }: AccordionTransitionProps) {
        shown.push(Boolean(isShown))
        return isShown ? <>{children}</> : null
      }
      renderWithTheme(view({ transition: Instant }))
      expect(screen.queryByRole('region')).not.toBeInTheDocument()
      fireEvent.click(button())
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(shown).toContain(true)
    })
  })

  describe('surface', () => {
    const root = () => screen.getByTestId('accordion')

    it('is square, on the paper, in the theme text, by default', () => {
      renderWithTheme(view())
      expect(root()).toHaveStyle({
        borderRadius: baseTheme.radii.sq,
        backgroundColor: baseTheme.background.paper,
        color: baseTheme.text.initial,
      })
    })

    it('takes a radius, a background and a text color of its own', () => {
      renderWithTheme(view({ borderRadius: 'lg', bg: 'modal', textColor: 'secondary' }))
      expect(root()).toHaveStyle({
        borderRadius: baseTheme.radii.lg,
        backgroundColor: baseTheme.background.modal,
        color: baseTheme.text.secondary,
      })
    })

    it('takes them from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Accordion: { defaultProps: { borderRadius: 'md', bg: 'modal', textColor: 'secondary' } },
        },
      })
      const { unmount } = render(view(), { wrapper: withTheme(theme) })
      expect(root()).toHaveStyle({
        borderRadius: baseTheme.radii.md,
        backgroundColor: baseTheme.background.modal,
        color: baseTheme.text.secondary,
      })
      unmount()
      render(view({ borderRadius: 'sm' }), { wrapper: withTheme(theme) })
      expect(root()).toHaveStyle({ borderRadius: baseTheme.radii.sm })
    })

    it('is rounded as the theme rounds its surfaces', () => {
      const theme = createTheme(baseTheme, { defaults: { surfaceRadius: 'md' } })
      render(view(), { wrapper: withTheme(theme) })
      expect(root()).toHaveStyle({ borderRadius: baseTheme.radii.md })
    })
  })

  describe('theme', () => {
    it('takes hasGutters from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: { Accordion: { defaultProps: { hasGutters: false } } },
      })
      const { unmount } = render(view(), { wrapper: withTheme(theme) })
      expect(button()).toHaveStyle({ paddingLeft: '0px' })
      unmount()
      render(view({ hasGutters: true }), { wrapper: withTheme(theme) })
      expect(button()).toHaveStyle({ paddingLeft: baseTheme.space[2] })
    })

    it('styles the root and the region from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Accordion: { styleOverrides: { root: { opacity: 0.9 }, region: { opacity: 0.8 } } },
        },
      })
      render(view({ defaultExpanded: true }), { wrapper: withTheme(theme) })
      expect(screen.getByTestId('accordion')).toHaveStyle({ opacity: '0.9' })
      expect(region()).toHaveStyle({ opacity: '0.8' })
    })
  })

  it('takes space props, a class name and a test id on its root', () => {
    renderWithTheme(view({ className: 'extra', p: 1 }))
    const root = screen.getByTestId('accordion')
    expect(root).toHaveClass('extra')
    expect(root).toHaveStyle({ padding: baseTheme.space[1] })
  })
})
