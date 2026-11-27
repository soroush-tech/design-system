import { describe, it, expect } from 'vitest'
import type { ReactElement } from 'react'
import { StyleSheet, type SlotOverride, type StyleOverride } from '@gild-ui/react'
import { renderWithTheme } from '@gild-ui/react/utils/test/renderWithTheme'

/** Two entries that set the same property, for tests of `style` and `slotProps`. */
export const overrides = StyleSheet.create({
  first: { color: 'rgb(1, 2, 3)' },
  second: { color: 'rgb(4, 5, 6)' },
})

const rulesOf = (rules: CSSRuleList): CSSStyleRule[] =>
  [...rules].flatMap((rule) => {
    if (rule instanceof CSSStyleRule) return [rule]
    return 'cssRules' in rule ? rulesOf(rule.cssRules as CSSRuleList) : []
  })

/** The colours the rules of the element's classes give it, in sheet order. */
export const colorsOf = (element: Element): string[] =>
  [...document.styleSheets]
    .flatMap((sheet) => rulesOf(sheet.cssRules))
    .filter((rule) => [...element.classList].some((name) => rule.selectorText === `.${name}`))
    .map((rule) => rule.style.color)
    .filter(Boolean)

interface OverrideProps {
  style?: StyleOverride
  slotProps?: { root?: SlotOverride }
}

/** A case of the `root` slot tests: `run` draws the component and returns what it shows, `expected` is what it must show. */
export interface RootSlotCase {
  name: string
  run: () => unknown
  expected: unknown
}

/** The cases of a component with a `root` slot: `slotProps.root` and `style` on the root. */
export const rootSlotCases = (
  render: (props: OverrideProps) => ReactElement,
  root: () => HTMLElement
): RootSlotCase[] => [
  {
    name: 'puts the style, class name and attributes of the root slot on the root',
    run: () => {
      renderWithTheme(
        render({
          slotProps: {
            root: {
              className: 'slot',
              style: overrides.first,
              'data-mark': 'a',
              'aria-description': 'b',
            },
          },
        })
      )
      return {
        slot: root().classList.contains('slot'),
        mark: root().getAttribute('data-mark'),
        description: root().getAttribute('aria-description'),
        hasColor: colorsOf(root()).includes('rgb(1, 2, 3)'),
      }
    },
    expected: { slot: true, mark: 'a', description: 'b', hasColor: true },
  },
  {
    name: 'lets the style prop win over slotProps.root.style',
    run: () => {
      renderWithTheme(
        render({
          style: [false, null, undefined, overrides.second],
          slotProps: { root: { style: overrides.first } },
        })
      )
      return colorsOf(root()).at(-1)
    },
    expected: 'rgb(4, 5, 6)',
  },
]

/** `rootSlotCases` as the tests of a component. */
export function describeRootSlot(
  name: string,
  render: (props: OverrideProps) => ReactElement,
  root: () => HTMLElement
) {
  describe(`${name} overrides`, () => {
    it.each(rootSlotCases(render, root))('$name', ({ run, expected }) => {
      expect(run()).toEqual(expected)
    })
  })
}
