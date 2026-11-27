import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@gild-ui/react/utils/test/renderWithTheme'
import { describeRootSlot, overrides, colorsOf } from '../utils/describeRootSlot'
import { LiveEdit } from './LiveEdit'

describeRootSlot(
  'LiveEdit',
  (props) => <LiveEdit value="text" {...props} />,
  () => screen.getByLabelText('Edit block').parentElement as HTMLElement
)

describe('LiveEdit block slot', () => {
  it('puts the block slot on every block, and leaves root and block out of the previews', () => {
    renderWithTheme(
      <LiveEdit
        value={'one\n\ntwo'}
        slotProps={{
          p: { className: 'para' },
          block: {
            className: 'slot',
            style: overrides.first,
            'data-mark': 'a',
            'aria-description': 'b',
          },
          root: { 'data-mark': 'root' },
        }}
      />
    )
    const blocks = screen.getAllByLabelText('Edit block')
    expect(blocks).toHaveLength(2)
    for (const block of blocks) {
      expect(block).toHaveClass('slot')
      expect(block).toHaveAttribute('data-mark', 'a')
      expect(block).toHaveAttribute('aria-description', 'b')
      expect(colorsOf(block).includes('rgb(1, 2, 3)')).toBe(true)
      expect(block.querySelector('.para')).not.toBeNull()
    }
    expect(document.querySelectorAll('[data-mark="root"]')).toHaveLength(1)
  })
})
