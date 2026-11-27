import { describe, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { describeRootSlot } from '../../utils/test/describeRootSlot'
import { mark } from '../../utils/test/slotMark'
import { expectMark } from '../../utils/test/expectMark'
import { NavGroup } from './NavGroup'

describeRootSlot(
  'NavGroup',
  (props) => (
    <NavGroup label="Docs" data-testid="root" {...props}>
      <a href="/a">A</a>
    </NavGroup>
  ),
  () => screen.getByTestId('root')
)

describe('NavGroup slots', () => {
  it('puts each slot of a plain group on its element', () => {
    renderWithTheme(
      <NavGroup
        label="Docs"
        slotProps={{ root: mark('root'), label: mark('label'), list: mark('list') }}
      >
        <a href="/a">A</a>
      </NavGroup>
    )
    for (const slot of ['root', 'label', 'list']) expectMark(slot)
  })

  it('puts each slot of a collapsible group on its element', () => {
    renderWithTheme(
      <NavGroup
        label="Docs"
        isCollapsible
        slotProps={{ root: mark('root'), label: mark('label'), list: mark('list') }}
      >
        <a href="/a">A</a>
      </NavGroup>
    )
    for (const slot of ['root', 'label', 'list']) expectMark(slot)
  })
})
