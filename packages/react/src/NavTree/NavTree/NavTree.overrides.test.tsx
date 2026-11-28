import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { describeRootSlot } from '../../utils/test/describeRootSlot'
import { mark } from '../../utils/test/slotMark'
import { markProblems } from '../../utils/test/markProblems'
import { NavTree } from './NavTree'

describeRootSlot(
  'NavTree',
  (props) => <NavTree data-testid="root" {...props} />,
  () => screen.getByTestId('root')
)

describe('NavTree slots', () => {
  it('has a root slot only', () => {
    renderWithTheme(<NavTree slotProps={{ root: mark('root') }} />)
    expect(markProblems('root')).toEqual([])
  })
})
