import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { describeRootSlot } from '../utils/test/describeRootSlot'
import { mark } from '../utils/test/slotMark'
import { markProblems } from '../utils/test/markProblems'
import { Pagination } from './Pagination'

describeRootSlot(
  'Pagination',
  (props) => <Pagination count={3} {...props} />,
  () => screen.getByRole('navigation')
)

describe('Pagination slots', () => {
  it('puts each slot on its element', () => {
    renderWithTheme(<Pagination count={3} slotProps={{ root: mark('root'), list: mark('list') }} />)
    for (const slot of ['root', 'list']) expect(markProblems(slot)).toEqual([])
  })
})
