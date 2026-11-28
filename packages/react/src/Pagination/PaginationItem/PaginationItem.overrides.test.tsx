import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { describeRootSlot } from '../../utils/test/describeRootSlot'
import { mark } from '../../utils/test/slotMark'
import { markProblems } from '../../utils/test/markProblems'
import { PaginationItem } from './PaginationItem'

describeRootSlot(
  'PaginationItem',
  (props) => <PaginationItem page={1} {...props} />,
  () => screen.getByRole('button')
)

describe('PaginationItem slots', () => {
  it('puts the root slot on the button', () => {
    renderWithTheme(<PaginationItem page={1} slotProps={{ root: mark('root') }} />)
    expect(markProblems('root')).toEqual([])
  })

  it.each(['start-ellipsis', 'end-ellipsis'] as const)(
    'draws no root for %s: the ellipsis slot and the style prop go on the ellipsis',
    (type) => {
      renderWithTheme(
        <PaginationItem
          type={type}
          className="own"
          slotProps={{ root: mark('root'), ellipsis: mark('ellipsis') }}
        />
      )
      expect(markProblems('ellipsis')).toEqual([])
      expect(document.querySelector('[data-mark="root"]')).toBeNull()
      expect(document.querySelector('[data-mark="ellipsis"]')).toHaveClass('own')
    }
  )
})
