import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '@gild-ui/react/utils/test/renderWithTheme'
import { describeRootSlot, overrides, colorsOf } from '../utils/describeRootSlot'
import { MarkdownContext, type MarkdownContextValue } from '../MarkdownContext'
import { Toolbar } from './Toolbar'

const context: MarkdownContextValue = {
  value: '',
  onChange: vi.fn(),
  dispatch: vi.fn(),
  rememberSelection: vi.fn(),
  queueSelection: vi.fn(),
  takeQueuedSelection: vi.fn(() => null),
}
const mark = {
  className: 'slot',
  style: overrides.first,
  'data-mark': 'a',
  'aria-description': 'b',
}

describeRootSlot(
  'Toolbar',
  (props) => (
    <MarkdownContext.Provider value={context}>
      <Toolbar {...props} />
    </MarkdownContext.Provider>
  ),
  () => screen.getByRole('toolbar')
)

describe('Toolbar slots', () => {
  it('puts the strike slot on the strike-through label and the tablePickerCell slot on every grid cell', () => {
    renderWithTheme(
      <MarkdownContext.Provider value={context}>
        <Toolbar slotProps={{ strike: mark, tablePickerCell: mark }} />
      </MarkdownContext.Provider>
    )
    const strike = document.querySelector('[data-mark="a"]') as HTMLElement
    expect(strike).toHaveClass('slot')
    expect(strike).toHaveAttribute('aria-description', 'b')
    expect(colorsOf(strike).includes('rgb(1, 2, 3)')).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'Table' }))
    for (const cell of screen.getAllByRole('gridcell')) {
      expect(cell).toHaveClass('slot')
      expect(cell).toHaveAttribute('data-mark', 'a')
    }
  })
})
