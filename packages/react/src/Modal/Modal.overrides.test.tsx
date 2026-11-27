import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { describeRootSlot } from '../utils/test/describeRootSlot'
import { mark } from '../utils/test/slotMark'
import { markProblems } from '../utils/test/markProblems'
import { Modal } from './Modal'

describeRootSlot(
  'Modal',
  (props) => (
    <Modal isOpen {...props}>
      <p>Content</p>
    </Modal>
  ),
  () => screen.getByRole('presentation')
)

describe('Modal slots', () => {
  it('has a root slot only, the layer around the content', () => {
    renderWithTheme(
      <Modal isOpen slotProps={{ root: mark('root') }}>
        <p>Content</p>
      </Modal>
    )
    expect(markProblems('root')).toEqual([])
  })
})
