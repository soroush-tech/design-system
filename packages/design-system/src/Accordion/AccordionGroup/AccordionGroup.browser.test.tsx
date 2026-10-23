import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../theme'
import { baseTheme, createTheme } from '../../theme/themes'
import { Accordion } from '../Accordion'
import { AccordionSummary } from '../AccordionSummary'
import { AccordionGroup, type AccordionGroupProps } from './AccordionGroup'

// Real cascade: the joints are rules on the group that beat the accordions' own borders, which
// jsdom's computed style does not settle by specificity.

const theme = createTheme(baseTheme, { defaults: { surfaceRadius: 'md' } })
const view = (props: AccordionGroupProps = {}) => (
  <ThemeProvider theme={theme}>
    <AccordionGroup data-testid="group" {...props}>
      {['One', 'Two', 'Three'].map((title) => (
        <Accordion key={title}>
          <AccordionSummary>{title}</AccordionSummary>
        </Accordion>
      ))}
    </AccordionGroup>
  </ThemeProvider>
)
const accordions = () => [...screen.getByTestId('group').children] as HTMLElement[]
const style = (element: HTMLElement) => getComputedStyle(element)

describe('AccordionGroup in a browser', () => {
  it('keeps a gap and every border and corner when separated', () => {
    render(view())
    const [first, second] = accordions()
    expect(
      second.getBoundingClientRect().top - first.getBoundingClientRect().bottom
    ).toBeGreaterThan(0)
    expect(style(second).borderTopWidth).toBe('1px')
    expect(style(second).borderTopLeftRadius).toBe(baseTheme.radii.md)
  })

  it('joins them when attached: one border at each joint, the outer corners round', () => {
    render(view({ variant: 'attached' }))
    const [first, second, third] = accordions()
    expect(second.getBoundingClientRect().top).toBeCloseTo(first.getBoundingClientRect().bottom, 0)
    expect(style(first).borderTopWidth).toBe('1px')
    expect(style(second).borderTopWidth).toBe('0px')
    expect(style(third).borderTopWidth).toBe('0px')
    expect(style(first).borderTopLeftRadius).toBe(baseTheme.radii.md)
    expect(style(first).borderBottomLeftRadius).toBe('0px')
    expect(style(second).borderTopLeftRadius).toBe('0px')
    expect(style(second).borderBottomLeftRadius).toBe('0px')
    expect(style(third).borderTopLeftRadius).toBe('0px')
    expect(style(third).borderBottomLeftRadius).toBe(baseTheme.radii.md)
  })
})
