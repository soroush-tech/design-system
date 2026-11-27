import { describe, it, expect } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { getStyleRulesFor } from '../utils/test/getStyleRulesFor'
import { overrides } from '../utils/test/overrides'
import { Autocomplete, type AutocompleteProps } from './Autocomplete'

const mark = (name: string) => ({
  className: `mark-${name}`,
  style: overrides.first,
  'data-mark': name,
  'aria-description': name,
})
const hasColor = (element: Element, color: string) =>
  getStyleRulesFor(element).some((rule) => rule.style.color === color)
const at = (name: string) => document.querySelector(`[data-mark="${name}"]`) as HTMLElement
const expectMarked = (slot: string) => {
  const element = at(slot)
  expect(element).toHaveClass(`mark-${slot}`)
  expect(element).toHaveAttribute('aria-description', slot)
  expect(hasColor(element, 'rgb(1, 2, 3)')).toBe(true)
}

const view = (props: Partial<AutocompleteProps<string, true>> = {}) => (
  <Autocomplete
    multiple
    options={['Berlin', 'Lisbon', 'Oslo']}
    defaultValue={['Berlin']}
    aria-label="City"
    clearLabel="Clear"
    openLabel="Open"
    closeLabel="Close"
    groupBy={(option) => option[0]}
    {...props}
  />
)

describe('Autocomplete overrides', () => {
  it.each([
    'root',
    'tags',
    'input',
    'clearIndicator',
    'popupIndicator',
    'popup',
    'listbox',
    'group',
    'groupLabel',
    'groupItems',
    'option',
  ])('puts the style, class name and attributes of slotProps.%s on that slot', (slot) => {
    renderWithTheme(
      view({
        slotProps: {
          root: mark('root'),
          tags: mark('tags'),
          input: mark('input'),
          clearIndicator: mark('clearIndicator'),
          popupIndicator: mark('popupIndicator'),
          popup: mark('popup'),
          listbox: mark('listbox'),
          group: mark('group'),
          groupLabel: mark('groupLabel'),
          groupItems: mark('groupItems'),
          option: mark('option'),
        },
      })
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open' }))
    expectMarked(slot)
  })

  it('puts the status slot on the row that says nothing was found', () => {
    renderWithTheme(
      <Autocomplete
        options={[]}
        aria-label="City"
        noOptionsText="Nothing"
        slotProps={{ status: mark('status') }}
      />
    )
    fireEvent.focus(screen.getByRole('combobox'))
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'x' } })
    expectMarked('status')
  })

  it('lets style win over slotProps.root.style, and joins the class names', () => {
    renderWithTheme(
      view({
        className: 'own',
        style: [false, null, overrides.second, undefined],
        slotProps: { root: mark('root') },
      })
    )
    expect(at('root')).toHaveClass('mark-root', 'own')
    expect(hasColor(at('root'), 'rgb(4, 5, 6)')).toBe(true)
    expect(hasColor(at('root'), 'rgb(1, 2, 3)')).toBe(false)
  })
})
