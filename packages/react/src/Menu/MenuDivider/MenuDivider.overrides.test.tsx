import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { describeRootSlot } from '../../utils/test/describeRootSlot'
import { mark } from '../../utils/test/slotMark'
import { markProblems } from '../../utils/test/markProblems'
import { MenuItem } from '../../MenuItem'
import { MenuList } from '../MenuList'
import { MenuDivider } from './MenuDivider'

describeRootSlot(
  'MenuDivider',
  (props) => (
    <MenuList aria-label="Edit">
      <MenuItem>Cut</MenuItem>
      <MenuDivider {...props} />
    </MenuList>
  ),
  () => screen.getByRole('separator')
)

describe('MenuDivider slots', () => {
  it('has a root slot only, the separator itself', () => {
    renderWithTheme(
      <MenuList aria-label="Edit">
        <MenuDivider slotProps={{ root: mark('root') }} />
      </MenuList>
    )
    expect(markProblems('root')).toEqual([])
  })
})
