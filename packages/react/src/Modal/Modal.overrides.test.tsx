import { describe, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { describeRootSlot } from '../utils/test/describeRootSlot'
import { mark } from '../utils/test/slotMark'
import { expectMark } from '../utils/test/expectMark'
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
    expectMark('root')
  })
})
