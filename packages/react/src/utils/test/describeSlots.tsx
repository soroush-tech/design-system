import { describe, it, expect } from 'vitest'
import type { ReactElement } from 'react'
import type { SlotOverride, StyleOverride } from '../../style/overrides'
import { getStyleRulesFor } from './getStyleRulesFor'
import { overrides } from './overrides'
import { renderWithTheme } from './renderWithTheme'

// What an override decides is its rule in the overrides layer: the rules of the sheet are in the order
// they were first used, and an entry that an earlier test used has its rule before the component's own.
const overrideColor = (element: Element): string | undefined =>
  getStyleRulesFor(element)
    .filter((rule) =>
      (rule.parentRule as (CSSGroupingRule & { name?: string }) | null)?.name?.endsWith('overrides')
    )
    .map((rule) => rule.style.color)
    .filter(Boolean)
    .at(-1)

interface OverrideProps<S extends string> {
  slotProps?: { [K in S]?: SlotOverride }
  style?: StyleOverride
  className?: string
}

/**
 * The cases every component's `style` and `slotProps` share: each slot takes a style entry, a class
 * name and `data-*` and `aria-*` attributes on its own element, and the root's `style` prop wins over
 * `slotProps.root.style` while the class names are joined. `slots` finds the element of each slot in
 * what `render` drew.
 */
export function describeSlots<S extends string>({
  name,
  render,
  slots,
  root,
}: Readonly<{
  name: string
  render: (props: OverrideProps<S>) => ReactElement
  slots: Record<S, () => Element | null>
  root: () => Element | null
}>) {
  describe(`${name} overrides`, () => {
    for (const slot of Object.keys(slots) as S[]) {
      it(`puts the style, class name and attributes of the ${slot} slot on its element`, () => {
        renderWithTheme(
          render({
            slotProps: {
              [slot]: {
                style: [overrides.first, false, null, undefined],
                className: `slot-${slot}`,
                'data-slot': slot,
                'aria-details': 'detail',
              },
            } as unknown as OverrideProps<S>['slotProps'],
          })
        )
        const element = slots[slot]()!
        expect(element).toHaveClass(`slot-${slot}`)
        expect(element).toHaveAttribute('data-slot', slot)
        expect(element).toHaveAttribute('aria-details', 'detail')
        expect(overrideColor(element)).toBe('rgb(1, 2, 3)')
      })
    }

    it('lets the style prop win over slotProps.root.style, and joins the class names', () => {
      renderWithTheme(
        render({
          className: 'own',
          style: [false, overrides.second],
          slotProps: {
            root: { className: 'slot', style: overrides.first },
          } as OverrideProps<S>['slotProps'],
        })
      )
      expect(root()).toHaveClass('slot', 'own')
      expect(overrideColor(root()!)).toBe('rgb(4, 5, 6)')
    })
  })
}
