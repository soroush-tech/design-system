import { describe, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { describeRootSlot } from '../utils/test/describeRootSlot'
import { mark } from '../utils/test/slotMark'
import { expectMark } from '../utils/test/expectMark'
import { Pressable } from './Pressable'

describeRootSlot(
  'Pressable',
  (props) => <Pressable {...props}>Press</Pressable>,
  () => screen.getByRole('button')
)

describe('Pressable slots', () => {
  it('has a root slot only', () => {
    renderWithTheme(<Pressable slotProps={{ root: mark('root') }}>Press</Pressable>)
    expectMark('root')
  })
})
