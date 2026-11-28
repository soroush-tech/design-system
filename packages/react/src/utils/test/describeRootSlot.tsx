import { describe, it, expect } from 'vitest'
import type { ReactElement } from 'react'
import type { SlotOverride, StyleOverride } from '../../style/overrides'
import { renderWithTheme } from './renderWithTheme'
import { lastColor, overrides, type OverrideCase } from './overrides'

interface OverrideProps {
  style?: StyleOverride
  className?: string
  slotProps?: { root?: SlotOverride }
}

/** The cases every component with only a `root` slot shares: `slotProps.root` and `style` on the root. */
export const rootSlotCases = (
  render: (props: OverrideProps) => ReactElement,
  root: () => HTMLElement
): OverrideCase[] => [
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
        color: lastColor(root()),
      }
    },
    expected: { slot: true, mark: 'a', description: 'b', color: 'rgb(1, 2, 3)' },
  },
  {
    name: 'lets the style prop win over slotProps.root.style, and joins the class names',
    run: () => {
      renderWithTheme(
        render({
          className: 'own',
          style: [false, null, undefined, overrides.second],
          slotProps: { root: { className: 'slot', style: overrides.first } },
        })
      )
      return {
        classes: ['slot', 'own'].filter((name) => root().classList.contains(name)),
        color: lastColor(root()),
      }
    },
    expected: { classes: ['slot', 'own'], color: 'rgb(4, 5, 6)' },
  },
  {
    name: 'takes a list of entries for style',
    run: () => {
      renderWithTheme(render({ style: [overrides.first, false, overrides.second] }))
      return lastColor(root())
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
