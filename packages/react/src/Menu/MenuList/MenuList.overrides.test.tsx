import { describe, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { describeRootSlot } from '../../utils/test/describeRootSlot'
import { mark } from '../../utils/test/slotMark'
import { expectMark } from '../../utils/test/expectMark'
import { MenuItem } from '../../MenuItem'
import { MenuList } from './MenuList'

describeRootSlot(
  'MenuList',
  (props) => (
    <MenuList aria-label="Edit" {...props}>
      <MenuItem>Cut</MenuItem>
    </MenuList>
  ),
  () => screen.getByRole('menu')
)

describe('MenuList slots', () => {
  it('has a root slot only, the list itself', () => {
    renderWithTheme(
      <MenuList aria-label="Edit" slotProps={{ root: mark('root') }}>
        <MenuItem>Cut</MenuItem>
      </MenuList>
    )
    expectMark('root')
  })
})
