import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { describeRootSlot } from '../utils/test/describeRootSlot'
import { mark } from '../utils/test/slotMark'
import { markProblems } from '../utils/test/markProblems'
import { NativeSelect } from './NativeSelect'

const options = [{ label: 'One', value: 1 }]

describeRootSlot(
  'NativeSelect',
  (props) => <NativeSelect options={options} data-testid="root" {...props} />,
  () => screen.getByTestId('root')
)

describe('NativeSelect slots', () => {
  it('puts each slot on its element', () => {
    renderWithTheme(
      <NativeSelect
        options={options}
        slotProps={{ root: mark('root'), select: mark('select'), icon: mark('icon') }}
      />
    )
    for (const slot of ['root', 'select', 'icon']) expect(markProblems(slot)).toEqual([])
  })

  it('joins the class of selectProps and iconProps with those of the slots', () => {
    renderWithTheme(
      <NativeSelect
        options={options}
        selectProps={{ className: 'own-select' }}
        iconProps={{ className: 'own-icon' }}
        slotProps={{ select: mark('select'), icon: mark('icon') }}
      />
    )
    expect(document.querySelector('[data-mark="select"]')).toHaveClass('own-select', 'c-select')
    expect(document.querySelector('[data-mark="icon"]')).toHaveClass('own-icon', 'c-icon')
  })
})
