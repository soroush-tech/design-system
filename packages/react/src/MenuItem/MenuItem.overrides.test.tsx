import { describe, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { describeRootSlot } from '../utils/test/describeRootSlot'
import { mark } from '../utils/test/slotMark'
import { expectMark } from '../utils/test/expectMark'
import { MenuList } from '../Menu'
import { MenuItem } from './MenuItem'

const slots = [
  'root',
  'startIcon',
  'label',
  'shortcut',
  'submenuIcon',
  'entry',
  'secondaryAction',
] as const
const slotProps = Object.fromEntries(slots.map((slot) => [slot, mark(slot)]))

describeRootSlot(
  'MenuItem',
  (props) => (
    <MenuList aria-label="Edit">
      <MenuItem {...props}>Cut</MenuItem>
    </MenuList>
  ),
  () => screen.getByRole('menuitem')
)

describe('MenuItem slots', () => {
  it('puts each slot of a menu row on its element', () => {
    renderWithTheme(
      <MenuList aria-label="Edit">
        <MenuItem
          shortcut="Ctrl+X"
          submenu={[<MenuItem key="leaf">Leaf</MenuItem>]}
          secondaryAction={<span>x</span>}
          slotProps={slotProps}
        >
          Cut
        </MenuItem>
      </MenuList>
    )
    for (const slot of slots) expectMark(slot)
  })

  it('puts the check slot on the leading mark of a row of a multiple select', () => {
    renderWithTheme(
      <ul>
        <MenuItem multiple selected slotProps={{ root: mark('root'), check: mark('check') }}>
          One
        </MenuItem>
      </ul>
    )
    expectMark('root')
    expectMark('check')
  })

  it('puts the entry slot on the entry of a row with a note', () => {
    renderWithTheme(
      <MenuList aria-label="Edit">
        <MenuItem note="Later" slotProps={{ entry: mark('entry') }}>
          Cut
        </MenuItem>
      </MenuList>
    )
    expectMark('entry')
  })

  it('puts the entry slot on the entry of a row with a control of its own', () => {
    renderWithTheme(
      <MenuList aria-label="Edit">
        <MenuItem secondaryAction={<span>x</span>} slotProps={{ entry: mark('entry') }}>
          Cut
        </MenuItem>
      </MenuList>
    )
    expectMark('entry')
  })
})
