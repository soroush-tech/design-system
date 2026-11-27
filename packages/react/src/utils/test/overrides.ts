import { StyleSheet } from '../../style/styled'
import { getStyleRulesFor } from './getStyleRulesFor'

/** Two entries that set the same property, for tests of `style` and `slotProps`: the later one wins. */
export const overrides = StyleSheet.create({
  first: { color: 'rgb(1, 2, 3)' },
  second: { color: 'rgb(4, 5, 6)' },
})

/** The colour the last rule that sets one gives the element, nested `:hover`-like rules left out: what an override entry decides. */
export const lastColor = (element: Element): string | undefined =>
  getStyleRulesFor(element)
    .filter((rule) => !rule.selectorText.includes(':'))
    .map((rule) => rule.style.color)
    .filter(Boolean)
    .at(-1)
