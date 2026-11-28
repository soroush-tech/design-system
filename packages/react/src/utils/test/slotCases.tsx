import type { ReactElement } from 'react'
import type { SlotOverride, StyleOverride } from '../../style/overrides'
import { getStyleRulesFor } from './getStyleRulesFor'
import { overrides, type OverrideCase } from './overrides'
import { renderWithTheme } from './renderWithTheme'

// What an override decides is its rule in the overrides layer: the rules of the sheet are in the order
// they were first used, and an entry that an earlier test used has its rule before the component's own.
const overrideColor = (element: Element): string | undefined =>
  getStyleRulesFor(element)
    .filter((rule) =>
      (rule.parentRule as (CSSGroupingRule & { name?: string }) | null)?.name?.endsWith('overrides')
    )
    .map((rule) => rule.style.color)
    .findLast(Boolean)

interface OverrideProps<S extends string> {
  slotProps?: { [K in S]?: SlotOverride }
  style?: StyleOverride
  className?: string
}

interface SlotCasesOptions<S extends string> {
  render: (props: OverrideProps<S>) => ReactElement
  slots: Record<S, () => Element | null>
  root: () => Element | null
}

/**
 * The cases every component's `style` and `slotProps` share: each slot takes a style entry, a class
 * name and `data-*` and `aria-*` attributes on its own element, and the root's `style` prop wins over
 * `slotProps.root.style` while the class names are joined. `slots` finds the element of each slot in
 * what `render` drew.
 */
export function slotCases<S extends string>({
  render,
  slots,
  root,
}: Readonly<SlotCasesOptions<S>>): OverrideCase[] {
  const slotCase = (slot: S): OverrideCase => ({
    name: `puts the style, class name and attributes of the ${slot} slot on its element`,
    run: () => {
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
      return {
        slot: element.classList.contains(`slot-${slot}`),
        dataSlot: element.getAttribute('data-slot'),
        details: element.getAttribute('aria-details'),
        color: overrideColor(element),
      }
    },
    expected: { slot: true, dataSlot: slot, details: 'detail', color: 'rgb(1, 2, 3)' },
  })
  return [
    ...(Object.keys(slots) as S[]).map(slotCase),
    {
      name: 'lets the style prop win over slotProps.root.style, and joins the class names',
      run: () => {
        renderWithTheme(
          render({
            className: 'own',
            style: [false, overrides.second],
            slotProps: {
              root: { className: 'slot', style: overrides.first },
            } as OverrideProps<S>['slotProps'],
          })
        )
        return {
          classes: ['slot', 'own'].filter((name) => root()!.classList.contains(name)),
          color: overrideColor(root()!),
        }
      },
      expected: { classes: ['slot', 'own'], color: 'rgb(4, 5, 6)' },
    },
  ]
}
