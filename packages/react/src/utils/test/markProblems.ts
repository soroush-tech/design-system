import { getStyleRulesFor } from './getStyleRulesFor'

// The colour an element's override rule gives: the rules of the `overrides` layer only, since a
// component's own rule in the `components` layer may be written later in the sheet and still lose.
const overrideColor = (element: Element) =>
  getStyleRulesFor(element)
    .filter((rule) => (rule.parentRule as CSSLayerBlockRule | null)?.name.endsWith('overrides'))
    .map((rule) => rule.style.color)
    .findLast(Boolean)

/**
 * What is wrong with the slot given `mark(slot)`, as messages: it must be on one element - or on each
 * of them - with its class, entry and attributes. Empty when it is.
 */
export const markProblems = (slot: string, container: ParentNode = document): string[] => {
  const elements = [...container.querySelectorAll(`[data-mark="${slot}"]`)]
  if (elements.length === 0) return [`no element is marked ${slot}`]
  return elements.flatMap((element) => [
    ...(element.classList.contains(`c-${slot}`) ? [] : [`${slot} lacks its class`]),
    ...(element.getAttribute('aria-description') === slot ? [] : [`${slot} lacks its attribute`]),
    ...(overrideColor(element) === 'rgb(1, 2, 3)' ? [] : [`${slot} lacks its entry`]),
  ])
}
