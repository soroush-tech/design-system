import { describe, it, expect } from 'vitest'
import type { ReactElement } from 'react'
import type { SlotOverride, StyleOverride } from '../../style/overrides'
import { renderWithTheme } from './renderWithTheme'
import { lastColor, overrides } from './overrides'

interface OverrideProps {
  style?: StyleOverride
  className?: string
  slotProps?: { root?: SlotOverride }
}

/** The cases every component with only a `root` slot shares: `slotProps.root` and `style` on the root. */
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
      expect(lastColor(root())).toBe('rgb(1, 2, 3)')
    })

    it('lets the style prop win over slotProps.root.style, and joins the class names', () => {
      renderWithTheme(
        render({
          className: 'own',
          style: [false, null, undefined, overrides.second],
          slotProps: { root: { className: 'slot', style: overrides.first } },
        })
      )
      expect(root()).toHaveClass('slot', 'own')
      expect(lastColor(root())).toBe('rgb(4, 5, 6)')
    })

    it('takes a list of entries for style', () => {
      renderWithTheme(render({ style: [overrides.first, false, overrides.second] }))
      expect(lastColor(root())).toBe('rgb(4, 5, 6)')
    })
  })
}
