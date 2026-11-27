import { describe, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { describeRootSlot } from '../../utils/test/describeRootSlot'
import { mark } from '../../utils/test/slotMark'
import { expectMark } from '../../utils/test/expectMark'
import { NavLink } from './NavLink'

describeRootSlot(
  'NavLink',
  (props) => (
    <NavLink href="/a" {...props}>
      A
    </NavLink>
  ),
  () => screen.getByRole('link')
)

describe('NavLink slots', () => {
  it('puts each slot on its element', () => {
    renderWithTheme(
      <NavLink
        href="/a"
        note="new"
        slotProps={{ root: mark('root'), label: mark('label'), note: mark('note') }}
      >
        A
      </NavLink>
    )
    for (const slot of ['root', 'label', 'note']) expectMark(slot)
  })
})
