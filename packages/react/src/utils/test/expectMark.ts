import { expect } from 'vitest'
import { getStyleRulesFor } from './getStyleRulesFor'

// The colour an element's override rule gives: the rules of the `overrides` layer only, since a
// component's own rule in the `components` layer may be written later in the sheet and still lose.
const overrideColor = (element: Element) =>
  getStyleRulesFor(element)
    .filter((rule) => (rule.parentRule as CSSLayerBlockRule | null)?.name.endsWith('overrides'))
    .map((rule) => rule.style.color)
    .filter(Boolean)
    .at(-1)

/** The slot given `mark(slot)` is on one element - or on each of them - with its class, entry and attributes. */
export const expectMark = (slot: string, container: ParentNode = document) => {
  const elements = [...container.querySelectorAll(`[data-mark="${slot}"]`)]
  expect(elements.length).toBeGreaterThan(0)
  for (const element of elements) {
    expect(element).toHaveClass(`c-${slot}`)
    expect(element).toHaveAttribute('aria-description', slot)
    expect(overrideColor(element)).toBe('rgb(1, 2, 3)')
  }
}
