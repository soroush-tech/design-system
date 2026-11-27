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
  [...rules].flatMap((rule) =>
    rule instanceof CSSStyleRule
      ? [rule]
      : 'cssRules' in rule
        ? rulesOf(rule.cssRules as CSSRuleList)
        : []
  )

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

/** The cases of a component with a `root` slot: `slotProps.root` and `style` on the root. */
export function describeRootSlot(
  name: string,
  render: (props: OverrideProps) => ReactElement,
  root: () => HTMLElement
) {
  describe(`${name} overrides`, () => {
    it('puts the style, class name and attributes of the root slot on the root', () => {
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
      expect(root()).toHaveClass('slot')
      expect(root()).toHaveAttribute('data-mark', 'a')
      expect(root()).toHaveAttribute('aria-description', 'b')
      expect(colorsOf(root())).toContain('rgb(1, 2, 3)')
    })

    it('lets the style prop win over slotProps.root.style', () => {
      renderWithTheme(
        render({
          style: [false, null, undefined, overrides.second],
          slotProps: { root: { style: overrides.first } },
        })
      )
      expect(colorsOf(root()).at(-1)).toBe('rgb(4, 5, 6)')
    })
  })
}
