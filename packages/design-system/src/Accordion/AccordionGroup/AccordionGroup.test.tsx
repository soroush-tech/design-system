import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../../theme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Accordion } from '../Accordion'
import { AccordionDetails } from '../AccordionDetails'
import { AccordionSummary } from '../AccordionSummary'
import { AccordionGroup, type AccordionGroupProps } from './AccordionGroup'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const standard = baseTheme.transitions.duration.standard
const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms))
const summary = (name: string) => screen.getByRole('button', { name })
const isOpen = (name: string) => summary(name).getAttribute('aria-expanded') === 'true'
const press = (name: string) => {
  fireEvent.click(summary(name))
  tick(standard + 1)
}

const view = (props: Partial<AccordionGroupProps> = {}, second = {}) => (
  <AccordionGroup data-testid="group" {...props}>
    <Accordion>
      <AccordionSummary>One</AccordionSummary>
      <AccordionDetails>
        First <button type="button">Inside</button>
      </AccordionDetails>
    </Accordion>
    <Accordion {...second}>
      <AccordionSummary>Two</AccordionSummary>
      <AccordionDetails>Second</AccordionDetails>
    </Accordion>
    <Accordion disabled>
      <AccordionSummary>Three</AccordionSummary>
      <AccordionDetails>Third</AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary>Four</AccordionSummary>
      <AccordionDetails>Fourth</AccordionDetails>
    </Accordion>
  </AccordionGroup>
)

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('AccordionGroup', () => {
  describe('the keys', () => {
    it('steps between summaries with the arrows, round the ends, skipping one that is off', () => {
      renderWithTheme(view())
      summary('One').focus()
      fireEvent.keyDown(summary('One'), { key: 'ArrowDown' })
      expect(summary('Two')).toHaveFocus()
      fireEvent.keyDown(summary('Two'), { key: 'ArrowDown' })
      expect(summary('Four')).toHaveFocus()
      fireEvent.keyDown(summary('Four'), { key: 'ArrowDown' })
      expect(summary('One')).toHaveFocus()
      fireEvent.keyDown(summary('One'), { key: 'ArrowUp' })
      expect(summary('Four')).toHaveFocus()
      fireEvent.keyDown(summary('Four'), { key: 'ArrowUp' })
      expect(summary('Two')).toHaveFocus()
    })

    it('goes to the first and the last with Home and End', () => {
      renderWithTheme(view())
      summary('Two').focus()
      fireEvent.keyDown(summary('Two'), { key: 'End' })
      expect(summary('Four')).toHaveFocus()
      fireEvent.keyDown(summary('Four'), { key: 'Home' })
      expect(summary('One')).toHaveFocus()
    })

    it('leaves other keys, and keys on other controls, alone', () => {
      renderWithTheme(
        <AccordionGroup>
          <Accordion defaultExpanded>
            <AccordionSummary>One</AccordionSummary>
            <AccordionDetails>
              <button type="button">Inside</button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Two</AccordionSummary>
          </Accordion>
        </AccordionGroup>
      )
      summary('One').focus()
      fireEvent.keyDown(summary('One'), { key: 'a' })
      expect(summary('One')).toHaveFocus()
      const inside = screen.getByRole('button', { name: 'Inside' })
      inside.focus()
      // Not taken - so not prevented, and the focus stays where the control put it.
      expect(fireEvent.keyDown(inside, { key: 'ArrowDown' })).toBe(true)
      expect(inside).toHaveFocus()
    })

    it('stops the page from scrolling on the keys it takes', () => {
      renderWithTheme(view())
      summary('One').focus()
      expect(fireEvent.keyDown(summary('One'), { key: 'ArrowDown' })).toBe(false)
    })
  })

  describe('isExclusive', () => {
    it('keeps its accordions as they are, each its own, without it', () => {
      renderWithTheme(view())
      press('One')
      press('Two')
      expect(isOpen('One')).toBe(true)
      expect(isOpen('Two')).toBe(true)
    })

    it('closes the others as one is opened', () => {
      renderWithTheme(view({ isExclusive: true }))
      press('One')
      expect(isOpen('One')).toBe(true)
      press('Two')
      expect(isOpen('Two')).toBe(true)
      expect(isOpen('One')).toBe(false)
      press('Two')
      expect(isOpen('Two')).toBe(false)
      expect(isOpen('One')).toBe(false)
    })

    it('lets one open at first stay until another is opened', () => {
      renderWithTheme(
        <AccordionGroup isExclusive>
          <Accordion defaultExpanded>
            <AccordionSummary>One</AccordionSummary>
            <AccordionDetails>First</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Two</AccordionSummary>
            <AccordionDetails>Second</AccordionDetails>
          </Accordion>
        </AccordionGroup>
      )
      expect(isOpen('One')).toBe(true)
      press('Two')
      expect(isOpen('One')).toBe(false)
      expect(isOpen('Two')).toBe(true)
    })

    it('leaves an accordion its owner holds to its owner', () => {
      renderWithTheme(
        <AccordionGroup isExclusive>
          <Accordion isExpanded>
            <AccordionSummary>One</AccordionSummary>
            <AccordionDetails>First</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Two</AccordionSummary>
            <AccordionDetails>Second</AccordionDetails>
          </Accordion>
        </AccordionGroup>
      )
      press('Two')
      expect(isOpen('Two')).toBe(true)
      expect(isOpen('One')).toBe(true)
    })
  })

  describe('isAttached', () => {
    const accordions = () => [...screen.getByTestId('group').children] as HTMLElement[]

    it('keeps a gap between the accordions by default', () => {
      renderWithTheme(view())
      expect(screen.getByTestId('group')).not.toHaveStyle({ gap: '0' })
      expect(accordions()[1]).not.toHaveStyle({ borderTopWidth: '0' })
    })

    it('joins them: no gap, one border at each joint, square corners where they meet', () => {
      renderWithTheme(view({ isAttached: true }))
      expect(screen.getByTestId('group')).toHaveStyle({ gap: '0' })
      const [first, second, third] = accordions()
      expect(first).not.toHaveStyle({ borderTopWidth: '0' })
      expect(first).toHaveStyle({ borderBottomLeftRadius: '0', borderBottomRightRadius: '0' })
      expect(second).toHaveStyle({ borderTopWidth: '0', borderTopLeftRadius: '0' })
      expect(second).toHaveStyle({ borderBottomLeftRadius: '0' })
      expect(third).toHaveStyle({ borderTopWidth: '0' })
      expect(third).toHaveStyle({ borderRadius: baseTheme.radii.md })
    })

    it('takes isAttached from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: { AccordionGroup: { defaultProps: { isAttached: true } } },
      })
      const { unmount } = render(view(), { wrapper: withTheme(theme) })
      expect(screen.getByTestId('group')).toHaveStyle({ gap: '0' })
      unmount()
      render(view({ isAttached: false }), { wrapper: withTheme(theme) })
      expect(screen.getByTestId('group')).not.toHaveStyle({ gap: '0' })
    })
  })

  describe('theme', () => {
    it('takes isExclusive from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: { AccordionGroup: { defaultProps: { isExclusive: true } } },
      })
      const { unmount } = render(view(), { wrapper: withTheme(theme) })
      press('One')
      press('Two')
      expect(isOpen('One')).toBe(false)
      unmount()
      render(view({ isExclusive: false }), { wrapper: withTheme(theme) })
      press('One')
      press('Two')
      expect(isOpen('One')).toBe(true)
    })

    it('styles its root from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: { AccordionGroup: { styleOverrides: { root: { opacity: 0.9 } } } },
      })
      render(view(), { wrapper: withTheme(theme) })
      expect(screen.getByTestId('group')).toHaveStyle({ opacity: '0.9' })
    })
  })

  it('takes space props, a class name and a test id on its root', () => {
    renderWithTheme(view({ className: 'extra', p: 1 }))
    const group = screen.getByTestId('group')
    expect(group).toHaveClass('extra')
    expect(group).toHaveStyle({ padding: baseTheme.space[1] })
  })
})
